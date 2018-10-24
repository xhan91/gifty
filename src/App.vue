<template>
  <div id="app">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <MenuItem name="home">
            <router-link to="/">Home</router-link>
          </MenuItem>
          <MenuItem name="about">
            <router-link to="/about">About</router-link>
          </MenuItem>
        </Menu>
      </Header>
      <Content id="content">
        <router-view/>
      </Content>
      <Footer>2018 - {{(new Date()).getYear() + 1900}} &copy; Gifty</Footer>
    </Layout>
  </div>
</template>
<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#app
  font-family 'Open Sans', 'Avenir', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#content
  height calc(100vh - 133px)
  padding 50px
</style>
