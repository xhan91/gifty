<template>
  <div>
    <Breadcrumb style="text-align: left; padding: 10px">
      <BreadcrumbItem>Home</BreadcrumbItem>
    </Breadcrumb>
    <Card :dis-hover="true">
      <NewListCard
        :userDataRef="userDataRef"
      />
    </Card>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { DocumentReference } from 'firebase/firestore';
import { Component, Vue } from 'vue-property-decorator';
import NewListCard from '@/components/NewListCard.vue'; // @ is an alias to /src

@Component<Home>({
  components: {
    NewListCard,
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
