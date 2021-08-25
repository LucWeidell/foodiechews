import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'
class MyRestaurantsService {
  async addNew(rawRestaurant) {
    try {
      const myRestaurant = {
        yelpId: rawRestaurant.id,
        name: rawRestaurant.name,
        restCity: rawRestaurant.location.city
      }
      console.log('my rest:', myRestaurant)
      const res = await api.post('api/myRestaurants', myRestaurant)
      AppState.myRestaurants.push(res.data)
      console.log('test success', res.data)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }
}

export const myRestaurantsService = new MyRestaurantsService()
