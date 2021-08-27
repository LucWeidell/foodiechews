import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  activeRestaurant: {},
  myRestaurants: [],
  visits: [],

  // NOTE This activeLocation is for non-logged in users:
  // For logged in: refer to the activeLocation on the account
  activeLocation: {},
  searchRestsList: [],
  lastActive: {},
  loading: false
})
