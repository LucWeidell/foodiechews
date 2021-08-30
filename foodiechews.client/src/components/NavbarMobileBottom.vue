<template>
  <div class="d-flex flex-row bg-primary fixed-bottom text-light text-center align-items-center m-0">
    <div class="col-4 py-1">
      <router-link :to="{name: 'SearchPage', params: {id: state.account.id}}">
        <img src="../assets/img/search.png"
             class="p-0 action"
             alt="Search Button"
             width="50"
        >
      </router-link>
    </div>
    <div class="col-4 py-1 border-right border-left border-dark">
      <router-link :to="{name: 'RestaurantsDetails', params: {id: state.account.id, yelpId: 'random'}}">
        <img src="../assets/img/randomRed.png"
             class="p-0 action"
             alt="Random Button"
             width="50"
        >
      </router-link>
    </div>
    <div class="col-4 py-1">
      <router-link :to="{name: 'FeedPage', params: {id: state.account.id}}">
        <img src="../assets/img/Home.png"
             class="pb-1"
             alt="Home Button"
             width="50"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state
    }
  }
}
</script>
<style scoped lang="scss">
.action{
  cursor: pointer;
}
</style>
