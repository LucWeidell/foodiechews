<template>
  <div class="row justify-content-center mt-md-1 mt-2" @click="dropDownToggle">
    <div class="col-md-5 col-10 bg-light mt-md-3 mt-4" v-if="state.dropOpen">
      <h5 class="my-2 text-center drop-border pb-2">
        {{ account.name }} <i class="mdi mdi-arrow-down-drop-circle"></i>
      </h5>
      <CityCard v-for="c in cityRestaurants" :key="c.id" :cityrestaurant="c" />
    </div>
    <div class="col-md-5 col-10 bg-light mt-md-3 mt-4 shadow" v-else @click="getSix(myRests)">
      <h5 class="my-2 text-center">
        {{ account.name }} <i class="mdi mdi-arrow-right-drop-circle"></i>
      </h5>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  // props: {
  //   profile: {
  //     type: Object,
  //     required: true
  //   }
  // },
  setup() {
    const state = reactive({
      // TODO: Set to false on deploy
      dropOpen: false,
      closedClass: '',
      openClass: ''
    })
    onMounted(() => {
      AppState.myRestaurants.reverse()
    })
    function getSix(myRest) {
      AppState.sixRests = myRest
      const topSix = myRest
      const places = []
      for (let i = 0; i < 6; i++) {
        const foundItem = topSix[i]
        if (!places.find(l => (l.location.city === foundItem.location.city && l.location.state === foundItem.location.state))) {
          places.push(foundItem)
          // logger.log('Pushed FoundItem : ', foundItem)
        }
        AppState.locations = places
      }
      logger.log(AppState.locations)
    }
    return {
      getSix,
      state,
      myRests: computed(() => AppState.myRestaurants.reverse().slice(0, 6)),
      cityRestaurants: computed(() => AppState.locations),
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
