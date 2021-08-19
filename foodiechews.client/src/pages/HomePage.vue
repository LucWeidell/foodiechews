<template>
  <div class="container-fluid" id="bg-img">
    <div class="row justify-content-center mt-5">
      <div class="col-9 col-md-6 card-transparent-white text-dark text-shadow-light">
        <h2 class="text-center">
          Among Us
        </h2>
        <p class="pt-3">
          You sussy? You need crewmates but don't know what's in skield? Use Among Us to find all the crewmates you ever could want!
        </p>
        <h2 class="text-center pt-3">
          How To Sus
        </h2>
        <p class="pt-3">
          Be In electric. That's it. Or be red. Both work!
        </p>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button
        class="btn btn-secondary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  name: 'Home',
  setup() {
    return {
      user: computed(() => AppState.user),
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
