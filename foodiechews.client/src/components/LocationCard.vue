<template>
  <div class="row justify-content-center my-3">
    <div class="card bg-secondary col-md-6 col-10">
      <div class="card-header">
        <div class="row justify-content-center">
          <div class="col-md-6 col-6 text-center">
            <h5>{{ location.city }}</h5>
          </div>
        </div>
      </div>
      <div class="card-body bg-secondary">
        <div class="row justify-content-center">
          <RestaurantShortCard v-for="r in restaurants" :key="r.id" :restaurant="r" />
        </div>
      </div>
      <div class="class-footer bg-secondary border-primary text-dark text-center">
        <p class="pb-3 hoverable">
          See More...
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
    })
    return {
      state,
      restaurants: computed(() => AppState.myRestaurants.filter(r => r.location.city === props.location.city && r.location.state === props.location.state))
    }
  }
}
</script>

<style>
.hoverable {
  cursor: pointer;
}
</style>
