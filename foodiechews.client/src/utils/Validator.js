import { totalCityRestsService } from '../services/TotalCityRestsService'
import Pop from './Notifier'

export async function validateLocation(location) {
  try {
    const totalCity = await totalCityRestsService.getAll(location)
    if (totalCity) {
      return false
    } else if (totalCity.totalNum === 0) {
      return false
    }
    return true
  } catch (error) {
    Pop.toast(error, 'error')
  }
}
