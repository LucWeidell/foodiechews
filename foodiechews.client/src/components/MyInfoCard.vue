<template>
  <h1>{{ state.myRestaurant.tag === 'none' ? '' : '*' }}</h1>
  <div class="div" v-if="visits.length === 0">
    <em>No Review Yet</em>
  </div>
  <div v-else>
    <p v-for="v in visits" :key="v.id">
      {{ v.review }}
    </p>
  </div>
</template>

<script>
import { computed, onMounted, reactive, watchEffect } from '@vue/runtime-core'
import { visitsService } from '../services/VisitsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      myRestaurant: {}
    })
    // TODO: When moving from a yelpID details page back to "random," the "myRestaurants" triggers an undefined error but doesn't seem to block functionality.
    watchEffect(async() => {
      if (AppState.myRestaurants.length !== 0) {
        const myRestaurant = AppState.myRestaurants.find(r => r.yelpId === route.params.yelpId)
        state.myRestaurant = myRestaurant
        await visitsService.getVisitsByMyRestaurantId(myRestaurant.id)
      }
    })
    return {
      state,
      visits: computed(() => AppState.visits)
    }
  }
}
</script>
