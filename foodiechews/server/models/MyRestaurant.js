import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const MyRestaurant = new Schema(
  {
    yelp: { type: String, required: true },
    visits: { type: Array, required: true },
    name: { type: String, required: true },
    restCity: { type: String, required: true },
    tag: { type: String, enum: ['favorite', 'none'], default: 'none' },
    ProfileId: { type: ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
MyRestaurant.virtual('profile', {
  localField: 'profileId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default MyRestaurant
