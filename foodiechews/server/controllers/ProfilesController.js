import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { profilesService } from '../services/ProfileService'

export class ProfileController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router

      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  /**
       * Sends all profiles to a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async getAll(req, res, next) {
    try {
      const profile = await profilesService.getAll(req.query)
      res.send(profile)
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
      const profile = await profilesService.getById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  /**
       * Adds a data to a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async create(req, res, next) {
    try {
      const profile = await profilesService.create(req.body)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.authorizeId = req.userInfo.id
      req.body.id = req.params.id
      const profile = await profilesService.edit(req.body)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
