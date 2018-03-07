/**
 * Coupon class that will represent the Coupon collection in MongoDB.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const CouponDB = new Mongo.Collection('Coupon');

if (Meteor.isServer) {
  Meteor.publish('Coupon', () =>{
    return CouponDB.find();
  });
}

class Coupon {
  constructor(values) {
    // inherited attributes from coupon template.
    this.templateId       = values.templateId || ''; //template ID from referenced template 
    this.company          = values.company || ''; // MongoDB ID of user.
    this.salesEmail       = values.salesEmail;
    this.salesName        = values.salesName;
    this.salesPhone       = values.salesPhone;
    this.upcCode          = values.upcCode;
    this.qrImage          = values.qrImage;
    this.couponImage      = values.couponImage;
    this.description      = values.description;
    this.title            = values.title;
    this.instructions     = values.instructions;
    this.productCtgs      = values.productCtgs; // product categories
    this.template         = values.template;  // graphic format template (not used fo

    // attributes specific to a coupon instance
    this._id              = values._id || ''; // Coupon ID (MongoDB ID to quickly query this information).
    this.upperLat         = values.upperLat;
    this.lowerLat         = values.lowerLat;
    this.upperLong        = values.upperLong;
    this.lowerLong        = values.lowerLong;
    this.quantity        = values.quantity; 
    this.collectStartDate = values.collectStartDate || new Date();
    this.collectEndDate   = values.collectEndDate || new Date();
    this.preViewingDate   = values.preViewingDate || new Date();
    this.redeemStartDate  = values.redeemStartDate || new Date();
    this.redeemEndDate    = values.redeemEndDate || new Date();
   
    // UI attributes.
    // TODO(david): Maybe move this to wrapper class.
    this.clicked          = values.clicked || false;

    // Inherited Template attributes. (values are checked in case we are retrieving them from Mongo).
    // TODO(david): Look into may just refer from the Template document instead of duplicating fields.
    if (values.template !== null)
      this.copyTemplateInfo(values.template);
    else
      this.copyTemplateInfo(values);
  }

  copyTemplateInfo(template) {
    this.templateId       = template._id;
    this.company          = template.company;
    this.salesEmail       = template.salesEmail;
    this.salesName        = template.salesName;
    this.salesPhone       = template.salesPhone;
    this.upcCode          = template.upcCode;
    this.qrImage          = template.qrImage;
    this.couponImage      = template.couponImage;
    this.description      = template.description;
    this.title            = template.title;
    this.instructions     = template.instructions;
    this.productCtgs      = template.productCtgs; // product categories
    this.template         = template.template; 
  }

  /**
   * Takes appropriate class fields and collects them in one JSON so that it can be inserted into MongoDB.
   * @returns {{}} JSON object with appropriate fields to insert in MongoDB.
   */
  toMongoDoc() {
    // TODO(david): Maybe there is a better way of doing this?
    return {
      company: this.company,
      templateId: this.templateId,
      upcCode: this.upcCode,
      title: this.title,
      description: this.description,
      instances: this.instances,
      instructions: this.instructions,
      collectStartDate: this.collectStartDate,
      collectEndDate: this.collectEndDate,
      preViewingDate: this.preViewingDate,
      redeemStartDate: this.redeemStartDate,
      redeemEndDate: this.redeemEndDate,
      expirationDate: this.expirationDate,
      lat: this.lat,
      lng: this.lng
    };
  }
}

export default Coupon;
