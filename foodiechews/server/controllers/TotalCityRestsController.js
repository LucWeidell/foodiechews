import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'
import { totalCityRestsService } from '../services/TotalCityRestsService'

export class TotalCityRestsController extends BaseController {
  constructor() {
    super('api/totalCityRests')
    this.router
      .get('', this.getAll)
      .get('/test', this.test)
      .get('/:id', this.getByCity)
  }

  // REVIEW may want to look at going back to queries but id works for now

  async getAll(req, res, next) {
    try {
      const totalCityRest = await totalCityRestsService.getAll(req.query)
      res.send(totalCityRest)
    } catch (error) {
      next(error)
    }
  }

  async getByCity(req, res, next) {
    try {
      const totalCityRest = await totalCityRestsService.getByCity(req.params.id)
      res.send(totalCityRest)
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
      const totalCityRest = await totalCityRestsService.create(req.body)
      res.send(totalCityRest)
    } catch (error) {
      next(error)
    }
  }

  // NOTE Yelp API server-side request example
  async test(req, res, next) {
    try {
      const totalCityRest = await totalCityRestsService.test(req.body)
      res.send(totalCityRest)
    } catch (error) {
      next(error)
    }
  }
}
