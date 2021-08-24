import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class TotalCityRestsService {
  async getAll(activeLoc) {
    const locCity = activeLoc.city.replace(' ', '')
    const locState = activeLoc.state.replace(' ', '')
    const query = { city: locCity, state: locState }
    const res = await api.get('/api/totalCityRests' + convertToQuery(query))
    return res.data
  }
}

export const totalCityRestsService = new TotalCityRestsService()
