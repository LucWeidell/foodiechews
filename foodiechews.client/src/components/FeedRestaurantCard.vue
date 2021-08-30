<template>
  <div class="row justify-content-center">
    <div class="col-md-11 col-11">
      <b>
        ◾
        <router-link :to="{name: 'RestaurantsDetails', params: {id: state.account.id, yelpId: myrest.yelpId }}">
          {{ myrest.name }}
        </router-link>
      </b>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    myrest: {
      type: Object,
      required: true
    }
  },
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
