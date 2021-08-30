import { reactive, ref } from 'vue'

const isMobile = ref(false)
const screenSize = ref(window.innerWidth)
window.onresize = function() {
  screenSize.value = window.innerWidth
  if (screenSize.value < 764) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}

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
  loading: false,
  locations: {},
  sixRests: {},
  allRest: {},
  allProfiles: {},
  profileDetails: {},
  screenSize,
  isMobile
})
