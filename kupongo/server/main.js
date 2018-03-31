import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {CouponTemplateDB} from './../imports/api/CouponTemplate';
import {CouponDB} from './../imports/api/Coupon';
import Customer, {UserDB} from './../imports/api/UserDoc';
import {CompanyDB} from './../imports/api/CompanyDoc';
import {validateSalesUser} from './../imports/srvr/ServerFunctions';
import {addNewUser} from './../imports/srvr/ServerFunctions';
import {validateUser} from './../imports/srvr/ServerFunctions';
import {validateMobileUser} from './../imports/srvr/ServerFunctions';
import {addNewMobileUser} from './../imports/srvr/ServerFunctions';
import {updateUserPassword} from './../imports/srvr/ServerFunctions';
import {getForgottenPassword} from './../imports/srvr/ServerFunctions';
import {setNewPassword} from './../imports/srvr/ServerFunctions';
import {getCollectedCoupons, couponIsCollectable} from './../imports/srvr/ServerFunctions';

import bcrypt from 'bcryptjs';
import {Email} from 'meteor/email';
import {canRedeemCoupon} from './../imports/srvr/ServerFunctions';

Meteor.startup(function () {

  //Setting up sending emails to users
  process.env.MAIL_URL = "smtps://postmaster%40sandbox3d6f88d2622745958ead25b71d9b550a.mailgun.org:7a0f7e08c7801f36350d8ebcac04cc1d-db1f97ba-0cf37926@smtp.mailgun.org:465";
  // Add dummy user and company.
  let companyName = 'Coke';
  let userId = 'safns';
  let token = 'token1';

  // let user = UserDB.findOne({"_id":'qXWfYLk87k2pxtXWd'})
  // let coupon = CouponDB.findOne({"_id":'H8kp39dfGyi8kvN3r'})
  // console.log(user)
  // console.log(coupon)
  // //
  // Meteor.call("redeemCoupon", user._id, coupon._id, function(err, res){
  //   if(err){
  //     console.log(err)
  //     console.log(res)
  //   }
  //   else{
  //     console.log("COUPON REDEEMED")
  //
  //   }
  // })

  // Meteor.call("collectCoupon", user._id, coupon._id, function(err, res){
  //   if(err){
  //     console.log(err)
  //     console.log(res)
  //   }
  //   else{
  //     console.log("Coupon Collected")//
  //   }
  // })



  // Meteor.call("updateCurrentLocation", user._id, -35.113, 54.1134, function(err, res){
  //   if(err){
  //     console.log(err)
  //     console.log(res)
  //   }
  // })



  // Test coupon
  CouponDB.insert(
    {
      // "salesID":          "j128934h912",
      "salesID":          "safns",
      "templateId":       "s90ajr897123h79eb1rn",
      // "companyName":      "Something Inc.",
      "companyName":      "Coke",
      "upcCode":          "89181891871", // redacted until redemption is initiated
      "description":      "A fake coupon for nothing",
      "title":            "The fake coupon",
      //"instructions":     "Redeem me",
      //"productCtg":      {"Jewelery",},
      // [TODO] pass just lat and long to Coupon constructor and calculate uppers and lowers internally.
      "lng":              -79.809468,
      "lat":              36.069827,
      "layout":           "DW91n2ne",
      "location": {
        "type": "Point",
        "coordinates": [-79.809468, 36.069827]
      },
      "upperLat":         -35.12380,
      "lowerLat":         -35.11111,
      "eastLong":         54.111232,
      "westLong":         54.333333,
      "quantity":         12,
      "preViewingDate":   new Date(),  // default date of pinning
      "collectStartDate": new Date(),  // default date of pinning
      "collectEndDate":   new Date(new Date().getTime() + (60*60*24* 1000)),  // default collectStartDate + 24 hrs
      "redeemStartDate":  new Date(), // default date of pinning
      "redeemEndDate":    new Date(new Date().getTime() + (60*60*24*30 * 1000)), // default redeemStartDate + 30 days
    }, function(error, result){
      console.log("Error = " + error)
      console.log("Resulting id = " + result)
      //let coupon =
      console.log(CouponDB.find({"_id":result}).fetch())
      UserDB.find({}).forEach(function(doc){
        if(doc._id != "safns"){
          console.log("USER = " + doc._id)
          Meteor.call("collectCoupon", doc._id, result, function(err, res){
            if(err){
              console.log(err)
              console.log(res)
            }
            else{
              console.log("COUPON COLLECTED")
              console.log("Coupon ID = " + doc.couponList[0])
              // Try to redeem it
              Meteor.call("redeemCoupon", doc._id, result, function(err2, res2){
                console.log("Err = " + err2)
                console.log("Res = " + res2)
              })
            }

          })
        }
      })

      //console.log(coupon)

    }
  )

  var couponTemplate = {
    "salesID":          "safns",
    "companyName":      "Coke",
    "upcCode":          "89181891871", // redacted until redemption is initiated
    "title":            "The fake coupon",
    "instructions":     "These are the Instructions",
    "productCtg":       "Electronics",
    "layout":           "testLayout",
  }

  CouponTemplateDB.insert(couponTemplate, function(err, result){
    if(err){
      throw new Meteor.Error(error, result)
    }
    else{
      console.log("result = " + result)
      let couponTemp = CouponTemplateDB.find({"_id":result}).fetch()
      console.log("Template = ")
      console.log(couponTemp)
    }
  });



  if (CompanyDB.find({companyName: companyName}).count() === 0){
    CompanyDB.insert({
      companyName: companyName,
      usedTokens: [token]
    });
  }

  if (UserDB.find({_id: userId}).count() === 0) {
    UserDB.insert({_id: userId, companyName: companyName, authenticationToken: token});
  }

  // Test user account, may need to add more fields but this will do for now.
  let customerId = 'asdaf';
  if (UserDB.find({_id: customerId}).count() === 0) {
    UserDB.insert({"_id": customerId,
      "email": "user@gmail.com", "password": "password",
      "couponList": [], "lastLatitude":35.113, "lastLongitude": 54.12});
  }



  // Added so that we can test Mongo's spatial queries.
  CouponDB.rawCollection().createIndex({location: '2dsphere'});
});

