import { yelpApi } from '../services/AxiosService'
import { logger } from './Logger'

/** This is the cache in replacement for MongoDb YelpRestaurants
 * @type {Object}
 *  @property {Object} key - the key is the search term: the key holds the object with the values to pull
 *  @property {[POJOS]} key.results - This is the result array on the search term w/ plain JS objects within
 *  @property {Number} key.ttl - This is the time to live for expiration
 *  @property {Number} key.totalRes - This is the total result for a search: id searches are always 1
  */
const cache = {}

export async function searchCache(strQuery) {
  let randNum = 0
  strQuery += '&limit=1'
  logger.log('Search string:', strQuery)
  logger.log('the first condition', cache[strQuery])
  const now = new Date()
  if (cache[strQuery]) {
    const foundSearch = cache[strQuery]
    logger.log('Found search:', foundSearch)

    if (foundSearch.ttl - now.getTime() > 0) {
      randNum = randomNumSelect(foundSearch.totalRes)
    }
  } else {
    const res = await getFromYelpApi(strQuery)
    logger.log('Res search before Off:', res)
    cache[strQuery] = {
      results: res.businesses,
      ttl: (now.getTime() + 86400000),
      totalRes: res.total
    }
    randNum = randomNumSelect(res.total)
  }
  strQuery += ('&offset=' + randNum)
  const resWithOffset = await getFromYelpApi(strQuery)
  logger.log('Res search w/ Off:', resWithOffset)
  return await IdCheckCache(resWithOffset.businesses[0].id)
}

export async function IdCheckCache(strQuery) {
  const now = new Date()
  logger.log('id string:', strQuery)
  if (cache[strQuery]) {
    const foundSearch = cache[strQuery]
    logger.log('Found idSearch:', foundSearch)
    if (foundSearch.ttl - now.getTime() > 0) {
      return foundSearch.results[0]
    }
  }
  const res = await getFromYelpApi(strQuery)
  logger.log('Res searchID return before Off:', res)

  cache[strQuery] = {
    results: [res],
    ttl: (now.getTime() + 86400000),
    totalRes: 1
  }
  return res
}

/**
 * Helper to generate the random offset value
 * @param {Number} outOf - The total the rand is looking between
 * @returns The random number made
 */
function randomNumSelect(outOf) {
  const result = Math.floor(Math.random() * outOf)
  // This conditional cover IndexOutOfRange edge case
  if (result === outOf) {
    return result - 1
  }
  return result
}

async function getFromYelpApi(strQuery) {
  const token = process.env.YELP_API_KEY
  yelpApi.defaults.headers.authorization = `Bearer ${token}`
  logger.log('str to call get yelpAPI:', strQuery)
  const res = await yelpApi.get(strQuery)
  logger.log('res of yelpAPI call:', res.data)
  return res.data
}
