import { yelpApi } from '../services/AxiosService'
import { myRestaurantsService } from '../services/MyRestaurantsService'
import { logger } from './Logger'

/** This is the cache in replacement for MongoDb YelpRestaurants
 * @type {Object}
 *  @property {Object} key - the key is the search term: the key holds the object with the values to pull
 *  @property {[POJOS]} key.results - This is the result array on the search term w/ plain JS objects within
 *  @property {Number} key.ttl - This is the time to live for expiration
 *  @property {Number} key.totalRes - This is the total result for a search: id searches are always 1
  */
const cache = {}

let myRests = []

export async function searchCache(strQuery, hasLimitAlready) {
  let randNum = 0
  if (!hasLimitAlready) {
    strQuery += '&limit=1'
  } else {
    strQuery += '&limit=10'
  }

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
    const res = await getFromYelpApi(strQuery, 0, hasLimitAlready)
    logger.log('Res search before Off:', res)
    cache[strQuery] = {
      results: res.businesses,
      ttl: (now.getTime() + 86400000),
      totalRes: res.total
    }
    randNum = randomNumSelect(res.total)
  }
  strQuery += ('&offset=' + randNum)
  if (hasLimitAlready) {
    const resWithOffset = await getFromYelpApi(strQuery, randNum)
    const toReturn = validateSearch(resWithOffset.businesses)
    if (toReturn.length === 0) {
      searchCache(strQuery, hasLimitAlready)
    }
    return toReturn
  } else {
    const resWithOffset = await getFromYelpApi(strQuery, randNum, hasLimitAlready)
    return await IdCheckCache(resWithOffset.businesses[0].id)
  }
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
  const res = await getFromYelpApi(strQuery, 0)
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

/**
 * Helper to populate the myRests on an account: also updates when one is created
 * @param {String} accountId - The id for an account
 */
export async function setMyCache(accountId) {
  const myCacheToMake = await myRestaurantsService.getAll({ accountId: accountId })
  myRests = myCacheToMake
}

function validateSearch(resArray) {
  const output = [...resArray]
  for (let i = 0; i < resArray.length; i++) {
    const foundIt = myRests.find(r => r.id === resArray[i].id)
    if (foundIt) {
      output.splice(i, 1)
    }
  }
  return output
}

async function getFromYelpApi(strQuery, offset, hasLimit) {
  const token = process.env.YELP_API_KEY
  yelpApi.defaults.headers.authorization = `Bearer ${token}`
  logger.log('str to call get yelpAPI:', strQuery)
  const res = await yelpApi.get(strQuery)
  logger.log('CHeck bfore Total If:', res.data.total, 'This is offset', offset)
  if (res.data.total) {
    if (offset > res.data.total) {
      cache[strQuery].ttl = 0
      searchCache(strQuery, hasLimit)
    }
  }
  logger.log('res of yelpAPI call:', res.data)
  return res.data
}
