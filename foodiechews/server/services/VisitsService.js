import { dbContext } from '../db/DbContext'
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
}

export const visitsService = new VisitsService()
