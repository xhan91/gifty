<template>
  <div>
    <Breadcrumb style="text-align: left; padding: 10px">
      <BreadcrumbItem>Home</BreadcrumbItem>
    </Breadcrumb>
    <Card :dis-hover="true">
      <NewListCard 
        :userDataRef="userDateRef" 
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
  firestore() {
    return {
      userData: db.collection('users').doc(this.user.uid), // dataRef
    }
  }
})
export default class Home extends Vue {

  userData: DocumentReference | null = null
  
  // computed
  get user() {
    return this.$store.getters.getUser;
  }

  get userDateRef() {
    return this.$firestoreRefs.userData;
  }

}
</script>
