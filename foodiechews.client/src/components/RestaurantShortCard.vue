<template>
  <div class="col-md-11 col-12 bg-light mb-3 rounded">
    <div class="row justify-content-md-between">
      <div class="col-md-6 col-10">
        <router-link :to="{name: 'RestaurantsDetails', params: {id: state.account.id, yelpId: restaurant.yelpId }}">
          <b>{{ restaurant.name }}</b>
        </router-link>
      </div>
      <div class="col-md-1 col-1 d-flex align-items-center">
        <span v-if="restaurant.tag === 'favorite'">
          ⭐
        </span>
        <span v-else-if="restaurant.tag === 'none'"></span>
      </div>
    </div>
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
