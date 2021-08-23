import mongoose from 'mongoose'
const Schema = mongoose.Schema

// NOTE: This is how subdocuments work! Reference this!
const locationSchema = new Schema({
  city: { type: String, required: true },
  state: { type: String, required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    location: [locationSchema],
    // TODO: Use subdocument instead of array
    // myEats is an array of MyRestaurants objects (should be empty when profile is created)
    myEats: { type: Array, default: [] },
    // TODO: Also use a subdoc to define the object props
    pendingRestraunt: { type: Object, default: {} },
    activeLocation: { type: String, default: '' },
    noDupes: { type: Boolean, default: true }
    // NOTE If you wish to add additional public properties for Accounts do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
