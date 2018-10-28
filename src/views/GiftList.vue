<template>
  <div class="giftList">
    <h1>{{listData}}</h1>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { DocumentReference } from 'firebase/firestore';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GiftList extends Vue {

  userData: any = null

  // computed
  get listId() {
    return this.$route.params.listId;
  }

  get listData() {
    return this.userData ? this.userData.giftLists[this.listId] : null;
  }

  created() {
    db.collection('users').doc(this.$route.params.userId).get().then((doc) => {
      if (doc.exists) {
        this.userData = doc.data();
      }
    }).catch();
  }

}
</script>
