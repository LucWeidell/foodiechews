<template>
  <LoadingSpinner v-if="loading" />
  <div class="container-fluid mt-4" id="bg-img" v-else>
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
import { accountService } from '../services/AccountService'

export default {
  setup() {
    const route = useRoute()
    onBeforeMount(async() => {
      logger.log('I set this true first')
      AppState.loading = true
    })
    onMounted(async() => {
      // REVIEW: Non-users aren't working perfectly.
      await accountService.getAccount()
      logger.log('accountID', AppState.account.id)
      if (AppState.account.activeLocation) {
        if (route.params.yelpId) {
          await yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.account.activeLocation)
        }
      } else {
        logger.log('else statement')
        await getLocation()
        // REVIEW: How to make this actually work like we want to lol
        setTimeout(() => { yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.activeLocation) }, 8000)
      }
    }
    )
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
