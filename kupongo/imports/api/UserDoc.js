/**
*   MongoDB template for the user documents in the database
*/
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const UserDB = new Mongo.Collection('User');

class  SalesExec {
  constructor(values) {
    this._id                  = values._id || '';    // sales ID
    this.authenticationToken  = values.authenticationToken;
    this.email                = values.email;
    this.password             = values.password;
    this.firstName            = values.firstName;
    this.lastName             = values.lastName;
    this.phoneNumber          = values.phoneNumber;
    this.address              = values.address;
    this.signUpDate           = values.signUpDate || new Date();
    this.lastSignInDate       = values.lastSignInDate || new Date();
  }

  copyCompanyInfo(company) {
    this.companyID      = company._id;
    this.companyName    = company.companyName;
    this.companyEmail   = company.email;
    this.companyRepName = company.firstName + ' ' + company.lastName;
    this.companyPhone   = company.phone;
  }

  toMongoDoc() {
    return {
      companyID:            this.companyID,
      companyName:          this.companyName,
      companyEmail:         this.companyEmail,
      companyRepName:       this.companyRepName,
      companyPhone:         this.companyPhone,
      authenticationToken:  this.authenticationToken,
      email:                this.email,
      password:             this.password,
      firstName:            this.firstName,
      lastName:             this.lastName,
      phoneNumber:          this.phoneNumber,
      address:              this.address,
      signUpDate:           this.signUpDate,
      lastSignInDate:       this.lastSignInDate
    };
  }

}

class Customer {
  constructor(values){
    this._id              = values._id || ''; // customer ID
    this.email            = values.email;
    this.password         = values.password;
    this.firstName        = values.firstName;
    this.lastName         = values.lastName;
    this.phone            = values.phone;
    this.address          = values.address;
    this.signUpDate       = values.signUpDate;
    this.lastSignInDate   = values.lastSignInDate;
    this.couponWallet     = []; // array of Collected Coupon objects, empty at first
    this.lastLongitude    = values.lastLongitude || -100
    this.lastLatitude    = values.lastLatitude || -100
    // NOTE: viewWindow should be a JSON object with 4 fields similar to the coupons structure
    this.viewWindow       = values.viewWindow;
    // The array of coupon _id's that this user has collected.
    this.couponList       = values.couponList;
  }
  toMongoDoc() {
    return {
      email:          this.email,
      password:       this.password,
      firstName:      this.firstName,
      lastName:       this.lastName,
      phone:          this.phone,
      address:        this.address,
      signUpDate:     this.signUpDate,
      lastSignInDate: this.lastSignInDate,
      couponWallet:   this.couponWallet,
      lastLongitude:  this.lastLongitude,
      lastLatitude:  this.lastLatitude,
      viewWindow:     this.viewWindow,
      couponList:     this.couponList
    };

  }
}



export {SalesExec};
export default Customer;
