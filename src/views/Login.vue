<template>
  <div class="login">
    <Button icon="logo-google" @click="login" size="large">Login with Google</Button>
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
      this.$store.dispatch('setUser', res.user).then(() => {
        this.$router.push('/');
      });
    }).catch((err) => {});
  }
}
</script>

<style lang="stylus" scoped>
.login
  display flex
  align-items center
  justify-content center
  height 100%
  width 100%
</style>

