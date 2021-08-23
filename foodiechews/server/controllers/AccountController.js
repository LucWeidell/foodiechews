import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { accountService } from '../services/AccountService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      // .post('', this.create)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const profile = await accountService.edit(req.userInfo, req.body)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends all profile with Id to a client by request
   * @param {import('express').Request} req
   * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const profile = await accountService.getById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  // /**
  //      * Adds a data to a client by request
  //      * @param {import('express').Request} req
  //      * @param {import('express').Response} res
  //      * @param {import('express').NextFunction} next
  //      */
  // async create(req, res, next) {
  //   try {
  //     const profile = await accountsDbService.create(req.body)
  //     res.send(profile)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async edit(req, res, next) {
  //   try {
  //     req.body.authorizeId = req.userInfo.id
  //     req.body.id = req.params.id
  //     const profile = await accountsDbService.edit(req.body)
  //     res.send(profile)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // /**
  //  * Sends all profile with Id to a client by request
  //  * @param {import('express').Request} req
  //  * @param {import('express').Response} res
  //      * @param {import('express').NextFunction} next
  //  */
  // async getById(req, res, next) {
  //   try {
  //     const profile = await accountsDbService.getById(req.params.id)
  //     res.send(profile)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
