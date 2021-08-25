<template>
  <a class="dropdown-item" href="#" @click="editAccount()" v-if="state.account.activeLocation.city !== loc.city">{{ loc.city }}, {{ loc.state }}</a>
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
      async editAccount() {
        try {
          state.account.activeLocation.city = props.loc.city
          state.account.activeLocation.state = props.loc.state
          logger.log(state.account.activeLocation)
          await this.editCity('add', state.account.activeLocation)
          await accountService.editAccount(state.account)
          Pop.toast('Applied All Changes', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async editCity(action, loc) {
        try {
          let responce = true
          if (state.account.location.length === 1 && action === 'remove') {
            Pop.toast('Cannot remove only city on record', 'error')
          } else {
            switch (action) {
              case 'add':
                responce = await accountService.addCity(loc)
                break
              case 'remove':
                if (await Pop.confirm()) {
                  responce = await accountService.removeCity(loc)
                } else { return '' }
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
