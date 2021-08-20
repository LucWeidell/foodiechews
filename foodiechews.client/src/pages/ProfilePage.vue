<template>
  <div class="container-fluid">
    <div class="row" id="cover-img">
      <img :src="state.account.picture" alt="Profile Pic" class="rounded-circle profile-img ml-3">
    </div>
    <div class="row mt-5 ml-2 justify-content-center">
      <div class="col-12">
        <h4>No More Than 25 letters:!</h4>
      </div>
      <div class="col-11">
        <p>This should never be over 200 Characters. This is so we can wrap the text really nice like!</p>
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
  position: relative;
  bottom: -50px;
}
</style>
