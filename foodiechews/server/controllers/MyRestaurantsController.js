import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class MyRestaurantsController extends BaseController {
  constructor() {
    super('api/myRestaurants')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}
