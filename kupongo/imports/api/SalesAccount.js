/*
Sales account information that will be stored in MongoDB
*/

import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const SalesAccount = new Mongo.Collection('SalesAccount');

if (Meteor.isServer) {
  Meteor.publish('SalesAccount', () =>{
    return SalesAccount.find();
  });
}

class SalesAccount {

    constructor(values) {

        this.companyID = values.companyID;
        this.authToken = values.authToken;
        this.salesID = values.salesID;
        this.email = values.email;
        this.password = values.password;
        this.firstName = values.firstName;
        this.lastName = values.lastName;
        this.phoneNumber = values.phoneNumber;
        this.address = values.address;
        this.signUpDate = values.signUpDate;
        this.lastSignInDate = values.lastSignInDate;
    }
}

export default SalesAccount;