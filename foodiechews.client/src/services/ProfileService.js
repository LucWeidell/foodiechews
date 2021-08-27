const { AppState } = require('../AppState')
const { logger } = require('../utils/Logger')
const { api } = require('./AxiosService')

class ProfileService {
  async getAllProfiles() {
    try {
      const res = await api.get('api/profiles')
      AppState.allProfiles = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async getRestByProfileId(id) {
    try {
      const res = await api.get('api/profiles/' + id + '/myRestaurants')
      AppState.profileDetails = res.data
    } catch (error) {
      logger.log(error)
    }
  }
}

export const profileService = new ProfileService()
