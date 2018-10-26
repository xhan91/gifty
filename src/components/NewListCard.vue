<template>
  <Card class="card">
    <Row class="card-content" type="flex" justify="center">
      <Col>
        <Row>
          <Icon type="md-add" size="48"/>
        </Row>
        <br>
        <Row>
          <div>Create new gift list</div>
        </Row>
      </Col>
    </Row>
  </Card>
</template>

<style lang="stylus" scoped>
  .card
    width 300px
    height 250px
    margin 5px
    display inline-flex
    background-color #ffffff
    transition 0.2s
    :hover
      background-color #f8f8f9
    :active
      background-color #e8eaec

  .card-content
    width 268px
    height 218px
    flex-direction column
    font-size 16px  
    color #2d8cf0
</style>
