<template>
  <span @click="handleClick">
    <Card class="card" :class="{taken: gift.taken}">
      <Row class="card-content" type="flex" justify="center">
        <h1>
          {{gift.name}}
        </h1>
        <p class="price">
          {{gift.price}}
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

  // methods
  private async handleClick() {
    if (this.user.uid === this.listOwnerId) { // edit

    } else { // assign
      // if it is not assigned
      if (!this.gift.taken) {

        // set user
        const giftRef = {
          owner: this.listOwnerId,
          list: this.listId,
          gift: this.gift.id,
          done: false,
        }
        const data = { gifts: [giftRef] };
        await this.userDataRef.set(data, { merge: true });

        // set gift
        const gifts = {}
        gifts[this.gift.id] = { taken: true, taker: this.user.displayName, takerId: this.user.uid };
        const giftLists = {}
        giftLists[this.listId] = { gifts };
        await db.collection('users').doc(this.listOwnerId).set({
          giftLists
        }, {merge: true});

        this.$emit('reloadData');
      }
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

  .price
    color #cdcdcd
</style>
