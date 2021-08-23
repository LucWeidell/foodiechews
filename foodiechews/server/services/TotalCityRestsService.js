import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { yelpApi } from './AxiosService'

class TotalCityRestsService {
  async getAll(query = {}) {
    let totalCityRest = await dbContext.TotalCityRests.find(query)
    if (totalCityRest.length === 0) {
      totalCityRest = this.create(query.city, query.state)
      // TODO Need to Api request and pull total query for city
    }
    return totalCityRest
  }

  async create(cityName, stateName) {
    const token = process.env.YELP_API_KEY
    yelpApi.defaults.headers.authorization = `Bearer ${token}`
    let totalCityRest = await yelpApi.get('search?location=' + cityName + stateName)
    const rawTotCityRest = { city: cityName, state: stateName, totalNum: (totalCityRest.data.total) }
    logger.log('TotCityRest to make:', rawTotCityRest)
    totalCityRest = await dbContext.TotalCityRests.create(rawTotCityRest)
    return totalCityRest
  }

  // // NOTE Yelp API server-side request example
  // async test(body) {
  //   const city = body.city
  //   const token = process.env.YELP_API_KEY
  //   yelpApi.defaults.headers.authorization = `Bearer ${token}`
  //   const totalRests = await yelpApi.get('search?location=' + city)
  //   return totalRests.data
  // }
}

export const totalCityRestsService = new TotalCityRestsService()
