import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProfilesService {
  async getAll(query = {}) {
    const profile = await dbContext.Profiles.find(query)
    return profile
  }

  async getById(id) {
    const profile = await dbContext.Profiles.findById(id)
    if (!profile) {
      throw new BadRequest('Invalid ID')
    }
    return profile
  }

  async create(body) {
    const profile = await dbContext.Profiles.create(body)
    return profile
  }

  async edit(body) {
    let profile = await this.getById(body.id)
    if (!profile) {
      throw new BadRequest('Invalid ID')
    }
    if (!(body.accountId.toString() === body.authorizeId)) {
      throw new Forbidden('This is not your profile')
    }
    profile = await dbContext.Profiles.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })

    return profile
  }
}

export const profilesService = new ProfilesService()
