import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class TotalCityRestsService {
  async getAll(activeLoc) {
    const query = { location: activeLoc.city + activeLoc.state }
    const res = api.getAll('/api/totalCityRests' + convertToQuery(query))
    return res.data
  }
}

export const totalCityRestsService = new TotalCityRestsService()
