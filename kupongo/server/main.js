import {Meteor} from 'meteor/meteor'; 
import {Players} from './../imports/api/players';

Meteor.startup(function () {
  Players.insert({
    name: 'Carl',
    score: 35
  });
  console.log(Players.find().fetch());
});