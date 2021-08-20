import { Auth0Provider } from '@bcwdev/auth0provider'
import visitsServicde from '../services/VisitsService'
import BaseController from '../utils/BaseController'

export class VisitsController extends BaseController {
  constructor() {
    super('api/visits')
    this.router
  }
}
