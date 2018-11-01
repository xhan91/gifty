<template>
  <div style="height: 100%">
    <Breadcrumb style="text-align: left; padding: 10px">
      <BreadcrumbItem>Home</BreadcrumbItem>
    </Breadcrumb>
    <Card :dis-hover="true" style="text-align: left; max-height: calc(100% - 41px); overflow: auto">
      <div style="margin-bottom: 20px;">
        <NewListCard
          style="margin-left: 10px; text-align: center; cursor: pointer"
          :userDataRef="userDataRef"
        />
      </div>
      <div 
        v-if="userData && userData.giftLists"
      >
        <ListCard
          style="margin-left: 10px; text-align: center; cursor: pointer"
          v-for="listData in Object.values(userData.giftLists)"
          :key="listData.id"
          :listData="listData"
        />
      </div>
      <div
        v-if="userData && userData.gifts"
      >
        <GiftCardInHome
          v-for="key in Object.keys(userData.gifts)"
          :key="key"
          :giftRef="userData.gifts[key]"
        />
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { Component, Vue } from 'vue-property-decorator';
import NewListCard from '@/components/NewListCard.vue'; // @ is an alias to /src
import ListCard from '@/components/ListCard.vue';
import GiftCardInHome from '@/components/GiftCardInHome.vue';

@Component<Home>({
  components: {
    NewListCard,
    ListCard,
    GiftCardInHome,
  },
})
export default class Home extends Vue {

  private userData: any = null;
  // computed
  get user() {
    return this.$store.getters.getUser;
  }

  get userDataRef() {
    return db.collection('users').doc(this.user.uid);
  }

  private created() {
    this.userDataRef.get().then((doc) => {
      if (doc.exists) {
        this.userData = doc.data();
      } else {
        this.userDataRef.set({ giftLists: {} });
      }
    }).catch();
  }

}
</script>
