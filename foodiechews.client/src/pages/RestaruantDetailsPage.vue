<template>
  <div class="container-fluid" id="bg-img">
    <RestaurantDetailsCard :restaurant="restaurant" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      if (route.params.yelpId !== 'random') {
        await yelpRestaurantsService.getByYelpId(route.params.yelpId)
      }
    })
    return {
      restaurant: computed(() => AppState.activeRestaurant)
    }
  }
}
</script>
