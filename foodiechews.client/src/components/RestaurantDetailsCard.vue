<template>
  <div class="row justify-content-center mt-3 text-dark">
    <div class="col-md-11 col-11">
      <h4>{{ restaurant.name }}</h4>
    </div>
    <div class="col-10 d-flex justify-content-center">
      <img :src="restaurant.coverImgUrl" alt="restaurant-image" width="250" class="shadow">
    </div>
    <div class="col-md-11 col-11 mt-3">
      <h5>Details:</h5>
      <div class="row pl-3">
        <div class="col-md-12 col-12 mt-3">
          <div class="row py-1">
            <div class="col-auto">
              <h5>Categories: </h5>
            </div>
            <div class="col-auto card bg-bootSec mx-1 mb-1" v-for="c in categories" :key="c.title">
              <h6 class="text-light">
                {{ c.title }}
              </h6>
            </div>
          </div>
          <h5>Address: {{ address }}</h5>
          <h5>Price: {{ restaurant.price }}</h5>
          <h5>Rating: {{ restaurant.rating }}</h5>
          <div class="row py-1">
            <div class="col-auto">
              <h5>Delivery Choice: </h5>
            </div>
            <div class="col-auto card bg-bootSec" v-for="d in delivery" :key="d">
              <h6 class="text-light">
                {{ fixUnderscores(d) }}
              </h6>
            </div>
          </div>
          <div v-if="restaurant.url" class="row py-1">
            <div class="col-auto">
              <h5>More Info: </h5>
            </div>
            <div class="col-auto">
              <a class="text-blue" :href="restaurant.url">{{ restaurant.name }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-11 col-11 mt-3">
      <h5>Hours:</h5>
    </div>
    <div class="col-md-10 col-9 mt-3 d-flex justify-content-center">
      <p>5am - 12am</p>
    </div>
    <span v-if="yelpId === 'random' ">
      <BRGbuttons />
    </span>
    <span v-else>
      <MyInfoCard />
    </span>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'RestaurantDetailsCard',
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    logger.log(props)
    logger.log(props.restaurant)
    const route = useRoute()
    return {
      yelpId: computed(() => route.params.yelpId),
      hours: computed(() => {
        // TODO
        // Get today's day of the week as a num
        // Get info from Yelp's array
        // return an object w/ an "open" and "close" property
      }),
      address: computed(() => props.restaurant.location.display_address[0] + ' ' + props.restaurant.location.display_address[1]),
      categories: computed(() => props.restaurant.categories),
      delivery: computed(() => {
        logger.log('I got to TRANS this:', props.restaurant.transactions)

        return props.restaurant.transactions
      }),
      fixUnderscores(strToFix) {
        const result = strToFix.replace('_', ' ')
        return result
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg-bootSec {
    background-color: rgb(194, 117, 2)
  }

</style>
