import BaseController from '../utils/BaseController'
// import { logger } from '../utils/Logger'
import { logger } from '../utils/Logger'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { convertToQuery } from '../utils/Query'
import { IdCheckCache, searchCache } from '../utils/Cache'

export class YelpRestaurantsController extends BaseController {
  constructor() {
    super('api/yelpRestaurants')
    this.router
      // .get('', this.getAll)
      .get('/random', this.getRandom)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/search', this.getSearch)
      .get('/:id', this.getById)
  }

  // /**
  //      * Sends all yelpRestaurants to a client by request
  //      * @param {import('express').Request} req
  //      * @param {import('express').Response} res
  //      * @param {import('express').NextFunction} next
  //      */
  // async getAll(req, res, next) {
  //   try {
  //     const yelpRestaurant = await yelpRestaurantsService.getAll(req.query)
  //     res.send(yelpRestaurant)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  /**
       * Sends all yelpRestaurant with Id to a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async getById(req, res, next) {
    try {
      const yelpRestaurant = await IdCheckCache(req.params.id)
      res.send(yelpRestaurant)
    } catch (error) {
      next(error)
    }
  }

  async getRandom(req, res, next) {
    try {
      let searchTerms = {}
      logger.log(req.query)
      if (req.query.latitude) {
        searchTerms = { term: 'restaurants', latitude: req.query.latitude, longitude: req.query.longitude }
      } else {
        searchTerms = { term: 'restaurants', location: req.query.location }
        if (req.query.open_now) {
          searchTerms.open_now = req.query.open_now
        }
      }
      const restaurant = await searchCache('search' + (convertToQuery(searchTerms)))
      res.send(restaurant)
    } catch (error) {
      logger.log('fail')
      next(error)
    }
  }

  async getSearch(req, res, next) {
    try {
      logger.log(req.query)
      const searchTerms = { term: 'restaurants', location: req.query.location, open_now: req.query.open_now }
      if (req.query.price) {
        searchTerms.price = req.query.price
      }
      if (req.query.categories) {
        searchTerms.categories = req.query.categories
      }
      if (req.query.price) {
        searchTerms.price = req.query.price
      }
      const restaurant = await searchCache('search' + (convertToQuery(searchTerms)))
      res.send(restaurant)
    } catch (error) {
      logger.log('fail')
      next(error)
    }
  }

  // async getSearch(req, res, next) {
  //   logger.log('search touched')
  //   try {
  //     const account = await accountService.getById(req.userInfo.id)
  //     const activeLocation = account._doc.activeLocation
  //     req.query.location = activeLocation.city + activeLocation.state
  //     req.query.term = 'restaurants'
  //     req.query.limit = 1
  //     // logger.log(req.query.location)
  //     const restaurants = await yelpRestaurantsService.getAll(req.query)
  //     const randomPage = Math.floor(Math.random() * restaurants.total)
  //     req.query.offset = randomPage
  //     const yelpRestaurant = await yelpRestaurantsService.getAll(req.query)
  //     res.send(yelpRestaurant)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

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
}
