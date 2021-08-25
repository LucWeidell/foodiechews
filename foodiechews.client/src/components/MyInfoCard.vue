<template>
  <p>{{ visits[0].review }}</p>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { visitsService } from '../services/VisitsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (AppState.myRestaurants.length !== 0) {
        const myRestaurant = AppState.myRestaurants.find(r => r.yelpId === route.params.yelpId)
        await visitsService.getVisitsByMyRestaurantId(myRestaurant.id)
      }
    })
    return {
      visits: computed(() => AppState.visits)
    }
  }
}
</script>
