<template>
  <span @click="isActive = true">
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
    <Modal
      v-model="isActive"
      title="New List"
      :mask-closable="false"
      :loading="true"
      @on-ok="createNewList"
      @on-cancel="resetForm"
      ref="modalInstance"
    >
      <div style="margin-bottom: 15px">
        <p>Please provide the details of your new list below.</p>
        <p v-if="err" style="color: red">
          {{ err }}
        </p>
      </div>
      <Input 
        v-model="name" 
        placeholder="Event Name*" 
        size="large"
        :clearable="true"
      ></Input>
      <Input 
        v-model="description" 
        placeholder="Description(optional)"
        size="large"
        type="textarea" 
        :autosize="{minRows: 2,maxRows: 5}"
      ></Input>
      <DatePicker
        v-model="eventDate"
        type="date"
        placeholder="Event Date*"
        style="width: 100%"
      ></DatePicker>
    </Modal>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import IGiftLists from '@/interfaces/IGiftLists';

@Component
export default class NewListCard extends Vue {
  // props
  @Prop(Object) private userDataRef: any;

  // data
  private isActive = false;
  private name = '';
  private description = '';
  private eventDate: Date | null = null;
  private err = '';

  // computed
  get user() {
    return this.$store.getters.getUser;
  }

  // methods
  private async createNewList() {
    if (!this.name || !this.eventDate) {
      this.err = 'Please fill the fields with *.';
      this.$refs.modalInstance.buttonLoading = false;
      return;
    }

    const newListId = String(+ new Date());
    const giftLists: IGiftLists = {};
    const link = `/gift-list/${this.user.uid}/${newListId}`;
    giftLists[newListId] = {
      id: newListId,
      name: this.name,
      description: this.description,
      eventDate: this.eventDate,
      link,
    };
    const data = { giftLists };

    await this.userDataRef.set(data, {merge: true});
    this.isActive = false;
    this.$router.push(link);
  }

  private resetForm() {
    this.name = '';
    this.description = '';
    this.eventDate = null;
    this.err = '';
  }

}
</script>

<style lang="stylus" scoped>
  .card
    width 300px
    height 250px
    margin 5px
    display inline-flex
    background-color #ffffff
    transition 0.2s

  .card:hover
    background-color #f8f8f9
    
  .card:active
    background-color #e8eaec

  .card-content
    width 268px
    height 218px
    flex-direction column
    font-size 16px  
    color #2d8cf0

  .ivu-input-wrapper
    margin-bottom 15px
</style>
