import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import ProfileSchema from '../models/Profile'
import MyRestaurantSchema from '../models/MyRestaurant'
import TotalCityRestSchema from '../models/TotalCityRest'
import YelpRestaurantSchema from '../models/YelpRestaurant'
import VisitSchema from '../models/Visit'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema)
  MyRestaurants = mongoose.model('MyRestaurant', MyRestaurantSchema)
  TotalCityRests = mongoose.model('TotalCityRest', TotalCityRestSchema)
  YelpRestaurants = mongoose.model('YelpRestaurant', YelpRestaurantSchema)
  Visits = mongoose.model('Visit', VisitSchema)
}

export const dbContext = new DbContext()
