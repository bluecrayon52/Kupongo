/**
*   MongoDB template for the user document in the database
*/

class UserDoc {
  constructor(values) {
    this.id                   = values.id || '';
    this.firstName            = values.firstName;
    this.lastName             = values.lastName;
    this.email                = values.email;
    this.signupDate           = values.signupDate || new Date();
    this.userType             = values.userType;
    this.lastLat              = values.lastLat;
    this.lastLong             = values.lastLong;
    this.lastUpdate           = values.lastUpdate;
    this.couponsCollected     = values.couponsCollected;
    this.authenticationToken  = values.authenticationToken;
  }

  // TODO(david): Should return Coupon instance to upload to MongoDB.
  convertToCoupon(upperLeft, lowerRight) {
  }
}

export default UserDoc;
