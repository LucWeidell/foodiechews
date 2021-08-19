import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class YelpRestaurantsService {
  async getAll(query = {}) {
    const yelpRestaurants = await dbContext.YelpRestaurants.find(query)
    return yelpRestaurants
  }

  async getById(id) {
    const yelpRestaurants = await dbContext.YelpRestaurants.findById(id)
    if (!yelpRestaurants) {
      throw new BadRequest('Invalid ID')
    }
    return yelpRestaurants
  }

  async create(body) {
    const yelpRestaurants = await dbContext.YelpRestaurants.create(body)
    return yelpRestaurants
  }

  async remove(id) {
    const yelpRestaurants = await dbContext.YelpRestaurants.findByIdAndDelete(id)
    if (!yelpRestaurants) {
      throw new BadRequest('Invalid ID')
    }
    return yelpRestaurants
  }
}

export const yelpRestaurantsService = new YelpRestaurantsService()
