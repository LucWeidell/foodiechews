import { AppState } from '../AppState'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'

class YelpRestaurantsService {
  /**
 *
 * @param {String} id
 */
  async getByYelpId(id, query) {
    try {
      if (id === 'random') {
        console.log(id, query)
        const res = await api.get(`/api/yelpRestaurants/random?city=${query.city}&state=${query.state}`)
        console.log('the res:', res.data)
        AppState.activeRestaurant = res.data
      }
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async getByCoordinates(coords) {
    try {
      const res = await api.get(`/api/yelpRestaurants?latitude=${coords.lat}&longitude=${coords.long}`)
      console.log('get by coords result:', res.data)
      const city = res.data.businesses[0].location.city
      const state = res.data.businesses[0].location.state
      // TODO: Save location data as an object to the user's account and/or AppState.activeLocation
      console.log('location:', city, state)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }
}

export const yelpRestaurantsService = new YelpRestaurantsService()
