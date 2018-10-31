<template>
  <div style="display: inline-flex; margin-left: 10px">
    <Card class="card" :class="{taken: gift.taken}">
      <p slot="title" style="color: white">
          {{gift.name}}
      </p>
      <Button 
        slot="extra" 
        :disabled="giftStatus === 'taken'" 
        :loading="btnLoading" 
        @click="handleClick"
        style="transform: translate(0px, -6px)"
      >
        {{buttonMsg}}
      </Button>
      <p class="subinfo" v-for="key in displayKeys" v-if="gift[key]" :key="key">
        {{displayKeyNames[key]}}: <span v-html="processValue(key, gift[key])"></span>
      </p>
    </Card>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { db } from '@/main';

@Component
export default class GiftCard extends Vue {

  // data
  private displayKeys = ['price', 'description', 'whereToBuy', 'image', 'link', 'taker'];
  private displayKeyNames = {
    price: 'Price',
    description: 'Description',
    whereToBuy: 'Where to buy',
    image: 'Image link',
    link: 'Online link',
    taker: 'Taken by',
  }
  private btnLoading = false;

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

  get userGiftId() {
    return `${this.listOwnerId}${this.listId}${this.gift.id}`;
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
  private processValue(key: string, rawValue: string) {
    let value;
    switch(key) {
      case 'price':
        value = `$${rawValue}`;
        break;
      case 'link':
        value = `<a href='${rawValue}'>${rawValue}</a>`;
        break;
      default:
        value = rawValue;
    }
    return value;
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
    userGifts[this.userGiftId] = giftRef;
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

    this.btnLoading = false;
    this.$emit('reloadData');
  }

  private async putBack() {
    // delete user attributes
    let data = await this.userDataRef.get().then(res => res.data()).catch(() => null);
    if (data === null) return;
    delete data!.gifts[this.userGiftId]
    const userPromise = this.userDataRef.set(data!);

    // delete gift attributes
    const gifts = {};
    gifts[this.gift.id] = { taken: false, taker: null, takerId: null };
    const giftLists = {};
    giftLists[this.listId] = { gifts };
    const giftPromise = db.collection('users').doc(this.listOwnerId).set({
      giftLists
    }, {merge: true});

    await Promise.all([userPromise, giftPromise]);

    this.btnLoading = false;
    this.$emit('reloadData');
  }

  private edit() {

  }

  private handleClick() {
    this.btnLoading = true;
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
  background-color #2d8cf0
  transition 0.2s

.card.taken
  background-color #19be6b
  
.card:hover
  background-color #5cadff
  
.card:active
  background-color #2b85e4

.ivu-input-wrapper
  margin-bottom 15px

.subinfo
  color #cdcdcd
</style>
