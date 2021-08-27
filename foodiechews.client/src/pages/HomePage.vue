<template>
  <div class="container-fluid" id="bg-img">
    <div class="row justify-content-center mt-4">
      <div class="col-9 col-md-6 card-transparent-white text-dark text-shadow-light mt-5">
        <h2 class="text-center">
          About Us
        </h2>
        <p class="pt-3 text-center">
          ♪ When you're craving something new but don't know what to do... FoodieChews! ♪
        </p>
        <h2 class="text-center pt-3">
          How To Use
        </h2>
        <p class="text-center pt-3">
          Hit the random button below to find a restaurant in your area!
          <br />
          <br />
          Create an account to save your foodie history and see other cravers favorite places!
        </p>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button
        class="btn btn-primary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import getLocation from '../utils/LocationGetter'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      await getLocation()
    })
    return {
      user: computed(() => AppState.user),
      location: computed(() => AppState.activeLocation),
      async login() {
        AuthService.loginWithPopup()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.card-transparent-white{
  background-color: rgba(255, 255, 255, 0.85);
}
#bg-img{
  background-image: url('../assets/img/eatsSign.png');
  background-position: center;
  background-size: cover;
}
.text-shadow-light{
  text-shadow: 0px 1px white;
}

</style>
