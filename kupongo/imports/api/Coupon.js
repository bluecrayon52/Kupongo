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
    // Coupon specific attributes.
    this._id              = values._id || ''; // MongoDB ID to quickly query this information.
    this.lat              = values.lat;
    this.lng              = values.lng;

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
    this.upcCode          = template.upcCode;
    this.qrImage          = template.qrImage;
    this.couponImage      = template.couponImage;
    this.description      = template.description;
    this.title            = template.title;
    this.instructions     = template.instructions;
    this.instances        = template.instances;
    this.collectStartDate = template.collectStartDate || new Date();
    this.collectEndDate   = template.collectEndDate || new Date();
    this.preViewingDate   = template.preViewingDate || new Date();
    this.redeemStartDate  = template.redeemStartDate || new Date();
    this.redeemEndDate    = template.redeemEndDate || new Date();
    this.expirationDate   = template.expirationDate || new Date();
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
