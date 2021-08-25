<template>
  <div class="container-fluid" v-if="loading">
    <div class="row justify-content-center align-items-center" style="min-height: 80vh">
      <div class="col-6 text-center">
        <div class="lds-ring">
          <div></div><div></div><div></div><div></div>
        </div>
        <h2>Loading new food...</h2>
      </div>
    </div>
  </div>
  <div class="container-fluid" id="bg-img" v-else>
    <RestaurantDetailsCard :restaurant="restaurant" />
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import { AppState } from '../AppState'

export default {
  setup() {
    const route = useRoute()
    onMounted(() => { AppState.loading = true })
    watchEffect(async() => {
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
    // REVIEW TODO: Use watchEffect instead of onMounted
    return {
      restaurant: computed(() => AppState.activeRestaurant),
      account: computed(() => AppState.account),
      loading: computed(() => AppState.loading)
    }
  }
}
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
