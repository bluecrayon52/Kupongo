/**
 * Coupon class that will represent the Coupon collection in MongoDB.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import { SimpleSchema } from 'simpl-schema';
import {getRedactedCoupons} from '../srvr/ServerFunctions';

if (Meteor.isServer) {
  Meteor.publish('Coupon', (UserID) => {
    return CouponDB.find();
    // getRedactedCoupons(UserID, null, function(err, result){
    //   if(err){
    //     throw new Meteor.Error(err, result)
    //   }
    //   else{
    //     return result;
    //   }
    // })
  });
}

class Coupon {
  constructor(values) {
    // attributes specific to a coupon instance
    this._id              = values._id || ''; // Coupon ID (MongoDB ID to quickly query this information).
    //  [TODO]: calculate upper and lower lat and long in constructor in stead of passing them in.
    this.upperLat         = values.upperLat;
    this.lowerLat         = values.lowerLat;
    this.eastLong         = values.eastLong;
    this.westLong         = values.westLong;
    this.centerLat        = values.centerLat;
    this.centerLong       = values.centerLong;
    this.quantity         = values.quantity; // default 1
    this.preViewingDate   = values.preViewingDate || new Date();    // default date of pinning
    this.collectStartDate = values.collectStartDate || new Date();  // default date of pinning
    this.collectEndDate   = values.collectEndDate || new Date();    // default collectStartDate + 24 hrs
    this.redeemStartDate  = values.redeemStartDate || new Date();   // default date of pinning
    this.redeemEndDate    = values.redeemEndDate || new Date();     // default redeemStartDate + 30 days

    // UI attributes.
    // TODO(david): Change this so that we use upperLat and lowerLat instead.
    this.location = {
      type: 'Point',
      coordinates: [values.centerLong, values.centerLat]
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
    this.productCtg      = values.productCtg; // product categories
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
    this.productCtg      = template.productCtg; // product categories
    this.layout           = template.layout;
  }

  /**
   * Takes appropriate class fields and collects them in one JSON so that it can be inserted into MongoDB.
   * @returns {{}} JSON object with appropriate fields to insert in MongoDB.
   */
  toMongoDoc() {
    console.log('[Coupon]: toMongoDoc this.title: '+this.title);
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
      productCtg:      this.productCtg,
      layout:           this.layout,
      upperLat:         this.upperLat,
      lowerLat:         this.lowerLat,
      eastLong:         this.eastLong,
      westLong:         this.westLong,
      centerLat:        this.centerLat,
      centerLong:       this.centerLong,
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





// The override of the collection specific to coupons to allow for checks to be
// performed prior to any inserts, deletes, etc.
class CouponCollection extends Mongo.Collection{
  insert(couponDoc, callback, language = 'en'){
    const thisCoupon = couponDoc
    var today = new Date();

    /*
        Checks to ensure the coupon has all the necessary fields. The image
        fields are not mandatory since an image may not be included in every
        coupon
    */
    if( (!couponDoc.hasOwnProperty("salesID") && couponDoc.salesID) ||
        (!couponDoc.hasOwnProperty("templateId") && couponDoc.templateId) ||
        (!couponDoc.hasOwnProperty("companyName") && couponDoc.companyName) ||
        (!couponDoc.hasOwnProperty("couponImage") && couponDoc.couponImage) ||
        (!couponDoc.hasOwnProperty("description") && couponDoc.description) ||
        (!couponDoc.hasOwnProperty("title") && couponDoc.title) ||
        (!couponDoc.hasOwnProperty("instructions") && couponDoc.instructions) ||
        (!couponDoc.hasOwnProperty("productCtg") && couponDoc.productCtg) ||
        (!couponDoc.hasOwnProperty("layout") && couponDoc.layout) ||
        (!couponDoc.hasOwnProperty("upperLat") && couponDoc.upperLat) ||
        (!couponDoc.hasOwnProperty("lowerLat") && couponDoc.lowerLat) ||
        (!couponDoc.hasOwnProperty("eastLong") && couponDoc.eastLong) ||
        (!couponDoc.hasOwnProperty("westLong") && couponDoc.westLong) ||
        (!couponDoc.hasOwnProperty("quantity") && couponDoc.quantity) ||
        (!couponDoc.hasOwnProperty("preViewingDate") && couponDoc.preViewingDate) ||
        (!couponDoc.hasOwnProperty("collectStartDate") && couponDoc.collectStartDate) ||
        (!couponDoc.hasOwnProperty("collectEndDate") && couponDoc.collectEndDate) ||
        (!couponDoc.hasOwnProperty("redeemStartDate") && couponDoc.redeemStartDate)
    ){
      // Something is not right in the coupon document. More checks to come
      callback("Missing a required field", null);
    }
    // Check if the time values are valid
    else if(!isTodayOrLater(couponDoc.preViewingDate) || !isTodayOrLater(couponDoc.collectStartDate)
    || !isTodayOrLater(couponDoc.collectEndDate) || !isTodayOrLater(couponDoc.redeemStartDate)){
      callback("One of the dates provided is in the past", null);
    }
    else if(couponDoc.upperLat < -90 || couponDoc.upperLat > 90 || couponDoc.lowerLat < -90
    || couponDoc.lowerLat > 90 || couponDoc.eastLong < -180 || couponDoc.eastLong > 180
    || couponDoc.westLong < -180 || couponDoc.westLong > 180){
      callback("Coupon position is impossible", null);
    }
    // Everything has been checked but the validity of the account
    else{
      // If the document doesn't have a center latitude field, make it before inserting
      if(!couponDoc.hasOwnProperty("centerLat") || !couponDoc.centerLat){
        couponDoc.centerLat = ((couponDoc.upperLat + couponDoc.lowerLat) /2)
      }
      if(!couponDoc.hasOwnProperty("centerLong") || !couponDoc.centerLong){
        couponDoc.centerLong = ((couponDoc.westLong + couponDoc.eastLong) /2)
      }
      return super.insert(thisCoupon, callback)
    }
  }
  // Functions like find, only does not give the entirety of the coupon. Only
  // shows the portion necessary to inform the user.
  findRedacted(query, callback){

  }
}
export const CouponDB = new CouponCollection('Coupon');
CouponDB.deny({
  insert(){ return true; },
  update(){ return true; },
  remove(){return true; },
})

//TODO (Kevin) Figure out why the schema's existance causes a crash even though examples say it should work as is.
// CouponDB.schema = new SimpleSchema({
//   _id:              { type: String },
//   salesID:          { type: String },
//   templateId:       { type: String },
//   companyName:      { type: String },
//   upcCode:          { type: String, optional: true },
//   qrImage:          { type: String, optional: true },
//   couponImage:      { type: String, optional: true },
//   description:      { type: String },
//   title:            { type: String },
//   instructions:     { type: String },
//   productCtg:      { type: Array },
//   layout:           { type: String },
//   upperLat:         { type: Number, min: -90, max: 90},
//   lowerLat:         { type: Number, min: -90, max: 90},
//   eastLong:         { type: Number, min: -90, max: 90},
//   westLong:         { type: Number, min: -90, max: 90},
//   quantity:         { type: Number, min: 0},
//   preViewingDate:   { type: Date, defaultValue: new Date()},
//   collectStartDate: { type: Date, defaultValue: new Date()},
//   collectEndDate:   { type: Date, defaultValue: new Date()},
//   redeemStartDate:  { type: Date, defaultValue: new Date()},
//   redeemEndDate:    { type: Date, defaultValue: new Date()},
// })
//
// CouponDB.attachSchema(CouponDB.schema)

// Checks to see if the date provided is today or later
function isTodayOrLater(date){
  today = new Date();
  if(today.getYear > date.getYear){ return false }
  else if(today.getYear == date.getYear){
    if(today.getMonth > date.getMonth){ return false }
    else if(today.getMonth == date.getMonth){
      if(today.getDay > date.getDay){ return false }
      else{ return true }
    }
    else{ return true }
  }
  else{ return true }
}


if (Meteor.isServer) {
  // Publishes all of the coupons for the individual sales execs
  Meteor.publish('salesCoupons', (salesID) =>{
    CouponDB.find({"salesID" : salesID}, function(err, couponDocs){
      if(err){
        throw new Meteor.Error("Problem finding sales exec's coupons", err)
      }
      else{
        return couponDocs
      }
    });
  });

  //TODO Implement the user coupon publish functions
  // Handles the redacted coupons for users
  Meteor.publish('userCoupons', (longitude, latitude) =>{
    getRedactedCoupons(this.userID, longitude, latitude, function(err, results){
      if(err){
        throw new Meteor.Error(err, results)
      }
      else{
        return results
      }
    })
  })
}
