import BaseController from '../utils/BaseController'
// import { logger } from '../utils/Logger'
import { yelpRestaurantsService } from '../services/YelpRestaurantsService'
import { logger } from '../utils/Logger'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { convertToQuery } from '../utils/Query'

export class YelpRestaurantsController extends BaseController {
  constructor() {
    super('api/yelpRestaurants')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/random', this.getRandom)
      .get('/search', this.getSearch)
      .get('/:id', this.getById)
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

  async getRandom(req, res, next) {
    try {
      const account = await accountService.getById(req.userInfo.id)
      const activeLocation = account._doc.activeLocation
      let query = { term: 'restaurants', location: activeLocation.city + activeLocation.state }
      const restaurants = await yelpRestaurantsService.getAll(query)
      // logger.log('From the Controller', restaurant)
      const randomPage = Math.floor(Math.random() * restaurants.total)
      // logger.log('I\'m the random number : ', randomPage)
      query = { term: 'restaurants', location: activeLocation.city + activeLocation.state, limit: 1, offset: randomPage - 1 }
      logger.log(query)
      const yelpRestaurant = await yelpRestaurantsService.getRandom(query)
      res.send(yelpRestaurant)
    } catch (error) {
      next(error)
    }
  }

  async getSearch(req, res, next) {
    try {
      const account = await accountService.getById(req.userInfo.id)
      const activeLocation = account._doc.activeLocation
      req.query.location = activeLocation.city + activeLocation.state
      req.query.term = 'restaurants'
      req.query.limit = 1
      // logger.log(req.query.location)
      const restaurants = await yelpRestaurantsService.getAll(req.query)
      const randomPage = Math.floor(Math.random() * restaurants.total)
      req.query.offset = randomPage
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

  // NOTE create has no purpose:
  // The service has a create if getById fails to find: should never call from client
  /**
       * Adds a data to a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  // async create(req, res, next) {
  //   try {
  //     const yelpRestaurant = await yelpRestaurantsService.create(req.body)
  //     res.send(yelpRestaurant)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

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

  async forceDelete(req, res, next) {
    try {
      const deleteSequence = setInterval(async() => {
        const compareDate = new Date()
        if (compareDate.getHours() === 2) {
          await yelpRestaurantsService.removeAll()
        }
        // deleteSequence() TODO : need to figure out how to trigger the interval
      }, 3600000)
    } catch (error) {
      next(error)
    }
  }
}
