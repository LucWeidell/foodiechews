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
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default MyRestaurant
