<template>
  <div class="giftList">
    <Button
      class="shareBtn"
      type="primary"
      v-clipboard:copy="shareLink"
      v-clipboard:success="shareLinkCopied"
    >
      Share the list
    </Button>
    <Breadcrumb style="text-align: left; padding: 10px">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem v-if="listData">{{ listData.name }}</BreadcrumbItem>
    </Breadcrumb>
    <Card :dis-hover="true" style="text-align: left; max-height: calc(100% - 41px); overflow: auto">
      <div 
        v-if="user && user.uid == listOwnerId"
        style="margin-bottom: 20px;"
      >
        <NewGiftCard
          style="margin-left: 10px; text-align: center; cursor: pointer"
          :userDataRef="userDataRef"
          :listId="listId"
          @reloadData="load"
        />
      </div>
      <div 
        v-if="listData && listData.gifts"
        class="giftsContainer"
      >
        <GiftCard
          v-for="gift in Object.values(listData.gifts)"
          :key="gift.id"
          :gift="gift"
          @reloadData="load"
        />
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { Component, Vue } from 'vue-property-decorator';
import NewGiftCard from '@/components/NewGiftCard.vue'; // @ is an alias to /src
import GiftCard from '@/components/GiftCard.vue';

@Component<GiftList>({
  components: {
    NewGiftCard,
    GiftCard,
  },
})
export default class GiftList extends Vue {

  private userData: any = null;
  private infiLoadId: any = null;
  private myThis: any = this;

  // computed
  get user() {
    return this.$store.getters.getUser;
  }

  get listId() {
    return this.$route.params.listId;
  }

  get listData() {
    return this.userData ? this.userData.giftLists[this.listId] : null;
  }

  get listOwnerId() {
    return this.$route.params.userId;
  }

  get userDataRef() {
    return db.collection('users').doc(this.listOwnerId);
  }

  get shareLink() {
    return window.location.href;
  }

  private shareLinkCopied() {
    this.myThis.$Message.success({content: 'Share link copied to clipboard! Share this link to your friends!', duration: 3});
  }

  private load() {
    this.userDataRef.get().then((doc) => {
      if (doc.exists) {
        this.userData = doc.data();
      }
    }).catch();
  }

  private created() {
    this.load();
  }

  private beforeMount() {
    this.infiLoadId = setInterval(this.load, 5000);
  }

  private beforeDestroy() {
    clearInterval(this.infiLoadId);
  }

}
</script>

<style lang="stylus" scoped>
.giftList
  height 100%

.giftsContainer
  max-width 100%
  display flex
  justify-content flex-start
  flex-wrap wrap

.shareBtn
  position absolute
  right 50px

@media only screen and (max-width: 432px) {
  .shareBtn {
    right 20px
    top 68px
  }
}
</style>
