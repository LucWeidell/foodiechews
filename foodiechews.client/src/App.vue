<template>
  <header>
    <NavbarMobileTop v-if="isMobile" />
    <NavbarDesktopTop v-else />
  </header>
  <main class="my-5 py-2">
    <h1 class="text-dark">
      {{ screenSize }}
    </h1>
    <router-view />
  </main>
  <footer>
    <NavbarMobileBottom v-if="isMobile" />
    <NavbarDesktopBottom v-else />
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
