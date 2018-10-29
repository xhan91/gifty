<template>
  <span>
    <Card class="card">
      <Row class="card-content" type="flex" justify="center">
        <h1>
          {{gift.name}}
        </h1>
        <p class="price">
          {{gift.price}}
        </p>
      </Row>
    </Card>
  </span>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class GiftCard extends Vue {
  // props
  @Prop(Object) private gift: any;

}
</script>

<style lang="stylus" scoped>
  .card
    width 300px
    height 250px
    margin 5px
    display inline-flex
    background-color #2d8cf0
    transition 0.2s
    
  .card:hover
    background-color #5cadff
    
  .card:active
    background-color #2b85e4

  .card-content
    width 268px
    height 218px
    flex-direction column
    font-size 16px  
    color #ffffff

  .ivu-input-wrapper
    margin-bottom 15px

  .price
    color #cdcdcd
</style>
