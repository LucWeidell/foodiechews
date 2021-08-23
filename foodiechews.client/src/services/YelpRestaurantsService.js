import { AppState } from '../AppState'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'

class YelpRestaurantsService {
/**
 *
 * @param {String} id
 */
  async getByYelpId(id) {
    try {
      const res = await api.get('/api/yelpRestaurants/' + id)
      AppState.activeRestaurant = res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }
}

export const yelpRestaurantsService = new YelpRestaurantsService()
