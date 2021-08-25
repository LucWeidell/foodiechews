import { yelpApi } from '../services/AxiosService'

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
  const now = new Date()
  if (Object.keys(cache[strQuery]).length > 0) {
    const foundSearch = cache[strQuery]
    if (foundSearch.ttl - now.getTime() > 0) {
      randNum = randoNumSelect(foundSearch.total)
    }
  } else {
    const res = await this.getFromYelpApi(strQuery)
    cache.strQuery = {
      results: res.businesses,
      ttl: (now.getTime() + 86400000),
      totalRes: res.total
    }
    randNum = randoNumSelect(res.total)
  }
  strQuery += ('&offset=' + randNum)
  const resWithOffset = await this.getFromYelpApi(strQuery)
  return await IdCheckCache('id/' + resWithOffset.id)
}

export async function IdCheckCache(strQuery) {
  const now = new Date()
  if (Object.keys(cache[strQuery]).length > 0) {
    const foundSearch = cache[strQuery]
    if (foundSearch.ttl - now.getTime() > 0) {
      return foundSearch.results[0]
    }
  }
  const res = await getFromYelpApi(strQuery)
  cache.strQuery = {
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
function randoNumSelect(outOf) {
  const result = Math.floor(Math.random() * outOf)
  // This conditional cover IndexOutOfRange edge case
  if (result === outOf) {
    return result - 1
  }
  return result
}

async function getFromYelpApi(strQuery) {
  const res = await yelpApi.get(strQuery)
  return res.data
}
