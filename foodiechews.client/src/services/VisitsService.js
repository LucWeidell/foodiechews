// import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
// import { api } from './AxiosService'
class VisitsService {
  async addNew(rawVisit) {
    try {
      console.log(rawVisit)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }
}

export const visitsService = new VisitsService()
