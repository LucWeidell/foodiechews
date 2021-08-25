import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import MyRestaurantSchema from '../models/MyRestaurant'
import TotalCityRestSchema from '../models/TotalCityRest'
import VisitSchema from '../models/Visit'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  MyRestaurants = mongoose.model('MyRestaurant', MyRestaurantSchema)
  TotalCityRests = mongoose.model('TotalCityRest', TotalCityRestSchema)
  Visits = mongoose.model('Visit', VisitSchema)
}

export const dbContext = new DbContext()
