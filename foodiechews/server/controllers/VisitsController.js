import { Auth0Provider } from '@bcwdev/auth0provider'
import { visitsService } from '../services/VisitsService'
import BaseController from '../utils/BaseController'

export class VisitsController extends BaseController {
  constructor() {
    super('api/visits')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const visits = await visitsService.getAll(req.query)
      res.send(visits)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      // NOTE: MyRestaurant id needs to be passed via client(?)
      const visit = await visitsService.create(req.body)
      res.send(visit)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const visit = await visitsService.edit(req.user, req.body)
      res.send(visit)
    } catch (error) {
      next(error)
    }
  }
}
