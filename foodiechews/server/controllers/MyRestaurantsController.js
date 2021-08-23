import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { visitsService } from '../services/VisitsService'
import { myRestaurantsService } from '../services/MyRestaurantsService'
export class MyRestaurantsController extends BaseController {
  constructor() {
    super('api/myRestaurants')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      .get('/:id/visits', this.getAllVisitsInRest)

      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const rests = await myRestaurantsService.getAll(req.query)
      res.send(rests)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const rests = await myRestaurantsService.getById(req.params.id)
      res.send(rests)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      // NOTE: MyRestaurant id needs to be passed via client(?)
      const visit = await myRestaurantsService.create(req.body)
      res.send(visit)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.yelpId = req.params.id
      const rests = await myRestaurantsService.edit(req.user, req.body)
      res.send(rests)
    } catch (error) {
      next(error)
    }
  }

  async getAllVisitsInRest(req, res, next) {
    try {
      const visits = await visitsService.getAll({ myRestaurantId: req.params.id })
      res.send(visits)
    } catch (error) {
      next(error)
    }
  }
}
