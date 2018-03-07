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
    this.company          = values.company || ''; // MongoDB ID of user.
    this.salesEmail       = values.salesEmail;
    this.salesName        = values.salesName;
    this.salesPhone       = values.salesPhone;
    this._id              = values._id || ''; //template ID (MongoDB ID to quickly query this information.)
    this.upcCode          = values.upcCode;
    this.qrImage          = values.qrImage;
    this.couponImage      = values.couponImage;
    this.description      = values.description;
    this.title            = values.title;
    this.instructions     = values.instructions;
    this.productCtgs      = values.productCtgs; // product categories
    this.template         = values.template;  // graphic format template (not used for now)
  }


  // TODO(anyone): Maybe there is a better way of doing this?
  toMongoDoc() {
    return {
      company          : this.company,
      salesEmail       : this.salesEmail,
      salesName        : this.salesName,
      salesPhone       : this.salesPhone,
      upcCode          : this.upcCode,
      qrImage          : this.qrImage,
      couponImage      : this.couponImage,
      description      : this.description,
      title            : this.title,
      instructions     : this.instructions,
     productCtgs       : this.productCtgs,
     template          : this.template
    };
  }
}

export default CouponTemplate;
