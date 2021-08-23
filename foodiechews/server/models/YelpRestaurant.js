import mongoose from 'mongoose'
const Schema = mongoose.Schema

const YelpRestaurant = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    alias: { type: String, required: true },
    location: { type: Object, required: true },
    coverImgUrl: { type: String, required: true },
    categories: { type: Array, required: true },
    hours: { type: Array, required: true },
    price: { type: String, required: true }, // These $$$
    rating: { type: Number, required: true } // TODO check if you get decimals
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default YelpRestaurant
