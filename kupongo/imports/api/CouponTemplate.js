/**
 * Javascript Class to represent the CouponTemplate collection.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const CouponTemplateDB = new Mongo.Collection('CouponTemplate');

if (Meteor.isServer) {
  Meteor.publish('CouponTemplate', () =>{
    return CouponTemplateDB.find();
  });
}


// TODO(david): Add to this so that it can accurately represent the Coupon Template collection. May be missing some fields.
class CouponTemplate {
  constructor(values) {
    this._id              = values._id || ''; // MongoDB ID to quickly query this information.
    this.company          = values.company || ''; // MongoDB ID of user.
    this.upcCode          = values.upcCode;
    this.qrImage          = values.qrImage;
    this.couponImage      = values.couponImage;
    this.description      = values.description;
    this.title            = values.title;
    this.instructions     = values.instructions;
    this.instances        = values.instances;
    this.collectStartDate = values.collectStartDate || new Date();
    this.collectEndDate   = values.collectEndDate || new Date();
    this.preViewingDate   = values.preViewingDate || new Date();
    this.redeemStartDate  = values.redeemStartDate || new Date();
    this.redeemEndDate    = values.redeemEndDate || new Date();
    this.expirationDate   = values.expirationDate || new Date();
  }


  // TODO(anyone): Maybe there is a better way of doing this?
  toMongoDoc() {
    return {
      company          : this.company,
      upcCode          : this.upcCode,
      qrImage          : this.qrImage,
      couponImage      : this.couponImage,
      description      : this.description,
      title            : this.title,
      instructions     : this.instructions,
      instances        : this.instances,
      collectStartDate : this.collectStartDate,
      collectEndDate   : this.collectEndDate,
      preViewingDate   : this.preViewingDate,
      redeemStartDate  : this.redeemStartDate,
      redeemEndDate    : this.redeemEndDate,
      expirationDate   : this.expirationDate
    };
  }
}

export default CouponTemplate;
