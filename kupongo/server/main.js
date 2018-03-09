import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {CouponTemplateDB} from './../imports/api/CouponTemplate';
import {CouponDB} from './../imports/api/Coupon';
import {UserDB} from './../imports/api/UserDoc';
import {CompanyDB} from './../imports/api/CompanyDoc';
import {validate} from './../imports/server/ServerFunctions';

Meteor.startup(function () {
  // Test coupon
  CouponDB.insert(
    {
      "salesID":          "j128934h912",
      "templateId":       "s90ajr897123h79eb1rn",
      "companyName":      "Something Inc.",
      "upcCode":          "89181891871", // redacted until redemption is initiated
      "description":      "A fake coupon for nothing",
      "title":            "The fake coupon",
      //"instructions":     "Redeem me",
      //"productCtg":      {"Jewelery",},
      "layout":           "DW91n2ne",
      "upperLat":         -35.12380,
      "lowerLat":         -35.11111,
      "eastLong":         54.111232,
      "westLong":         54.333333,
      "quantity":         12,
      "preViewingDate":   new Date(),  // default date of pinning
      "collectStartDate": new Date(),  // default date of pinning
      "collectEndDate":   new Date(),  // default collectStartDate + 24 hrs
      "redeemStartDate":  new Date(), // default date of pinning
      "redeemEndDate":    new Date(), // default redeemStartDate + 30 days
    }, function(error, result){
      console.log("Error = " + error)
      console.log("Resulting id = " + result)
      console.log(CouponDB.find({"_id":result}).fetch())
    }
  )
  //console.log(CouponDB.find().fetch())
});

//TODO(Preston) add new user information to MongoDB and verify information of returning users
Meteor.methods({

    //Register new user
    'register'(email, companyName, password, firstName, lastName, phoneNumber) {

        check(email, String);
        check(companyName, String);
        check(password, String);
        check(firstName, String);
        check(lastName, String);
        check(phoneNumber, String);

        if(UserDB.find({'email': email}).count() > 0) {
          //Tell user email already has an account
        } else {
          //User is new, so insert information into databse
          UserDB.insert({email: email, companyName: companyName, password: password, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber});
        }
    },

    //Login user
    'login'(email, password) {

        check(email, String);
        check(password, String);

        if(UserDB.find({'email': email}).count() == 1) {
          //Login user
        } else {
          //Tell user entered information is incorrect
        }
    },

    // Insert a new coupon
    'insertCoupon'(userID, coupon){
      validate(userID, coupon, function(error, message){
        if(error){
          throw new Meteor.Error(error, message);
        }
        else{
          CouponDB.insert(coupon, function(){
            // TODO Publish the changes (KEVIN)

          })
        }
      })

    },

    // Delete an existing coupon
    'removeCoupon'(userID, coupon){
      validate(userID, coupon, function(error, message){
        if(error){
          throw new Meteor.Error(error, message);
        }
        else{
          CouponDB.remove(coupon, function(){
            // TODO Publish the changes (KEVIN)
            
          })
        }
      })
    },


});
