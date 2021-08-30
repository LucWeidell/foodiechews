import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { profilesService } from '../services/ProfilesService'
import { visitsService } from '../services/VisitsService'
import { accountService } from '../services/AccountService'
import { myRestaurantsService } from '../services/MyRestaurantsService'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      // FIXME look at get All for Accounts
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/visits', this.getAllVisitsByProfileId)
      .get('/:id/myRestaurants', this.getAllRestsByProfileId)
  }

  /**
   * Sends all profiles to a client by request
   * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async getAll(req, res, next) {
    try {
      const profiles = await profilesService.getAll(req.query)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends all profile with Id to a client by request
   * @param {import('express').Request} req
   * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const profile = await accountService.getById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getAllVisitsByProfileId(req, res, next) {
    try {
      const visits = await visitsService.getAll({ accountId: req.params.id })
      res.send(visits)
    } catch (error) {
      next(error)
    }
  }

  async getAllRestsByProfileId(req, res, next) {
    try {
      const rests = await myRestaurantsService.getAll({ accountId: req.params.id })
      res.send(rests)
    } catch (error) {
      next(error)
    }
  }
}
