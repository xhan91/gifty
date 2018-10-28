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
        />
      </div>
      <div 
        v-if="listData && listData.gifts"
      >
        <!-- <GiftCard
          style="margin-left: 10px; text-align: center"
          v-for="listData in Object.values(userData.giftLists)"
          :key="listData.id"
          :listData="listData"
        /> -->
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { DocumentReference } from 'firebase/firestore';
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

  userData: any = null

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

  created() {
    db.collection('users').doc(this.listOwnerId).get().then((doc) => {
      if (doc.exists) {
        this.userData = doc.data();
      }
    }).catch();
  }

}
</script>
