<template>
  <div class="container-fluid">
    <div class="row" id="cover-img">
      <img :src="account.picture" alt="Profile Pic">
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
</style>
