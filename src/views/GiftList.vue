<template>
  <div class="giftList">
    <Breadcrumb style="text-align: left; padding: 10px">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem v-if="listData">{{ listData.name }}</BreadcrumbItem>
    </Breadcrumb>
    <Card :dis-hover="true" style="text-align: left">
      <div 
        v-if="user && user.uid == listOwnerId"
        style="margin-bottom: 20px;"
      >
        <NewGiftCard
          style="margin-left: 10px; text-align: center"
          :userDataRef="userDataRef"
          :listId="listId"
          @reloadData="load"
        />
      </div>
      <div 
        v-if="listData && listData.gifts"
      >
        <GiftCard
          style="margin-left: 10px; text-align: center"
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

}
</script>
