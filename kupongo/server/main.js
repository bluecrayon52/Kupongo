import {Meteor} from 'meteor/meteor'; 
import {Players} from './../imports/api/players';
import {CouponTemplateDB} from './../imports/api/CouponTemplate';
import {CouponDB} from './../imports/api/Coupon';

Meteor.startup(function () {
  // Players.insert({
  //   name: 'Carl',
  //   score: 35
  // });
  console.log(Players.find().fetch());
});