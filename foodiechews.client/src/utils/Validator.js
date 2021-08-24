import { totalCityRestsService } from '../services/TotalCityRestsService'
import { logger } from './Logger'
import Pop from './Notifier'

export async function validateLocation(location) {
  try {
    const totalCity = await totalCityRestsService.getAll(location)
    logger.log(totalCity)
    if (!totalCity) {
      logger.log('IM IN UNDEFINED')
      return false
    } else if (totalCity.totalNum === 0) {
      logger.log('IM In totlNUM')
      return false
    }
    return true
  } catch (error) {
    return false
  }
}
