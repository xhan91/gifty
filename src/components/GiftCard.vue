<template>
  <span @click="handleClick" @mouseenter="handleMouseIn" @mouseleave="handleMouseOut">
    <div class="hoverButton" v-if="mouseOver">
      <Button size="large" :disabled="giftStatus === 'taken'">
        {{buttonMsg}}
      </Button>
    </div>
    <Card class="card" :class="{taken: gift.taken, mouseOver: mouseOver}">
      <Row class="card-content" type="flex" justify="center">
        <h1>
          {{gift.name}}
        </h1>
        <p class="subinfo" v-for="key in displayKeys" v-if="gift[key]" :key="key">
          {{key}}: {{gift[key]}}
        </p>
      </Row>
    </Card>
  </span>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { db } from '@/main';

@Component
export default class GiftCard extends Vue {

  // data
  private mouseOver = false;
  private displayKeys = ['price', 'description', 'whereToBuy', 'image', 'link', 'taker'];

  // props
  @Prop(Object) private gift: any;

  // computed
  get user() {
    return this.$store.getters.getUser;
  }

  get userDataRef() {
    return db.collection('users').doc(this.user.uid);
  }

  get listId() {
    return this.$route.params.listId;
  }

  get listOwnerId() {
    return this.$route.params.userId;
  }

  get giftStatus() {
    if (this.user.uid === this.listOwnerId) {
      return 'edit';
    } else if (!this.gift.taken) {
      return 'take';
    } else if (this.gift.takerId === this.user.uid) {
      return 'putBack'
    }
    return 'taken';
  }

  get buttonMsg() {
    const msg = {
      edit: 'Edit',
      take: 'Take',
      putBack: 'Return',
      taken: `Taken by ${this.gift.taker}`,
    };
    return msg[this.giftStatus];
  }

  // methods
  private handleMouseIn() {
    this.mouseOver = true;
  }

  private handleMouseOut() {
    this.mouseOver = false;
  }

  private async take() {
    // set user
    const giftRef = {
      owner: this.listOwnerId,
      list: this.listId,
      gift: this.gift.id,
      done: false,
    }
    const userGifts = {};
    const userGiftId = `${this.listOwnerId}${this.listId}${this.gift.id}`;
    userGifts[userGiftId] = giftRef;
    const data = { gifts: userGifts };
    const userPromise = this.userDataRef.set(data, { merge: true });

    // set gift
    const gifts = {};
    gifts[this.gift.id] = { taken: true, taker: this.user.displayName, takerId: this.user.uid };
    const giftLists = {};
    giftLists[this.listId] = { gifts };
    const giftPromise = db.collection('users').doc(this.listOwnerId).set({
      giftLists
    }, {merge: true});

    await Promise.all([userPromise, giftPromise]);

    this.$emit('reloadData');
  }

  private async putBack() {
    // delete user

    // delete 
  }

  private edit() {

  }

  private handleClick() {
    switch(this.giftStatus) {
      case 'take':
        this.take();
        break;
      case 'putBack':
        this.putBack();
        break;
      case 'edit':
        this.edit();
        break;
    }
  }

}
</script>

<style lang="stylus" scoped>
.card
  width 300px
  height 250px
  margin 5px
  display inline-flex
  background-color #2d8cf0
  transition 0.2s

.card.taken
  background-color #19be6b
  
.card:hover
  background-color #5cadff
  
.card:active
  background-color #2b85e4

.card-content
  width 268px
  height 218px
  flex-direction column
  font-size 16px  
  color #ffffff

.ivu-input-wrapper
  margin-bottom 15px

.subinfo
  color #cdcdcd

.mouseOver
  opacity 0.1

.hoverButton
  display flex
  height 250px
  width 300px
  margin 5px 5px 5px 15px
  justify-content center
  align-items center
  position absolute
  opacity 1
  z-index 10
</style>
