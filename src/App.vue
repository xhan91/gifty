<template>
  <div id="app">
    <Layout>
      <Header class="header-responsize">
        <Menu mode="horizontal" theme="dark" active-name="1" class="menu" v-if="user">
          <MenuItem name="home">
            <router-link to="/">Home</router-link>
          </MenuItem>
          <MenuItem name="about">
            <router-link to="/about">About</router-link>
          </MenuItem>
          <div class="avatar" v-if="user">
            {{user.displayName}}
            <img :src="user.photoURL" height="32" width="32" />
          </div>
        </Menu>
      </Header>
      <Content id="content">
        <router-view/>
      </Content>
      <Footer>2018 - {{(new Date()).getYear() + 1900}} &copy; Gifty</Footer>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component<App>({})
export default class App extends Vue {

  // computed
  get user() {
    return this.$store.getters.getUser;
  }
}
</script>


<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#app
  font-family 'Open Sans', 'Avenir', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  
html
  background-color #f5f7f9

#content
  height calc(100vh - 133px)
  padding 50px 50px 0px 50px

.menu a
  text-decoration none
  color white

.avatar
  float right
  color white
  display flex
  justify-content center
  align-items center

.avatar img
  border-radius 50%
  margin-left 5px

@media only screen and (max-width: 432px) {
  #content {
    padding 0px
  }

  .header-responsize {
    padding 0px 20px 0px 0px !important
  }
}
</style>
