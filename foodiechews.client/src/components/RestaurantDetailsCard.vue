<template>
  <div class="row justify-content-center mt-3 text-dark">
    <div class="col-md-11 col-11">
      <h4>{{ restaurant.name }}</h4>
    </div>
    <div class="col-10 d-flex justify-content-center">
      <img :src="restaurant.coverImgUrl" alt="restaruantImage" width="250" class="shadow">
    </div>
    <div class="col-md-11 col-11 mt-3">
      <h5>Details:</h5>
    </div>
    <div class="col-md-11 col-9 mt-3">
      <h5>Price: {{ restaurant.price }}</h5>
      <h5>Rating: {{ restaurant.rating }}</h5>
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
export default {
  name: 'RestaurantDetailsCard',
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      yelpId: computed(() => route.params.yelpId),
      hours: computed(() => {
        // TODO
        // Get today's day of the week as a num
        // Get info from Yelp's array
        // return an object w/ an "open" and "close" property
      })
    }
  }
}
</script>
