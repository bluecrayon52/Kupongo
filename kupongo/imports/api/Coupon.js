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
    // attributes specific to a coupon instance
    this._id              = values._id || ''; // Coupon ID (MongoDB ID to quickly query this information).
    this.upperLat         = values.upperLat;
    this.lowerLat         = values.lowerLat;
    this.eastLong         = values.eastLong;
    this.westLong         = values.westLong;
    this.quantity         = values.quantity; 
    this.preViewingDate   = values.preViewingDate || new Date();
    this.collectStartDate = values.collectStartDate || new Date();
    this.collectEndDate   = values.collectEndDate || new Date();
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
    this.salesID          = template.salesID
    this.templateID       = template._id;
    this.companyName      = template.companyName;
    this.upcCode          = template.upcCode;
    this.qrImage          = template.qrImage;
    this.couponImage      = template.couponImage;
    this.description      = template.description;
    this.title            = template.title;
    this.instructions     = template.instructions;
    this.productCtgs      = template.productCtgs; // product categories
    this.layout           = template.layout; 
  }

  /**
   * Takes appropriate class fields and collects them in one JSON so that it can be inserted into MongoDB.
   * @returns {{}} JSON object with appropriate fields to insert in MongoDB.
   */
  toMongoDoc() {
    // TODO(david): Maybe there is a better way of doing this?
    return {
      salesID:          this.salesID,
      templateId:       this.templateId,
      companyName:      this.companyName,
      upcCode:          this.upcCode,
      qrImage:          this.qrImage,
      couponImage:      this.couponImage,
      description:      this.description,
      title:            this.title,
      instructions:     this.instructions,
      productCtgs:      this.productCtgs,
      layout:           this.layout,
      upperLat:         this.upperLat,
      lowerLat:         this.lowerLat,
      eastLong:         this.eastLong,
      westLong:         this.westLong,
      quantity:         this.quantity, 
      preViewingDate:   this.preViewingDate,
      collectStartDate: this.collectStartDate,
      collectEndDate:   this.collectEndDate,
      redeemStartDate:  this.redeemStartDate,
      redeemEndDate:    this.redeemEndDate,
    };
  }
}

export default Coupon;
