import { dbContext } from '../db/DbContext'
class VisitsService {
  async getAll(query = {}) {
    const visits = await dbContext.Visits.find(query)
    return visits
  }
}

export const visitsService = new VisitsService()
