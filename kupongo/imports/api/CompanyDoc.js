/**
*   MongoDB template for the company document in the database
*/

class CouponTemplate {
  constructor(values) {
    this.id               = values.id || ''; // MongoDB ID to quickly query this information.
    this.companyName      = values.companyName;
    this.email            = values.email;
    this.signupDate       = values.signupDate;
    this.availableTokens  = values.availableTokens;
    this.usedTokens       = values.usedTokens;
  }

  // TODO(david): Should return Coupon instance to upload to MongoDB.
  convertToCoupon(upperLeft, lowerRight) {
  }
}

export default CouponTemplate;
