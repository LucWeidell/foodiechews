import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // Location is an array of strings
    location: { type: Array, default: [] },
    // myEats is an array of MyRestaurants objects (should be empty when profile is created)
    myEats: { type: Array, default: [] },
    pendingRestraunt: { type: Object, default: {} },
    activeLocation: { type: String, default: '' },
    noDupes: { type: Boolean, default: true }
    // NOTE If you wish to add additional public properties for Accounts do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
