import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { yelpApi } from './AxiosService'

class TotalCityRestsService {
  async getAll(query = {}) {
    let totalCityRest = await dbContext.TotalCityRests.find(query)
    if (totalCityRest.data.length === 0) {
      totalCityRest = this.create(query.city)
      // TODO Need to Api request and pull total query for city
    }
    return totalCityRest
  }

  async create(city) {
    let totalCityRest = await yelpApi.get('search?location=' + city)
    const rawCity = { city: city, total: totalCityRest.data.total }
    console.log(rawCity)
    totalCityRest = await dbContext.TotalCityRests.create(city)
    return totalCityRest
  }

  // NOTE Yelp API server-side request example
  async test(body) {
    const city = body.city
    const token = process.env.YELP_API_KEY
    yelpApi.defaults.headers.authorization = `Bearer ${token}`
    const totalRests = await yelpApi.get('search?location=' + city)
    return totalRests.data
  }
}

export const totalCityRestsService = new TotalCityRestsService()
