import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TotalCityRest = new Schema(
  {
    city: { type: String, required: true },
    totalNum: { type: Number, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default TotalCityRest
