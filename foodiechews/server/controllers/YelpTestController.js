import { yelpTestService } from '../services/YelpTestService'
import BaseController from '../utils/BaseController'

export class YelpTestController extends BaseController {
  constructor() {
    super('api/tests')
    this.router
      .get('', this.getByCityName)
  }

  async getByCityName(req, res, next) {
    try {
      // res.send('Message')
      const yelpResults = await yelpTestService.getByCityName()
      res.send(yelpResults)
    } catch (error) {
      next(error)
    }
  }
}
