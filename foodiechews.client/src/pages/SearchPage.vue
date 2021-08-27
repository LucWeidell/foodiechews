<template>
  <div class="SearchPage container-fluid" id="bg-img">
    <div v-if="!state.searchingStarted" class="row justify-content-around py-3">
      <div class="col-sm-12">
        <h5 class="m-3 text-center text-white">
          Filter Your Search:
        </h5>
      </div>
      <div class="col-9 bg-bootSec text-dark shadow-sm mb-2 mt-1 rounded pb-2">
        <h6 class="pt-2">
          <b>Whats Your Budget?</b>
        </h6>
        <small><i>Note - choose only one of the options</i></small>
        <div v-for="(price, index) in prices" :key="index" class="form-inline form-check">
          <input type="checkbox" :name="price.length" :id="price.length" class="form-check-input" v-model="state.priceSet[price]">
          <label :for="price.length" class="form-check-label">{{ price }}</label>
        </div>
      </div>
      <div class="col-9 bg-bootSec text-dark shadow-sm mb-2 rounded pb-2">
        <h6 class="pt-2">
          <b>Dietary Requirement?</b>
        </h6>
        <div v-for="(type, index) in healthies" :key="index" class="form-inline form-check">
          <input type="checkbox" :name="type" :id="type" class="form-check-input" v-model="state.categoriesSelect[type]">
          <label :for="type" class="form-check-label">{{ type }}</label>
        </div>
      </div>
      <div class="col-9 bg-bootSec text-dark shadow-sm mb-2 rounded pb-2">
        <h6 class="pt-2">
          <b>Craving Something Specific?</b>
        </h6>
        <small><i>Note - choose only one of the options</i></small>
        <div v-for="(type, index) in categories" :key="index" class="form-inline form-check">
          <input type="checkbox" :name="type" :id="type" class="form-check-input" v-model="state.categoriesSelect[type]">
          <label :for="type" class="form-check-label">{{ type }}</label>
        </div>
      </div>
      <div class="col-4">
        <button type="button" class="btn btn-light shadow" style="text-shadow: 1px 1px blue" @click="filterSearch">
          <i>Search</i>
        </button>
      </div>
    </div>
    <div v-else class="row justify-content-around mt-3">
      <div class="col-11">
        <h5>Search Options:</h5>
        <div class="row">
          <RestaurantSearchShort v-for="r in state.restaurants" :key="r._id" :restaurant="r" />
        </div>
        <button type="button" class="btn btn-success" @click="filterSearch">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { PriceList, CategoriesList, HealthList } from '../utils/FiltersList'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import { logger } from '../utils/Logger'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'

export default {
  name: 'SearchPage',
  router: useRouter(),
  setup() {
    const state = reactive({
      priceSet: {},
      categoriesSelect: {},
      restaurants: computed(() => AppState.searchRestsList),
      searchingStarted: false
    })
    return {
      state,
      prices: PriceList,
      healthies: HealthList,
      categories: CategoriesList,
      async filterSearch() {
        try {
          let stringAllCat = ''
          let stringPrice = ''
          Object.keys(state.categoriesSelect).forEach(key => {
            if (state.categoriesSelect[key] === true) {
              stringAllCat += key.toLowerCase() + ','
            }
          })
          stringAllCat = stringAllCat.substr(0, stringAllCat.length - 1)
          const rawQuery = { categories: stringAllCat }
          Object.keys(state.priceSet).forEach(key => {
            if (state.priceSet[key] === true) {
              stringPrice += key.length + ','
            }
          })
          stringPrice = stringPrice.substr(0, stringPrice.length - 1)
          rawQuery.price = stringPrice.length
          rawQuery.city = AppState.account.activeLocation.city
          rawQuery.state = AppState.account.activeLocation.state

          logger.log('This is the categories select:', state.categoriesSelect)
          logger.log('raw Query:', rawQuery)
          await yelpRestaurantsService.getByYelpId('search', rawQuery)
          state.searchingStarted = true
        } catch (error) {
          Pop.toast('Please Retry there is no results for these filters', 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg-bootSec {
    background-color: rgb(204, 204, 204)
  }
  #bg-img{
  background-image: url('../assets/img/eatsSign.png');
  background-position: center;
  background-size: cover;
}
</style>
