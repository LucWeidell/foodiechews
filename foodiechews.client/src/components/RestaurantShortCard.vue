<template>
  <div class="col-md-11 col-12 bg-light mb-3 rounded">
    <router-link :to="{name: 'RestaurantsDetails', params: {id: state.account.id, yelpId: restaurant.yelpId }}">
      <b>{{ restaurant.name }}</b>
    </router-link>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
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
