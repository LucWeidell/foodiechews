<template>
  <div class="row justify-content-center my-3">
    <div class="card bg-secondary col-md-8 col-10">
      <div class="card-header">
        <div class="row justify-content-between">
          <div class="col-md-6 col-6">
            <h5>{{ location.city }}</h5>
          </div>
          <div class="col-md-5 col-5 text-right">
            <h5>Total</h5>
          </div>
        </div>
      </div>
      <div class="card-body bg-secondary">
        <div class="row justify-content-center">
          <RestaurantShortCard v-for="r in restaurants" :key="r.id" :restaurant="r" />
        </div>
      </div>
      <div class="class-footer bg-secondary border-primary text-secondary text-center">
        <br>
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
  setup() {
    const state = reactive({
    })
    return {
      state,
      restaurants: computed(() => AppState.myRestaurants)
    }
  }
}
</script>
