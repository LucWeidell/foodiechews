import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class MyRestaurantsService {
  async getAll(query = {}) {
    const rests = await dbContext.MyRestaurants.find(query).populate('account')
    return rests
  }

  async getById(id) {
    const rest = await dbContext.MyRestaurants.findOne({ yelpId: id }).populate('account')
    return rest
  }

  async create(body) {
    const rest = await dbContext.MyRestaurants.create(body)
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
