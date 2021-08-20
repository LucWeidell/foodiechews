import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'

export class VisitsController extends BaseController {
  constructor() {
    super('api/visits')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      req.body.
    } catch (error) {
      next(error)
    }
  }
}
