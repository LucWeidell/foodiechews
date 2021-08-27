<template>
  <VisitModal />
  <div class="col-sm-4 d-flex justify-content-center mt-3 mb-sm-5">
    <button type="button"
            class="btn-sm btn-secondary"
            :class="{disabled: matchedRestaurant}"
            @click="addToMyRestaurants"
            :disabled="matchedRestaurant"
            data-toggle="modal"
            data-target="#staticBackdrop"
    >
      <h5 class="pt-1">
        I've Been 👍
      </h5>
    </button>
  </div>
  <div class="col-sm-4 d-flex justify-content-center mt-3 mb-sm-5">
    <button type="button" class="btn-sm btn-secondary px-3" @click="getRandom">
      <h5 class="pt-1">
        Re-Roll 🎲
      </h5>
    </button>
  </div>
  <div class="col-sm-4 d-flex justify-content-center mt-3 mb-5">
    <button type="button" class="btn-sm btn-secondary" @click="going">
      <h5 class="pt-1">
        I'm Going 🏃‍♂️
      </h5>
    </button>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import Pop from '../utils/Notifier'
import { accountService } from '../services/AccountService'

export default {
  setup() {
    const route = useRoute()
    return {
      matchedRestaurant: computed(() => {
        const found = AppState.myRestaurants.find(rest =>
          rest.yelpId === AppState.activeRestaurant.id
        )
        if (found) {
          return true
        }
        return false
      }),
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
      async going() {
        const rawAccount = {
          pendingRestaurant: {
            yelpId: AppState.activeRestaurant.id,
            exists: true
          }
        }
        try {
          accountService.editAccount(rawAccount)
        } catch (error) {
          Pop.toast(error + "That didn't work :(", 'error')
        }
      }
    }
  }
}
</script>
