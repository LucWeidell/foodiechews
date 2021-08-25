<template>
  <div class="col-12 d-flex justify-content-center mt-3">
    <button type="button" class="btn-sm btn-secondary" @click="addToMyRestaurants">
      <h5 class="pt-1">
        I've Been 👍
      </h5>
    </button>
  </div>
  <div class="col-12 d-flex justify-content-center mt-3">
    <button type="button" class="btn-sm btn-secondary px-3" @click="getRandom">
      <h5 class="pt-1">
        Re-Roll 🎲
      </h5>
    </button>
  </div>
  <div class="col-12 d-flex justify-content-center mt-3 mb-5">
    <button type="button" class="btn-sm btn-secondary">
      <h5 class="pt-1">
        I'm Going 🏃‍♂️
      </h5>
    </button>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { myRestaurantsService } from '../services/MyRestaurantsService'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import Pop from '../utils/Notifier'

export default {
  setup() {
    const route = useRoute()
    return {
      async getRandom() {
        try {
          let restaurant = {}
          if (!AppState.account.id) {
            restaurant = await yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.activeLocation)
          } else {
            restaurant = await yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.account.activeLocation)
          }
          if (!restaurant) {
            Pop.toast('BRG Comp failed to get restaurant:', 'error')
          }
        } catch (error) {
          Pop.toast('BRG comp failed to get yelpRest: ' + error, 'error')
        }
      },
      async addToMyRestaurants() {
        try {
          myRestaurantsService.addNew(AppState.activeRestaurant)
        } catch (error) {
          Pop.toast(error, 'I dunno what happened.')
        }
      }
    }
  }
}
</script>
