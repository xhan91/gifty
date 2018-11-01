<template>
  <span @click="goToList">
    <Card class="card">
      <Row class="card-content" type="flex" justify="center">
        <h1>
          {{listData.name}}
        </h1>
        <p class="subinfo">
          {{eventDateStr}}
        </p>
      </Row>
    </Card>
  </span>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ListCard extends Vue {

  // props
  @Prop(Object) private listData: any;

  // computed
  get eventDateStr() {
    return (new Date(this.listData.eventDate.seconds*1000)).toLocaleDateString();
  }

  // methods
  private goToList() {
    this.$router.push(this.listData.link);
  }

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
  filter brightness(120%)
    
.card-content
  width 268px
  height 218px
  flex-direction column
  font-size 16px  
  color #ffffff

.subinfo
  color #cdcdcd

.ivu-input-wrapper
  margin-bottom 15px
</style>
