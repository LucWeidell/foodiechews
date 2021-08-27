<template>
  <header>
    <NavbarDesktopTop />
  </header>
  <main class="my-5 py-2">
    <router-view />
  </main>
  <footer>
    <NavbarDesktopBottom />
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
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
