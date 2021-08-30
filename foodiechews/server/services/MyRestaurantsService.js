import { YelpRestaurantsController } from '../controllers/YelpRestaurantsController'
import { dbContext } from '../db/DbContext'
import { setMyCache } from '../utils/Cache'
import { Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class MyRestaurantsService {
  async getAll(query = {}) {
    const rests = await dbContext.MyRestaurants.find(query).populate('account')
    return rests
  }

  async getById(id) {
    const rest = await dbContext.MyRestaurants.findOne({ yelpId: id })
    return rest
  }

  async create(body) {
    const rest = await dbContext.MyRestaurants.create(body)
    logger.log('WHY AM I HERERERERERERERERE')
    await setMyCache(body.accountId)
    return await this.getById(rest.yelpId)
  }

  async edit(user, body) {
    if (!user.id === body.accountId) {
      throw new Forbidden('Not your restaurant:')
    }
    const rest = await dbContext.MyRestaurants.findOneAndUpdate(
      { yelpId: body.yelpId },
      body,
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return rest
  }
}

export const myRestaurantsService = new MyRestaurantsService()
