<template>
  <div class="d-flex flex-row bg-primary fixed-bottom text-light text-center align-items-center m-0">
    <div class="text-center col-2">
      <router-link :to="{ url: 'https://www.yelp.com/' }" class="nav-link text-light align-items-center" title="Yelp Website">
        Powered By:
        <img src="../assets/img/yelp-dark.png" class="mb-2" alt="yelp-logo">
      </router-link>
    </div>
    <div class="nav-item" title="About">
      <router-link :to="{ name: 'About' }" class="nav-link  text-light">
        About
      </router-link>
    </div>
    <div class="col-4 py-1" title="Home">
      <router-link :to="{name: 'FeedPage', params: {id: state.account.id}}">
        <img src="../assets/img/Home.png"
             class="pb-1"
             alt="Home Button"
             width="50"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
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
<style scoped lang="scss">
.action{
  cursor: pointer;
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--light);
}

img{
  max-height:100px;
  max-width:100px;
}
</style>
