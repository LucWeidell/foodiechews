<template>
  <div class="row justify-content-center my-5">
    <div class="card bg-blueish col-md-6 col-10">
      <div class="card-header p-1">
        <div class="row justify-content-center">
          <div class="col-md-6 col-6 text-center mt-2">
            <h5 class="text-light">
              {{ location.location.city }}, {{ location.location.state }}
            </h5>
          </div>
        </div>
      </div>
      <div class="card-body p-2 bg-blueish">
        <div class="row justify-content-center" v-if="state.account.showRestaurants === true">
          <RestaurantShortCard v-for="r in state.seeMore ? allRestaurants : sixRestaurants" :key="r.id" :restaurant="r" />
        </div>
      </div>
      <div class="class card-footer p-1 bg-blueish border-primary text-light text-center">
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
      seeMore: false,
      account: computed(() => AppState.account)
    })
    return {
      state,
      sixRestaurants: computed(() => AppState.profileDetails.filter(r => r.location.city === props.location.location.city && r.location.state === props.location.location.state).slice(0, 6)),
      allRestaurants: computed(() => AppState.profileDetails.filter(r => r.location.city === props.location.location.city && r.location.state === props.location.location.state))
    }
  }
}
</script>

<style>
.hoverable {
  cursor: pointer;
}
.bg-blueish{
  background-color: #6e1ef3;
}
</style>
