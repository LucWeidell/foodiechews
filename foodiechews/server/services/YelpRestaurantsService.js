import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { yelpApi } from './AxiosService'

class YelpRestaurantsService {
  async getAll(query = {}) {
    const yelpRestaurants = await dbContext.YelpRestaurants.find(query)
    return yelpRestaurants
  }

  async getById(idYelp) {
    // idYelp = idYelp.replace('_', 'XXX')
    let yelpRestaurant = await dbContext.YelpRestaurants.findOne({ id: idYelp })
    if (!yelpRestaurant) {
      const token = process.env.YELP_API_KEY
      yelpApi.defaults.headers.authorization = `Bearer ${token}`
      yelpRestaurant = await yelpApi.get('' + idYelp)
      logger.log('result from yelp:', yelpRestaurant.data)
      if (!yelpRestaurant.data) {
        throw new BadRequest('Invalid Yelp Business ID')
      } else {
        const resultYelpRest = await this.create(yelpRestaurant.data)
        return resultYelpRest
      }
    }
    return yelpRestaurant
  }

  async create(body) {
    body.coverImgUrl = body.image_url
    const yelpRestaurants = await dbContext.YelpRestaurants.create(body)
    return yelpRestaurants
  }

  async removeAll() {
    const rests = await this.getAll()
    for (let i = 0; i < rests.length; i++) {
      await this.remove(rests[i].id)
    }
  }

  async remove(idYelp) {
    const yelpRestaurants = await dbContext.YelpRestaurants.findOneAndDelete({ id: idYelp })
    if (!yelpRestaurants) {
      throw new BadRequest('Invalid Yelp ID To Remove')
    }
    return yelpRestaurants
  }
}

export const yelpRestaurantsService = new YelpRestaurantsService()
