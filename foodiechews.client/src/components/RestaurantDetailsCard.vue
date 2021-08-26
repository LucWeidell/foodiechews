<template>
  <div class="row justify-content-center mt-3 text-dark">
    <div class="col-md-11 col-11">
      <h4>{{ restaurant.name }}</h4>
    </div>
    <div class="col-10 d-flex justify-content-center">
      <img :src="restaurant.image_url || 'src/assets/img/empty-plate.jpg' " alt="restaurant-image" class="shadow img-main rounded">
    </div>
    <div class="col-md-11 col-11 mt-3">
      <h5>Details:</h5>
      <div class="row pl-3">
        <div class="col-md-12 col-12 mt-3">
          <div class="row py-1">
            <div class="col-auto m-1 pt-1">
              <h5>Categories: </h5>
            </div>
            <div class="col-auto card bg-bootSec mx-1 mb-1 pt-1" v-for="c in categories" :key="c.title">
              <h6 class="text-light pt-1">
                {{ c.title }}
              </h6>
            </div>
          </div>
          <h5>Address: {{ address }}</h5>
          <h5>Price: {{ restaurant.price }}</h5>
          <h5>Rating: <span><img :src="rating" alt="Unable to retrieve rating." :title="restaurant.rating + ' Stars'"></span></h5>
          <!-- <h5>Rating: {{ restaurant.rating }}</h5> -->
          <div v-if="delivery.length > 0" class="row py-1">
            <div class="col-auto">
              <h5>Delivery Choice: </h5>
            </div>
            <div class="col-auto card bg-bootSec m-1" v-for="d in delivery" :key="d">
              <h6 class="text-light m-1">
                {{ fixUnderscores(d) }}
              </h6>
            </div>
          </div>
          <div v-if="restaurant.url" class="row py-1">
            <div class="col-auto">
              <h5> 🌐Website: </h5>
            </div>
            <div class="col-auto">
              <a class="text-blue" :href="restaurant.url" target="_blank"><b><i>{{ restaurant.name }} Site</i></b></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-11 col-11 mt-3">
      <h5>Hours:</h5>
    </div>
    <div class="col-md-10 col-9 mt-3 d-flex justify-content-center">
      <p>{{ fixLayout(restaurant).open }} - {{ fixLayout(restaurant).close }}</p>
    </div>
    <div class="col-md-6 py-2">
      <div v-if="yelpId === 'random' " class="row">
        <BRGbuttons />
      </div>
      <span v-else>
        <MyInfoCard />
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { ratingsUtil } from '../utils/RatingsUtil'

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
      address: computed(() => props.restaurant.location.display_address[0] + ' ' + props.restaurant.location.display_address[1]),
      categories: computed(() => props.restaurant.categories),
      delivery: computed(() => {
        logger.log('I got to TRANS this:', props.restaurant.transactions)

        return props.restaurant.transactions
      }),
      rating: computed(() => {
        return ratingsUtil.getStars(props.restaurant.rating)
      }),
      fixUnderscores(strToFix) {
        const result = strToFix.replace('_', ' ')
        return result
      },
      getToday() {
        const d = new Date()
        const today = d.getDay()
        return today
      },
      fixLayout(restaurant) {
        let open = restaurant.hours[0].open[this.getToday()].start
        if (open < 1200) {
          open = open + ' AM'
        } else {
          open = open - 1200 + ' PM'
          // TODO: Fix time formatting
        }
        let close = restaurant.hours[0].open[this.getToday()].end
        if (close > 1200) {
          close = close - 1200 + ' PM'
        } else {
          let stringDate = close + ''
          if (stringDate === '0000') {
            stringDate = 'Midnight'
            close = stringDate
          } else {
            close = close + ' AM'
          }
        }
        return { open, close }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg-bootSec {
    background-color: rgb(146, 145, 143)
  }
  .img-main{
    max-width: 50vh;
    max-height: 50vh;
    border: 5px white solid;
  }
</style>
