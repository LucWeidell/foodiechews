<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="d-flex flex-row bg-primary text-light text-center p-4">
      <div class="col-3">
        🔍
      </div>
      <div class="col-6">
        Random
      </div>
      <div class="col-3">
        🏠
      </div>
    </div>
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

</style>
