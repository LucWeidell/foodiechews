<template>
  <div class="container-fluid">
    <div class="row justify-content-around py-3">
      <div class="col-6">
        <form @submit.prevent="editAccount(account)">
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
            <input class="form-control" id="activeLocation" type="text" placeholder="New York City" v-model="account.activeLocation.city">
            <select name="activeLocationState" id="activeLocationState" v-model="account.activeLocation.state">
              <option :value="state" v-for="(state, index) in states" :key="index">
                {{ state }}
              </option>
            </select>
          </div>
          <button type="submit">
            SAVE
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import StatesList from '../utils/StatesList'
import Pop from '../utils/Notifier'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import { validateLocation } from '../utils/Validator'

export default {
  name: 'Settings',
  setup() {
    const state = reactive({
    })
    return {
      state,
      account: computed(() => AppState.account),
      states: StatesList,
      async editAccount(account) {
        try {
          if (await validateLocation(AppState.account.activeLocation)) {
            const foundLoc = AppState.account.location.find(loc => {
              return (account.activeLocation.city === loc.city && account.activeLocation.state === loc.state)
            })
            if (!foundLoc) {
              AppState.account.location.push(AppState.account.activeLocation)
            }
            logger.log('locArray:', AppState.account.location)
            await accountService.editAccount(account)
            logger.log('test wow')
          } else { Pop.toast('Not a valid city', 'error') }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  }
}
</script>
