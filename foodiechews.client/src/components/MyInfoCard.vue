<template>
  <div class="card">
    <h1>
      <!-- TODO: onclick to mark restaurant as favorite -->
      <span @click="changeFavorite" class="action star" :class="state.myRestaurant.tag === 'none' ? 'mdi mdi-star-outline' : 'mdi mdi-star' " title="Favorited"></span>
      <div class="div" v-if="visits.length === 0">
        <em>No Review Yet</em>
      </div>
      <div v-else>
        <p v-for="v in visits" :key="v.id">
          {{ v.review.length === 0 ? 'Leave a review' : v.review }}
        </p>
      </div>
    </h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive, watchEffect } from '@vue/runtime-core'
import { visitsService } from '../services/VisitsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { myRestaurantsService } from '../services/MyRestaurantsService'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      myRestaurant: {},
      favorite: computed(() => {
        return state.myRestaurant.tag === 'favorite'
      })
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
      visits: computed(() => AppState.visits),
      // NOTE: In the server model, MyRestaurants have a "tag" property with an Enum string as either "none" or "favorite." This function effectively translates this into a boolean for the sake of the current functionality, but is meant to "scale up" to allow more tags down the line.
      async changeFavorite() {
        const updatedRest = await myRestaurantsService.changeFavorite(route.params.yelpId, state.favorite)
        state.myRestaurant = updatedRest
      }
    }
  }
}
</script>

<style scoped>
.star{
  color: goldenrod;
}
</style>
