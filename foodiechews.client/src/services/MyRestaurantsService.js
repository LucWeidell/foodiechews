import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'
class MyRestaurantsService {
  async addNew(rawRestaurant, tags) {
    try {
      const myRestaurant = {
        yelpId: rawRestaurant.id,
        name: rawRestaurant.name,
        location: {
          city: rawRestaurant.location.city,
          state: rawRestaurant.location.state
        },
        tag: tags[0]
      }
      console.log('my rest:', myRestaurant)
      const res = await api.post('api/myRestaurants', myRestaurant)
      AppState.myRestaurants.push(res.data)
      console.log('test success', res.data)
      return res.data.id
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async changeFavorite(id, favorite) {
    const tagStr = !favorite ? 'favorite' : 'none'
    try {
      const res = await api.put('api/myRestaurants/' + id, { tag: tagStr })
      return res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }
}

export const myRestaurantsService = new MyRestaurantsService()
