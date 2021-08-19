<template>
  <div class="container-fluid" id="bg-img">
    <RestaurantDetailsCard />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
}
</script>
