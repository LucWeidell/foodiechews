<template>
  <div class="col-12 bg-light mb-3 rounded pt-2">
    <router-link :to="{name: 'RestaurantsDetails', params: {id: state.account.id, yelpId: restaurant.id }}">
      <div class="row justify-content-md-between">
        <div class="col-md-6 col-7">
          <b>{{ restaurant.name }}</b>
          <p>{{ address }}</p>
        </div>
        <div class="col-2 d-flex align-items-center pt-1">
          <h6>Rating: <span><img :src="rating" alt="Unable to retrieve rating." :title="restaurant.rating + ' Stars'"></span></h6>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { ratingsUtil } from '../utils/RatingsUtil'
import { logger } from '../utils/Logger'

export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    logger.log('my prop in Rest search: ', props.restaurant)
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      rating: computed(() => {
        return ratingsUtil.getStars(props.restaurant.rating)
      }),
      address: computed(() => props.restaurant.location.display_address[0])

    }
  }
}
</script>
