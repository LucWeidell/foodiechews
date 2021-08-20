import { Auth0Provider } from '@bcwdev/auth0provider'
import { visitsService } from '../services/VisitsService'
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
      req.body.creatorId = req.userInfo.id
      // NOTE: MyRestaurant id needs to be passed via client(?)
      const visit = await visitsService.create(req.body)
      res.send(visit)
    } catch (error) {
      next(error)
    }
  }
}
