<template>
  <div class="col-12 d-flex justify-content-center mt-3">
    <button type="button" class="btn-sm btn-secondary">
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
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
export default {
  setup() {
    const route = useRoute()
    return {
      getRandom() {
        yelpRestaurantsService.getByYelpId(route.params.yelpId, AppState.account.activeLocation)
      }
    }
  }
}
</script>
