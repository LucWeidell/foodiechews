<template>
  <div class="container-fluid" id="bg-img">
    <RestaurantDetailsCard :restaurant="restaurant" />
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    watchEffect(() => {
      if (AppState.account.id) {
        yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.account.activeLocation)
      }
    })
    // REVIEW TODO: Use watchEffect instead of onMounted
    return {
      restaurant: computed(() => AppState.activeRestaurant),
      account: computed(() => AppState.account)
    }
  }
}
</script>
