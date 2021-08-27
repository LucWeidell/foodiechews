import { AppState } from '../AppState'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'

export default function getLocation() {
  if (Object.keys(AppState.activeLocation).length === 0) {
    navigator.geolocation.getCurrentPosition(async(loc) => {
      const coords = {
        lat: loc.coords.latitude,
        long: loc.coords.longitude
      }
      await yelpRestaurantsService.getByCoordinates(coords)
      console.log('activeLocation after restservice:', AppState.activeLocation)
    })
  }
}
