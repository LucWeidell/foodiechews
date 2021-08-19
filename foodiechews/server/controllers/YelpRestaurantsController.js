import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'

export class YelpRestaurantsController extends BaseController {
  constructor() {
    super('api/yelpRestaurants')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  /**
       * Sends all yelpRestaurants to a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async getAll(req, res, next) {
    try {
      const yelpRestaurant = await yelpRestaurantsService.getAll(req.query)
      res.send(yelpRestaurant)
    } catch (error) {
      next(error)
    }
  }

  /**
       * Sends all yelpRestaurant with Id to a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async getById(req, res, next) {
    try {
      const yelpRestaurant = await yelpRestaurantsService.getById(req.params.id)
      res.send(yelpRestaurant)
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
      const yelpRestaurant = await yelpRestaurantsService.create(req.body)
      res.send(yelpRestaurant)
    } catch (error) {
      next(error)
    }
  }

  /**
       * Removes data by id from a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async remove(req, res, next) {
    try {
      await yelpRestaurantsService.remove(req.params.id)
      res.send({ message: 'Successfully Deleted yelpRestaurant' })
    } catch (error) {
      next(error)
    }
  }

  async removeAll() {
    try {
      const rests = await yelpRestaurantsService.getAll()
      for (let i = 0; i < rests.length; i++) {
        await yelpRestaurantsService.remove(rests[i].id)
      }
    } catch (error) {
      logger.log('The server delete failed:', error)
    }
  }

  async forceDelete() {
    const deleteSequence = setInterval(async() => {
      const compareDate = new Date()
      if (compareDate.getHours() === 2) {
        this.removeAll()
      }
    }, 3600000)
  }
}
