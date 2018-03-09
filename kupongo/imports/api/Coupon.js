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
    this.quantity         = values.quantity; // default 1
    this.preViewingDate   = values.preViewingDate || new Date();  // default date of pinning
    this.collectStartDate = values.collectStartDate || new Date(); // default date of pinning
    this.collectEndDate   = values.collectEndDate || new Date();  // default collectStartDate + 24 hrs 
    this.redeemStartDate  = values.redeemStartDate || new Date(); // default date of pinning 
    this.redeemEndDate    = values.redeemEndDate || new Date(); // default redeemStartDate + 30 days

    // UI attributes.
    // TODO(david): Change this so that we use upperLat and lowerLat instead.
    this.location = {
      type: 'Point',
      coordinates: [values.lng, values.lat]
    };

    // Inherited Template attributes. (values are checked in case we are retrieving them from Mongo).
    if (values.hasOwnProperty('template'))
      this.copyTemplateInfo(values.template);
    else
      this.copyFromMongo(values);
  }

  // Made this since in copyTemplateInfo, the line with "template._id" will copy the coupon ID not the templateId.
  // TODO(david): Maybe find a way so there isn't so much code duplication?
  copyFromMongo(values) {
    this.salesID          = values.salesID;
    this.templateId       = values.templateId;
    this.companyName      = values.companyName;
    this.upcCode          = values.upcCode; // redacted until redemption is initiated
    this.qrImage          = values.qrImage; // redacted until redemption is initiated
    this.couponImage      = values.couponImage;
    this.description      = values.description;
    this.title            = values.title;
    this.instructions     = values.instructions;
    this.productCtgs      = values.productCtgs; // product categories
    this.layout           = values.layout;
  }

  copyTemplateInfo(template) {
    this.salesID          = template.salesID;
    this.templateId       = template._id;
    this.companyName      = template.companyName;
    this.upcCode          = template.upcCode; // redacted until redemption is initiated
    this.qrImage          = template.qrImage; // redacted until redemption is initiated
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
      location:         this.location,
      companyName:      this.companyName,
      upcCode:          this.upcCode, // redacted until redemption is initiated
      qrImage:          this.qrImage, // redacted until redemption is initiated
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
      preViewingDate:   this.preViewingDate,  // default date of pinning
      collectStartDate: this.collectStartDate,  // default date of pinning
      collectEndDate:   this.collectEndDate,  // default collectStartDate + 24 hrs
      redeemStartDate:  this.redeemStartDate, // default date of pinning
      redeemEndDate:    this.redeemEndDate, // default redeemStartDate + 30 days
    };
  }
}

export default Coupon;
