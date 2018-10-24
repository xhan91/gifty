<template>
  <div>
    <Breadcrumb style="text-align: left; padding: 10px">
      <BreadcrumbItem>Home</BreadcrumbItem>
    </Breadcrumb>
    <Card :dis-hover="true">
      <NewListCard />
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewListCard from '@/components/NewListCard.vue'; // @ is an alias to /src

@Component({
  components: {
    NewListCard,
  },
})
export default class Home extends Vue {

  // computed
  get user() {
    return this.$store.getters.getUser;
  }

}
</script>
