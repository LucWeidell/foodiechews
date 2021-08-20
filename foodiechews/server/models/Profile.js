import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Profile = new Schema(
  {
    // Location is an array of strings
    location: { type: Array, required: true },
    // myEats is an array of MyRestaurants objects (should be empty when profile is created)
    myEats: { type: Array, required: true },
    pendingRestraunt: { type: Object },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    activeLocation: { type: String, required: true },
    noDupes: { type: Boolean, default: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Profile
