<template>
  <div>
    <Breadcrumb style="text-align: left; padding: 10px">
      <BreadcrumbItem>Home</BreadcrumbItem>
    </Breadcrumb>
    <Card :dis-hover="true" v-if="userData" style="text-align: left">
      <div style="margin-bottom: 20px;">
        <NewListCard
          style="margin-left: 10px; text-align: center"
          :userDataRef="userDataRef"
        />
      </div>
      <div 
        v-if="userData.giftLists"
      >
        <ListCard
          style="margin-left: 10px; text-align: center"
          v-for="listData in Object.values(userData.giftLists)"
          :key="listData.id"
          :listData="listData"
        />
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { DocumentReference } from 'firebase/firestore';
import { Component, Vue } from 'vue-property-decorator';
import NewListCard from '@/components/NewListCard.vue'; // @ is an alias to /src
import ListCard from '@/components/ListCard.vue';

@Component<Home>({
  components: {
    NewListCard,
    ListCard,
  },
})
export default class Home extends Vue {

  userData: any = null
  
  // computed
  get user() {
    return this.$store.getters.getUser;
  }

  get userDataRef() {
    return db.collection('users').doc(this.user.uid);
  }

  created() {
    this.userDataRef.get().then((doc) => {
      if (doc.exists) {
        this.userData = doc.data();
      }
    }).catch();
  }

}
</script>
