import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {CouponTemplateDB} from './../imports/api/CouponTemplate';
import {CouponDB} from './../imports/api/Coupon';

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
      //"productCtgs":      {"Jewelery",},
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

export const ListOfUsers = new Mongo.Collection('ListOfUsers');

//TODO(Preston) add new user information to MongoDB and verify information of returning users
Meteor.methods({

    //Register new user
    'ListOfUser.register'(email, password) {

        check(email, String);
        check(password, String);


    },

    //Check if user is registered
    'ListOfUsers.checkUser'(email) {

        check(email, String);
    },

    //Login user
    'ListOfUsers.login'(email, password) {

        check(email, String);
        check(password, String);
    }
});
