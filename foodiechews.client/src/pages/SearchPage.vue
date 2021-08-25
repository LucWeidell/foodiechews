<template>
  <div class="SearchPage">
    This is the search Page
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'SearchPage',
  setup() {
    const state = reactive({
      queryToSend: {}
    })
    return { state }
  }
}
</script>

<style lang="scss" scoped>

</style>
