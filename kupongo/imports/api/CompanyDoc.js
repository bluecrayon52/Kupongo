/**
*   MongoDB template for the company document in the database
*/

import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const CompanyDB = new Mongo.Collection('Company');

class Company {
  constructor(values) {
    this._id               = values._id || ''; // Company ID (MongoDB ID to quickly query this information.)
    this.companyName      = values.companyName;
    this.email            = values.email;
    this.passWord         = values.passWord;
    this.firstName        = values.firstName;
    this.lastName         = values.lastName;
    this.phone            = values.phone;
    this.signUpDate       = values.signUpDate;
    this.availableTokens  = values.availableTokens;
    this.usedTokens       = values.usedTokens;
  }

  toMongoDoc() {
    return {
      companyName:      this.companyName,
      email:            this.email,
      password:         this.password,
      firstName:        this.firstName, 
      lastName:         this.lastName,
      phone:            this.phone,
      signUpDate:       this.signUpDate,
      availableTokens:  this.availableTokens,
      usedTokens:       this.usedTokens

    };
  }

}

export default CouponTemplate;
