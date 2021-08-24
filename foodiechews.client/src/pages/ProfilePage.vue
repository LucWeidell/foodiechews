<template>
  <div class="container-fluid">
    <div class="row" id="cover-img">
      <img :src="state.account.picture || 'https://via.placeholder.com/150'" alt="Profile Pic" class="ml-3 rounded-circle profile-img">
    </div>
    <div class="row mt-5">
      <div class="card col-12 shadow">
        <div class="card-body">
          <h5 class="card-title">
            Card title
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            Card subtitle
          </h6>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>

#cover-img{
  background-image: url('../assets/img/cover-img.jpg');
  background-position: center;
  background-size: cover;
  min-height: 15vh;
  min-width: 100vw;
}
.profile-img{
  max-height: 100px;
  min-height: 100px;
  max-width: 100px;
  position: relative;
  bottom: -7vh;
  z-index: 1;
}
</style>
