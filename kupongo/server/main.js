import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {CouponTemplateDB} from './../imports/api/CouponTemplate';
import {CouponDB} from './../imports/api/Coupon';
import {UserDB} from './../imports/api/UserDoc';
import {CompanyDB} from './../imports/api/CompanyDoc';
import {validateSalesUser} from './../imports/srvr/ServerFunctions';
import bcrypt from 'bcryptjs';

Meteor.startup(function () {
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
      "collectEndDate":   new Date(),  // default collectStartDate + 24 hrs
      "redeemStartDate":  new Date(), // default date of pinning
      "redeemEndDate":    new Date(), // default redeemStartDate + 30 days
    }, function(error, result){
      console.log("Error = " + error)
      console.log("Resulting id = " + result)
      console.log(CouponDB.find({"_id":result}).fetch())
    }
  )

  var couponTemplate = {
    "salesID":          "j128934h912",
    "companyName":      "Something Inc.",
    "upcCode":          "89181891871", // redacted until redemption is initiated
    "title":            "The fake coupon",
    "instructions":     "Something Inc.",
    "productCtg":       "Something Inc.",
    "layout":           "Something Inc.",
  }
  CouponTemplateDB.insert(couponTemplate, function(err, result){
    if(err){
      throw new Meteor.Error(error, result)
    }
    else{
      console.log("result = " + result)
      CouponTemplateDB.find({"_id":couponTemplate._id}, function(err, docs){
        console.log(docs)
      })
    }
  });

  // Add dummy user and company.
  let companyName = 'Coke';
  let userId = 'safns';
  let token = 'token1';

  if (CompanyDB.find({companyName: companyName}).count() === 0){
    CompanyDB.insert({
      companyName: companyName,
      usedTokens: [token]
    });
  }

  if (UserDB.find({_id: userId}).count() === 0) {
    UserDB.insert({_id: userId, companyName: companyName, authenticationToken: token});
  }
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
        throw new Meteor.Error('Account taken','This email has already been assigned to an existing account.');
        console.log("Error = " + error);
      } else {
        //User is new, so insert information into databse
        UserDB.insert({email: email, companyName: companyName, password: password, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber});
      }
  },

    //Login user
    'login'(email, password) {

        check(email, String);
        check(password, String);

        if(UserDB.find({'email': email})) {
          //Compare password to hashed password
          bcrypt.compare(password, hash, function(err, res) {
            //If they match, login user otherwise show error
            if(res == true) {
              //Login user
              console.log("Login complete.");
            } else {
              //Give error
            }
          });
        } else {
          //Tell user entered information is incorrect
          throw new Meteor.Error('Incorrect information','You have enetered a wrong email or password.');
          console.log("Error = " + error);
        }
    },

    // Insert a new coupon
    'insertCoupon'(userID, coupon){
      validateSalesUser(userID, coupon, function(error, message){
        if(error){
          throw new Meteor.Error(error, message);
        }
        else{
          CouponDB.insert(coupon, function(){
            return true
          })
        }
      })

    },

    // Insert a new coupon template
    'insertCouponTemplate'(userID,couponTemplate){
      console.log('[server/main]: insertCouponTemplate, userID: '+userID+', templateTitle: '+couponTemplate.title);
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
      validateSalesUser(userID, coupon, function(error, message){
        if(error){
          throw new Meteor.Error(error, message);
        }
        else{
          CouponDB.remove(coupon, function(){
            return true;
          })
        }
      })
    },





});
