import mongoose from 'mongoose'
const Schema = mongoose.Schema

const YelpRestaurant = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    alias: { type: String, required: true },
    location: { type: Object, required: true },
    coverImgUrl: { type: String },
    categories: { type: Array, required: true },
    hours: { type: Array, required: true },
    price: { type: String, default: '' }, // These $$$
    rating: { type: Number, required: true }, // TODO check if you get decimals
    transactions: { type: Array },
    url: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default YelpRestaurant
