<template>
  <div class="container-fluid" id="bg-img">
    <div v-if="Object.keys(state.pendingRest).length != 0" class="row mt-md-5 mt-2 justify-content-center">
      <div class="col-md-9">
        <h4 class="text-light">
          Going to:
        </h4>
        <RestaurantSearchShort :restaurant="state.pendingRest" />
      </div>
    </div>
    <TopSixCard />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, onMounted } from '@vue/runtime-core'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Notifier'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import { logger } from '../utils/Logger'

export default {
  name: 'MyRestaurants',
  setup() {
    onMounted(async() => {
      try {
        if (!AppState.account.activeLocation) {
          await accountService.addCity(AppState.activeLocation)
          Pop.toast('You added you first city!', 'success')
        }
        logger.log('I AM HERE:', AppState.account)
        if (AppState.account.pendingRestaurant) {
          const res = await yelpRestaurantsService.getByYelpId(AppState.account.pendingRestaurant.yelpId, AppState.account.activeLocation)
          logger.log('Res for pending:', res)
          state.pendingRest = res
        }
      } catch (error) {
        Pop.toast('Profile failed to push active city: ' + error, 'error')
      } finally {
        logger.log('I did it')
      }
    })
    const state = reactive({
      account: computed(() => AppState.account),
      pendingRest: {}
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
#bg-img{
  background-image: url('../assets/img/MyRestBackground.png');
  background-position: center;
  background-size: cover;
}
@media only screen and (min-width: 770px) {
  #bg-img {
    background-image: url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1867&q=80');
    background-size: cover;
    background-position: center;
  }
}
</style>
