<template>
  <div class="container-fluid">
    <div class="row justify-content-around py-4">
      <div class="col-sm-12">
        <h5>
          Account Settings:
        </h5>
      </div>
      <div class="col-8 card bg-bootSec text-dark shadow-sm mb-2">
        <div class="form-group form-check">
          <input type="checkbox" name="showOnlyOpen" id="showOnlyOpen" class="form-check-input" v-model="state.account.showOnlyOpen">
          <label for="showOnlyOpen" class="form-check-label">Only Find Open Restaurants</label>
        </div>
        <div class="form-group form-check">
          <input type="checkbox" name="nodupes" id="nodupes" class="form-check-input" v-model="state.account.noDupes">
          <label for="nodupes" class="form-check-label">No Duplicate Restaurants</label>
        </div>
        <div class="form-group form-check">
          <input type="checkbox" name="showRestaurants" id="showRestaurants" class="form-check-input" v-model="state.account.showRestaurants">
          <label for="showRestaurants" class="form-check-label">Show My Restaurant History</label>
          <small id="showRestaurantsHelp" class="form-text text-muted"><em>Only show cities on my profile page.</em></small>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <label for="activeLocationCity">City:</label>
              <input class="form-control"
                     id="activeLocationCity"
                     type="text"
                     placeholder="New York City"
                     v-model="state.account.activeLocation.city"
              >
            </div>
          </div>
          <div class="col-sm-12 col-md-2 pb-1">
            <select name="activeLocationState" id="activeLocationState" v-model="state.account.activeLocation.state">
              <option :value="state" v-for="(state, index) in states" :key="index">
                {{ state }}
              </option>
            </select>
          </div>
          <div class="col-sm-12 col-md-2 mb-1">
            <button type="button"
                    class="btn btn-secondary btn-sm"
                    @click="editCity('add', state.account.activeLocation)"
            >
              + City
            </button>
          </div>
        </div>
      </div>
      <div class="
                    col-8
                    card
                    bg-bootSec
                    text-dark
                    shadow-sm mb-2"
      >
        <h6>Location History:</h6>
        <ul>
          <li v-for="loc in state.account.location" :key="loc">
            {{ loc.city }}, {{ loc.state }} &emsp; <i class="far fa fa-times-circle action" @click="editCity('remove', loc)"></i>
          </li>
        </ul>
      </div>
      <div class="col-11 d-flex justify-content-end">
        <button type="button" class="btn btn-success" @click="editAccount">
          Save Changes
        </button>
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

export default {
  name: 'Settings',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      states: StatesList,
      async editAccount() {
        try {
          await this.editCity('add', state.account.activeLocation)
          await accountService.editAccount(state.account)
          Pop.toast('Applied All Changes', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },

      async editCity(action, loc) {
        try {
          let response = true
          if (state.account.location.length === 1 && action === 'remove') {
            Pop.toast('Cannot remove only city on record', 'error')
          } else {
            switch (action) {
              case 'add':
                response = await accountService.addCity(loc)
                break
              case 'remove':
                if (await Pop.confirm()) {
                  response = await accountService.removeCity(loc)
                } else { return '' }
                break
              default:
                Pop.toast('Edit city recieved bad action', 'error')
                return ''
            }
            logger.log('response value:', response)
            if (response) {
              Pop.toast('Updated City', 'success')
            } else { Pop.toast('Not a valid city (Settings)', 'error') }
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg-bootSec {
    color: rgb(204, 204, 204)
  }
  .fa-times-circle{
    color: red;
  }
</style>
