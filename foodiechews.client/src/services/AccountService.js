import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(rawAccount) {
    try {
      logger.log(rawAccount)
      const res = await api.put('/account/' + rawAccount.id, rawAccount)
      logger.log('This is the account after edit:', res)
      AppState.account = res.data
    } catch (err) {
      logger.error('Failed Account Edit', err)
    }
  }
}

export const accountService = new AccountService()