Meteor.methods({

  //Update user password
  'updatePassword'(email, oldPassword, newPassword){
    return updateUserPassword(email, oldPassword, newPassword, function(error, message){
      if(error) {
        throw new Meteor.Error(error, message);
      } else {
        return true;
      }
    });
  },

  //Send email to user
  'sendEmail'(email){
    Email.send({
      to: email,
      from: "kupongoteam@kupongo.com",
      subject: "Welcome to Kupongo!",
      text: "Thanks for registering!",
    });
  },

  //Recover password email
  'recoverPasswordEmail'(email) {
    Email.send({
      to: email,
      from: "kupongoteam@kupongo.com",
      subject: "Password recovery",
      html: "<a href='http://localhost:3000/reset'> link </a>",
    });
  },

  //Set new password if lost
  'resetLostPassword'(email, password) {
    return setNewPassword(email, password, function(error, result){
      if(error) {
        throw new Meteor.Error(error, message);
      } else {
        return true;
      }
    });
  },

    //Register new user
    'register'(email, companyName, password, firstName, lastName, phoneNumber) {
      return addNewUser(email, companyName, password, firstName, lastName, phoneNumber, function(error, message){
        if(error) {
          throw new Meteor.Error(error, message);
        } else {
          return true;
        }
      });
  },

    //Login user
    'login'(email, password) {
      return validateUser(email, password, function(error, message){
        if(error) {
          throw new Meteor.Error(error, message);
        } else {
          console.log('[server/main]', 'returning true');
          return true;
        }
      });
    },
      //Login user
    'loginUser'(email, password) {
      return validateMobileUser(email, password, function(error, message){
        if(error) {
          throw new Meteor.Error(error, message);
        } else {
          console.log('[server/main]', 'returning true');
          return true;
        }
      });
    },


    //Login mobile user
    'registerMobileUser'(email, password, firstName, lastName, phoneNumber, address) {
      return addNewMobileUser(email, password, firstName, lastName, phoneNumber, address, function(error, message){
        if(error) {
          throw new Meteor.Error(error, message);
        } else {
          consle.log('[server/main]', 'returning true');
          return true;
        }
      });
    },

    // Insert a new coupon
    'insertCoupon'(userID, coupon){
      console.log('[server/main]: insertCoupon, userID: '+userID+', coupon.title: '+coupon.title);
      validateSalesUser(userID, coupon, function(error, message){
        if(error){
          console.log('[server/main]: insertCoupon, validateSalesUser resulted in an error for userID: '+userID);
          throw new Meteor.Error(error, message);
        }
        else{
          CouponDB.insert(coupon, function(){
            console.log('[server/main]: insertCoupon for coupon.title: '+coupon.title+' was successful!')
            return true
          })
        }
      })

    },

    'updateCoupon'(userID, coupon) {
      validateSalesUser(userID, coupon, function(error, message){
        if (error) {
          console.log('[server/main]: updateCoupon, validateSalesUser resulted in an error for userID: '+userID);
          throw new Meteor.Error(error, message);
        } else {
         CouponDB.update({_id: coupon._id}, {$set: coupon}, function(){
            console.log('[server/main]: updateCoupon for coupon.title: '+coupon.title+' was successful!');
            return true
          });
        }
      });
    },

    // Insert a new coupon template
    'insertCouponTemplate'(userID,couponTemplate){
      console.log('[server/main]: insertCouponTemplate, userID: '+userID+', couponTemplate.title: '+couponTemplate.title);
      validateSalesUser(userID, couponTemplate, function(error,message){
        if(error){
          console.log('[server/main]: insertCouponTemplate, validateSalesUser resulted in an error for userID: '+userID);
          throw new Meteor.Error(error,message)
        }
        else{
          CouponTemplateDB.insert(couponTemplate, function(err, result){
            if(err){
              throw new Meteor.Error(error, result)
            }
            else{
              return couponTemplate._id;
            }
          });
        }
      });
    },

    // Delete an existing coupon
    'removeCoupon'(userID, coupon){
      console.log('[server/main]: removeCoupon, userID: '+userID+', coupon.title: ' + coupon.title);
      validateSalesUser(userID, coupon, function(error, message){
        if(error){
          console.log('[server/main]: removeCoupon, validateSalesUser resulted in an error for userID: '+userID);
          throw new Meteor.Error(error, message);
        }
        else{
          CouponDB.remove(coupon, function(){
            return true;
          })
        }
      })
    },

    // Delete an existing coupon template
    'removeCouponTemplate'(userID, couponTemplate){
      console.log('[server/main]: removeCouponTemplate, userID: '+userID+', couponTemplate.title: '+couponTemplate.tile);
      validateSalesUser(userID, couponTemplate, function(error, message){
        if(error){
          console.log('[server/main]: removeCouponTemplate, validateSalesUser resulted in an error for userID: '+userID);
          throw new Meteor.Error(error, message);
        }
        else{
          CouponTemplateDB.remove(couponTemplate, function(){
            return true;
          })
        }
      })
    },

    // Updates the user's current location so the subscription will give nearby items
    'updateCurrentLocation'(userID, lat, lng){
      console.log("Lat = " + lat)
      console.log("Long = " + lng)
      // TODO Create a security system so a user cannot change someone else's location
      UserDB.update({'_id': userID}, {$set: {'lastLatitude': lat, 'lastLongitude': lng}}, function(err, res){
        if(err){
          return err;
        }
        else{
          return null;
        }
      })
    },

    // Gets coupons at a specific location for a forced refresh. Returns a JSON array of docs
    'getCouponsAt'(userID, lat, lng){
      getRedactedCoupons(userID, lat, lng, function(err, result){
        if(err){
          throw new Meteor.Error(err, result)
        }
        else{
          return result;
        }
      })
    },

    // Gets the list of coupons that have been collected by that user
    'getCollectedCoupons'(userID){
      getCollectedCoupons(userID, function(err, result){
        if(err){
          throw new Meteor.Error(err, result)
        }
        else{
          return result;
        }
      })
    },

    // Places the coupon in the user's collected list if they are within the coupon's area
    'collectCoupon'(userID, couponID){
      couponIsCollectable(userID, couponID, function(error, isCollectable){
        console.log("Collecting coupon = " + couponID);
        if(isCollectable){
          // Collect the coupon
          UserDB.update({"_id" : userID}, {$addToSet: {"couponWallet" : couponID}}, function(err, result){
            if(err){
              throw new Meteor.Error("Error adding to collected List. Collection Failed", err)
            }
            else{
              return true;
            }
          })
        }
        else{
          throw new Meteor.Error("Collection Unsuccessful", error)
        }
      })
    },

    // Redeems the coupon by passing back an almost-full coupon doc and removing it from their collection
    'redeemCoupon'(userID, couponID){
      // Get the user's document to make sure they have the coupon that is being redeemed
      canRedeemCoupon(userID, couponID, function(errObj, userDoc, couponDoc){
        if(errObj){
          throw new Meteor.Error(errObj.code, errObj.message)
        }
        else{
          // Remove the coupon from the user's document and return the full coupon
          // console.log("Coupon being removed = ")
          // console.log(couponDoc)
          UserDB.update({"_id": userID}, {"$pull": {"couponWallet" : couponID}}, function(err, docsAffected){
            if(err){
              throw new Meteor.Error("Database Error", err)
            }
            else{
              return couponDoc
            }
          })
        }
      })
    },

    // For benchmarking purposes. Curious to see how slow can the geospatial queries really be.
    'getCouponsIn'(region) {
      return CouponDB.find({
        location: {
          $geoWithin: {
            $geometry: {
              type: "Polygon",
              coordinates: [region]
            }
          }
        }
      },
      { "salesID":0, "templateID":0, "upcCode":0, "qrImage":0 },
      ).fetch()
    },

    'collectCouponBeta'(userId, couponId) {
      const coupon = CouponDB.findOne({_id: couponId});
      if (coupon) {
        const today = new Date();
        const startDate = new Date(coupon.collectStartDate);
        const endDate = new Date(coupon.collectEndDate);
        console.log(startDate);
        console.log(endDate);
        if (today < startDate || today > endDate) {
          return false;
        }
        UserDB.update({"_id" : userId}, {$addToSet: {"couponList" : couponId}}, function(err, result){
          console.log(err, result);
          if(err){
            throw new Meteor.Error("Error adding to collected List. Collection Failed", err)
          }
          else{
            return true;
          }
        });
      } else {
        throw new Meteor.Error("Collection Unsuccessful", error)
      }
    }


});
