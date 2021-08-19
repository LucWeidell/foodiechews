import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { yelpApi } from './AxiosService'

class YelpTestService {
  async getByCityName() {
    const token = process.env.YELP_API_KEY
    yelpApi.defaults.headers.authorization = `Bearer ${token}`
    //  Gets results back from Yelp API
    const results = await yelpApi.get('search?location=boise')
    return results.data
  }
}

export const yelpTestService = new YelpTestService()
