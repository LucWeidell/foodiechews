<template>
  <!-- Only renders if this location has visited restaurants -->
  <div class="row justify-content-center my-3" v-if="allRestaurants.length !== 0">
    <div class="card bg-secondary col-md-6 col-10">
      <div class="card-header p-1">
        <div class="row justify-content-center">
          <div class="col-md-6 col-6 text-center">
            <h5>{{ location.city }}, {{ location.state }} </h5>
          </div>
        </div>
      </div>
      <div class="card-body p-2 bg-secondary">
        <div class="row justify-content-center">
          <RestaurantShortCard v-for="r in state.seeMore ? allRestaurants : sixRestaurants" :key="r.id" :restaurant="r" />
        </div>
      </div>
      <div class="class card-footer p-1 bg-secondary border-primary text-dark text-center">
        <p class="hoverable" @click="state.seeMore = !state.seeMore" v-if="allRestaurants > sixRestaurants">
          {{ state.seeMore ? 'Hide' : 'See More...' }}
        </p>
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
    location: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      seeMore: false
    })
    return {
      state,
      sixRestaurants: computed(() => AppState.myRestaurants.filter(r => r.location.city === props.location.city && r.location.state === props.location.state).slice(0, 6)),
      allRestaurants: computed(() => AppState.myRestaurants.filter(r => r.location.city === props.location.city && r.location.state === props.location.state))
    }
  }
}
</script>

<style>
.hoverable {
  cursor: pointer;
}
</style>
