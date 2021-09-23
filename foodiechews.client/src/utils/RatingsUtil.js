class RatingsUtil {
  /**
   *
   * @param {Number} rating
   * @returns {String} (image URL for Yelp Stars)
   */
  getStars(rating) {
    debugger
    let star = ''
    switch (rating) {
      case 1:
        star = './src/assets/yelp/yelp_stars/regular/regular_1.png'
        break
      case 1.5:
        star = './src/assets/yelp/yelp_stars/regular/regular_1_half.png'
        break
      case 2:
        star = './src/assets/yelp/yelp_stars/regular/regular_2.png'
        break
      case 2.5:
        star = './src/assets/yelp/yelp_stars/regular/regular_2_half.png'
        break
      case 3:
        star = './src/assets/yelp/yelp_stars/regular/regular_3.png'
        break
      case 3.5:
        star = './src/assets/yelp/yelp_stars/regular/regular_3_half.png'
        break
      case 4:
        star = './src/assets/yelp/yelp_stars/regular/regular_4.png'
        break
      case 4.5:
        star = './src/assets/yelp/yelp_stars/regular/regular_4_half.png'
        break
      case 5:
        star = './src/assets/yelp/yelp_stars/regular/regular_5.png'
        break
      default:
        star = './src/assets/yelp/yelp_stars/regular/regular_0.png'
    }
    return star
  }
}

export const ratingsUtil = new RatingsUtil()
