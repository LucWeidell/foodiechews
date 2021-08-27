<template>
  <div class="row justify-content-center">
    <div class="col-md-11 col-11">
      <h4>
        {{ cityrestaurant.location.city }}
      </h4>
      <p v-if="state.account.showRestaurants === true">
        <FeedRestaurantCard v-for="m in myRests" :key="m.id" :myrest="m" />
      </p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    cityrestaurant: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      myRests: computed(() => AppState.sixRests.filter(r => r.location.city === props.cityrestaurant.location.city && r.location.state === props.cityrestaurant.location.state))
    }
  }
}
</script>
