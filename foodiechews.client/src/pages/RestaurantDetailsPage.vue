<template>
  <LoadingSpinner v-if="loading" />
  <div class="container-fluid mt-3" id="bg-img" v-else>
    <RestaurantDetailsCard :restaurant="restaurant" v-if="restaurant.location" />
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import getLocation from '../utils/LocationGetter'

export default {
  setup() {
    const route = useRoute()
    onBeforeMount(async() => {
      logger.log('I set this true first')
      AppState.loading = true
    })
    onMounted(async() => {
      if (!AppState.activeLocation.city) {
        await getLocation()
      }
      if (AppState.account.id) {
        if (route.params.yelpId) {
          await yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.account.activeLocation)
        }
      } else {
        if (route.params.yelpId) {
          await yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.activeLocation)
        }
      }
    }
    )
    watchEffect(async() => {
      if (AppState.activeLocation.city) {
        if (route.params.yelpId) {
          await yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.activeLocation)
        }
      }
    })
    return {
      restaurant: computed(() => AppState.activeRestaurant),
      account: computed(() => AppState.account),
      loading: computed(() => AppState.loading)
    }
  }
}
</script>

<style scoped>

</style>
