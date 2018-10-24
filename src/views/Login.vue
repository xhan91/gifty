<template>
  <div class="login">
    <Button icon="logo-google" @click="login"></Button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase/app';

@Component({
  components: {
  },
})
export default class Login extends Vue {
  private login() {
    const google = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(google).then((res) => {
      this.$store.dispatch('setUser', res);
    }).catch((err) => {});
  }
}
</script>
