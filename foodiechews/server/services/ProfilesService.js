import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProfilesService {
  // FIXME see if get all account makes sense
  // async getAll(query = {}) {
  //   const profile = await dbContext.Account.find(query)
  //   return profile
  // }

  async getById(id) {
    const profile = await dbContext.Account.findById(id)
    if (!profile) {
      throw new BadRequest('Invalid Profile ID')
    }
    return profile
  }

  //  TODO I think all edits for profile go through account
  // async edit(body) {
  //   let profile = await this.getById(body.id)
  //   if (!profile) {
  //     throw new BadRequest('Invalid ID')
  //   }
  //   if (!(body.accountId.toString() === body.authorizeId)) {
  //     throw new Forbidden('This is not your profile')
  //   }
  //   profile = await dbContext.Profiles.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })

  //   return profile
  // }
}

export const profilesService = new ProfilesService()
