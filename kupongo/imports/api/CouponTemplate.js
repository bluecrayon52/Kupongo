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
    this._id              = values._id || ''; //  template ID (MongoDB ID to quickly query this information.)
    this.upcCode          = values.upcCode; // redacted until redemption is initiated
    this.qrImage          = values.qrImage; // redacted until redemption is initiated
    this.couponImage      = values.couponImage;
    this.description      = values.description;
    this.title            = values.title;
    this.instructions     = values.instructions;
    this.productCtgs      = values.productCtgs || []; // product categories array
    this.layout           = values.layout;  // graphic format template (not used for now)
  }

  copySalesInfo(sales) {
    this.salesID          = sales._id;
    this.companyName      = sales.companyName
  }

  // TODO(anyone): Maybe there is a better way of doing this?
  toMongoDoc() {
    return {
      salesID:      this.salesID,
      companyName:  this.companyName,
      upcCode:      this.upcCode,
      qrImage:      this.qrImage,
      couponImage:  this.couponImage,
      description:  this.description,
      title:        this.title,
      instructions: this.instructions,
      productCtgs:  this.productCtgs,
      layout:       this.layout
    };
  }
}

export default CouponTemplate;
