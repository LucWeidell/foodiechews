<template>
  <div class="container-fluid">
    <div class="row justify-content-around py-3">
      <div class="col-6">
        <form action="">
          <div class="form-group form-check">
            <input type="checkbox" name="nodupes" id="nodupes" class="form-check-input" v-model="account.noDupes">
            <label for="nodupes" class="form-check-label">No Duplicate Restaurants</label>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" name="showRestaurants" id="showRestaurants" class="form-check-input" v-model="account.showRestaurants">
            <label for="showRestaurants" class="form-check-label">Show My Restaurant History</label>
            <small id="showRestaurantsHelp" class="form-text text-muted"><em>Only show cities on my profile page.</em></small>
          </div>
          <div class="form-group">
            <label for="activeLocationCity">City:</label>
            <input class="form-control" id="activeLocation" type="text" placeholder="New York City">
            <select name="" id="">
              <option :value="state" v-for="(state, index) in states" :key="index">
                {{ state }}
              </option>
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import StatesList from '../utils/StatesList'
export default {
  name: 'Settings',
  setup() {
    return {
      account: computed(() => AppState.account),
      states: StatesList
    }
  }
}
</script>
