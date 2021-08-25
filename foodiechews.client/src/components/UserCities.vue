<template>
  <a class="dropdown-item" href="#" @click="editCity('add', state.account.activeLocation)" v-if="state.account.activeLocation.city !== loc.city">{{ loc.city }}, {{ loc.state }}</a>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'
export default {
  props: {
    loc: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async editCity(action, location) {
        try {
          location.city = props.loc.city
          location.state = props.loc.state
          let responce = true
          if (state.account.location.length === 1 && action === 'remove') {
            Pop.toast('Cannot remove only city on record', 'error')
          } else {
            switch (action) {
              case 'add':
                logger.log('You are adding A Location')
                responce = await accountService.addCity(location)
                break
              default:
                Pop.toast('Edit city recieved bad action', 'error')
                return ''
            }
            logger.log('responce value:', responce)
            if (responce) {
              Pop.toast('Updated City', 'success')
            } else { Pop.toast('Not a valid city', 'error') }
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>
