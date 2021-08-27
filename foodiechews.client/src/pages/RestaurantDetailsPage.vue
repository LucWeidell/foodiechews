<template>
  <div class="container-fluid" v-if="loading">
    <div class="row justify-content-center align-items-center" style="min-height: 80vh">
      <div class="col-6 text-center">
        <LoadingSpinner />
        <h2>Powered By Yelp...</h2>
      </div>
    </div>
  </div>
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
