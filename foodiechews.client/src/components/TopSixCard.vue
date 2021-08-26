<template>
  <div class="row justify-content-center mt-md-5" @click="dropDownToggle">
    <div class="col-10 bg-light mt-md-3 mt-4" v-if="state.dropOpen">
      <h5 class="my-2 text-center drop-border pb-2">
        {{ account.name }} |  10 / 200 <i class="mdi mdi-arrow-down-drop-circle"></i>
      </h5>
      <h4>
        CITY
      </h4>
      <ul>
        <li>RESTAURANT 1</li>
        <li>RESTAURANT 2</li>
        <li>RESTAURANT 3</li>
      </ul>
    </div>
    <div class="col-10 bg-light mt-md-3 mt-4" v-else>
      <h5 class="my-2 text-center">
        {{ account.name }} |  10 / 200 <i class="mdi mdi-arrow-right-drop-circle"></i>
      </h5>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      // TODO: Set to false on deploy
      dropOpen: false,
      closedClass: '',
      openClass: ''
    })
    return {
      state,
      account: computed(() => AppState.account),
      dropDownToggle() {
        state.dropOpen = !state.dropOpen
      }
    }
  }
}
</script>

<style scoped>
.drop-border{
  border-bottom: 1px solid var(--gray);
}
</style>
