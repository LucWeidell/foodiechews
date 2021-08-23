import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const MyRestaurant = new Schema(
  {
    /** This is the yelpId associated with this restaurant */
    yelpId: { type: String, required: true },
    /** This is the Array holding all Visit Models for a Restaurant */
    visits: { type: Array, default: [] },
    /** This is the String name for a Restaurant */
    name: { type: String, required: true },
    /** This is the String city for a Restaurant */
    restCity: { type: String, required: true },
    tag: { type: String, enum: ['favorite', 'none'], default: 'none' },
    accountId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

MyRestaurant.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default MyRestaurant
