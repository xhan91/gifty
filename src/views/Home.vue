<template>
  <div>
    <Breadcrumb style="text-align: left; padding: 10px">
      <BreadcrumbItem>Home</BreadcrumbItem>
    </Breadcrumb>
    <Card :dis-hover="true">
      <NewListCard />
      d: {{userData}}
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
  firestore() {
    return {
      userData: this.user ? db.collection('users').doc(this.user.uid) : db.collection('users').doc('1'),
    }
  }
})
export default class Home extends Vue {

  userData = null

  // computed
  get user() {
    return this.$store.getters.getUser;
  }

  beforeMount() {
    if (!this.userData) {

    }
  }

}
</script>
