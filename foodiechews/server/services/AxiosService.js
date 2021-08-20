import Axios from 'axios'

export const yelpApi = Axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses/',
  timeout: 8000
})
