import { AppState } from '../AppState'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'

class YelpRestaurantsService {
  /**
 *
 * @param {String} action - One of 'random', 'search', or a yelpID String
 */
  async getByYelpId(action, query) {
    AppState.loading = true
    let res = {}
    try {
      const locCity = query.city.replace(' ', '')
      const locState = query.state.replace(' ', '')
      switch (action) {
        case 'random':
        // console.log(id, query)
          if (!AppState.account.id) {
            res = await api.get(`/api/yelpRestaurants/random?location=${locCity + locState}&open_now=true`)
          } else {
            res = await api.get(`/api/yelpRestaurants/random?location=${locCity + locState}&open_now=${AppState.account.showOnlyOpen}`)
          }
          // console.log('the res:', res.data)
          AppState.activeRestaurant = res.data
          AppState.loading = false
          break
        case 'search':
        // console.log(id, query)
          if (query.price && query.categories) {
            res = await api.get(`/api/yelpRestaurants/search?categories=${query.categories}&price=${query.price}&location=${locCity + locState}&open_now=${AppState.account.showOnlyOpen}`)
          } else if (query.categories) {
            res = await api.get(`/api/yelpRestaurants/search?categories=${query.categories}&location=${locCity + locState}&open_now=${AppState.account.showOnlyOpen}`)
          } else if (query.price) {
            res = await api.get(`/api/yelpRestaurants/search?price=${query.price}&location=${locCity + locState}&open_now=${AppState.account.showOnlyOpen}`)
          } else {
            res = await api.get(`/api/yelpRestaurants/search?location=${locCity + locState}&open_now=${AppState.account.showOnlyOpen}`)
          // console.log('the res:', res.data)
          }
          break
        // NOTE had default as false before but we can identify /:id as an id for a string compare
        // REVIEW could check the length of the string: but switches may not support
        default:
          res = await api.get(`/api/yelpRestaurants/${query.id}`)
          break
      }
      AppState.activeRestaurant = res.data
      AppState.loading = false
      return res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async getByCoordinates(coords) {
    try {
      const res = await api.get(`/api/yelpRestaurants/random?latitude=${coords.lat}&longitude=${coords.long}`)
      // console.log('get by coords result:', res.data)
      const cityDev = res.data.location.city
      const stateDev = res.data.location.state
      // TODO: Save location data as an object to the user's account and/or AppState.activeLocation
      AppState.activeLocation = { city: cityDev, state: stateDev }
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }
}

export const yelpRestaurantsService = new YelpRestaurantsService()
