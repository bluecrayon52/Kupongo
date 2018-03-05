/**
 * Javascript Class to represent the CouponTemplate collection.
 */

// TODO(david): Add to this so that it can accurately represent the Coupon Template collection. May be missing some fields.
class CouponTemplate {
  constructor(values) {
    this.id = ''; // MongoDB ID to quickly query this information.
    this.company          = values.company;
    this.upcCode          = values.upcCode;
    this.qrImage          = values.qrImage;
    this.description      = values.description;
    this.title            = values.title;
    this.instructions     = values.instructions;
    this.redeemEndDate    = values.redeemEndDate;
    this.instances        = values.instances;
    this.expirationDate   = values.expirationDate || new Date();
  }

  // TODO(david): Should return Coupon instance to upload to MongoDB.
  convertToCoupon(upperLeft, lowerRight) {
  }
}

export default CouponTemplate;