import {Meteor} from 'meteor/meteor'; 
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {CouponTemplateDB} from './../imports/api/CouponTemplate';
import {CouponDB} from './../imports/api/Coupon';

Meteor.startup(function () {
  
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