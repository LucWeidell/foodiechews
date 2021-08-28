<template>
  <header>
    <div v-if="isMobile">
      <NavbarMobileTop />
    </div>
    <div v-else>
      <NavbarDesktopTop />
    </div>
  </header>
  <main class="my-5 py-2">
    <h1 class="text-dark">
      {{ screenSize }}
    </h1>
    <router-view />
  </main>
  <footer>
    <div v-if="isMobile">
      <NavbarMobileBottom />
    </div>
    <div v-else>
      <NavbarDesktopBottom />
    </div>
  </footer>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      isMobile: computed(() => AppState.isMobile),
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.action{
  cursor: pointer;
}
</style>
