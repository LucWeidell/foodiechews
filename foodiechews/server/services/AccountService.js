import { dbContext } from '../db/DbContext'
import { Forbidden, BadRequest } from '../utils/Errors'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  async getById(id) {
    const account = await dbContext.Account.findById(id)
    if (!account) {
      throw new BadRequest('Invalid Account/Profile ID')
    }
    return account
  }

  async edit(user, body) {
    if (!user.id === body.id) {
      throw new Forbidden('Not your account: This should not have been called')
    }
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      body,
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }

  /**
    * Returns a list user profiles from a query search of name or email likeness
    * limits to first 20 without offset
    * @param {string} str
   */
  async findProfiles(str = '') {
    const filter = new RegExp(str, 'ig')
    const q = {
      $match: {
        $or: [{ name: filter }, { email: filter }]
      }
    }
    return await dbContext.Account
      .aggregate([q])
      .project('email picture name')
      .collation({ locale: 'en_US', strength: 1 })
      .limit(20)
      .exec()
  }

  findProfile(email) {
  }

  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }
  //  */
  // async updateAccount(user, body) {
  //   const update = sanitizeBody(body)
  //   const account = await dbContext.Account.findOneAndUpdate(
  //     { _id: user.id },
  //     { $set: update },
  //     { runValidators: true, setDefaultsOnInsert: true, new: true }
  //   )
  //   return account
  // }
}
export const accountService = new AccountService()
