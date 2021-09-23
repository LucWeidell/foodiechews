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
              <h5>
                <a class=" text-blue d-flex align-items-end" :href="restaurant.url" target="_blank" :title="restaurant.name + ' Yelp Page'"><img src="../assets/yelp/yelp_logos/Logo/Light_bg/RGB/yelp_logo.svg" class="yelp" alt="yelp logo"><small class=""><b>{{ restaurant.name }}</b></small></a>
              </h5>
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
    <div class="col-lg-6 py-2">
      <div v-if="!isInMyRest" class="row justify-content-between">
        <BRGbuttons />
      </div>
      <span v-else>
        <MyInfoCard />
      </span>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { ratingsUtil } from '../utils/RatingsUtil'
import { AppState } from '../AppState'

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
    let isInMyRest = false

    watchEffect(() => {
      if (AppState.myRestaurants.find(r => r.yelpId === props.restaurant.id)) {
        isInMyRest = true
      }
    })
    function formatTime(time) {
      let timeOfDay = ''
      if (time < 1200) {
        timeOfDay = 'AM'
      } else {
        timeOfDay = 'PM'
      }
      if (time > 1299) {
        time -= 1200
      }
      const minutes = time.toString().substr(-2)
      let hour = ''
      if (time > 999) {
        hour = time.toString().substr(0, 2)
      } else {
        hour = time.toString()[0]
      }
      let newTime = `${hour}:${minutes} ${timeOfDay}`
      if (newTime === '0:00 AM') {
        newTime = 'Midnight'
      }
      return newTime
    }
    return {
      isInMyRest,
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
      /**
       * Converts today's date as a number to match Yelp's format (0 is Monday)
       */
      getTodayYelp() {
        const d = new Date()
        let today = d.getDay()
        if (today === 0) {
          today = 6
        } else {
          today -= 1
        }
        return today
      },
      fixLayout(restaurant) {
        // NOTE: Yelp always provides times in 24-hour format as a number. 0 is Monday, 6 is Sunday
        const todaysHours = restaurant.hours[0].open.find(d => d.day === this.getTodayYelp())
        if (!todaysHours) {
          return { open: 'Not Open', close: 'Not Open' }
        }
        const open = formatTime(todaysHours.start)
        const close = formatTime(todaysHours.end)
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
  .yelp{
    max-height: 8vh;
    max-width: 8vh;
  }
</style>
