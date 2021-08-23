import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class VisitsService {
  async getAll(query = {}) {
    const visits = await dbContext.Visits.find(query)
    return visits
  }

  async create(body) {
    const visit = await dbContext.Visits.create(body)
    return await dbContext.Visits.findById(visit._id)
      .populate('restaurant')
  }

  async edit(user, body) {
    if (!user.id === body.accountId) {
      throw new Forbidden('Not your visit:')
    }
    const visit = await dbContext.Visits.findOneAndUpdate(
      { _id: body.id },
      body,
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return visit
  }
}

export const visitsService = new VisitsService()
