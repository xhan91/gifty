<template>
  <div style="display: inline-flex; margin-left: 10px">
    <Card class="card" v-if="loaded">
      <p slot="title" style="color: white">
          {{gift.name}}
      </p>
      <Button 
        slot="extra" 
        style="transform: translate(0px, -6px)"
        @click="goToList"
      >
        Go to list
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
export default class GiftCardInHome extends Vue {

  // data
  private gift: any = null;
  private loaded: boolean = false;
  private displayKeys = ['price', 'description', 'whereToBuy', 'image', 'link', 'taker'];
  private displayKeyNames = {
    price: 'Price',
    description: 'Description',
    whereToBuy: 'Where to buy',
    image: 'Image link',
    link: 'Online link',
    taker: 'Taken by',
  }

  // props
  @Prop(Object) private giftRef: any;

  // methods
  private processValue(key: string, rawValue: string) {
    let value;
    switch(key) {
      case 'price':
        value = `$${rawValue}`;
        break;
      case 'link':
        value = `<a style="color: white" href='${rawValue}'>${rawValue}</a>`;
        break;
      default:
        value = rawValue;
    }
    return value;
  }

  private goToList() {
    this.$router.push(`/gift-list/${this.giftRef.owner}/${this.giftRef.list}`);
  }

  private async getGift() {
    const { owner, list, gift } = this.giftRef;
    const ownerData = await db.collection('users').doc(owner).get().then(res => res.data());
    this.gift = ownerData!.giftLists[list].gifts[gift];
    this.loaded = true;
  }

  private created() {
    this.getGift();
  }

}
</script>

<style lang="stylus" scoped>
.card
  width 300px
  height 250px
  margin 5px
  background-color #19be6b
  transition 0.2s

.card.taken
  background-color #19be6b
  
.card:hover
  filter brightness(120%)

.ivu-input-wrapper
  margin-bottom 15px

.subinfo
  color #cdcdcd
</style>
