import {Players} from './../imports/api/players';
import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import PinCoupon from '../imports/pages/PinCoupon';

Tracker.autorun(function(){
});

Meteor.startup(function () {
  // To render another page, just import the component and replace jsx with <ComponentName />
  ReactDOM.render(<PinCoupon/>, document.getElementById('app'));
});
