<template>
  <div class="col-md-11 col-12 bg-light mb-3">
    {{ restaurant.name }}
  </div>
</template>

<script>
export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  setup() {
  }
}
</script>
