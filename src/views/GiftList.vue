<template>
  <div class="giftList">
    <h1>{{listData}}</h1>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { DocumentReference } from 'firebase/firestore';
import { Component, Vue } from 'vue-property-decorator';

@Component<GiftList>({
  firestore() {
    return {
      userData: db.collection('users').doc(this.$route.params.userId), // dataRef
    }
  }
})
export default class GiftList extends Vue {

  userData: DocumentReference | null = null

  // computed
  get listId() {
    return this.$route.params.listId;
  }

  get listData() {
    return this.userData ? this.userData.giftLists[this.listId] : null;
  }

}
</script>
