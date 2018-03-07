import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {routes} from '../imports/config/router';

Tracker.autorun(function () {
});

Meteor.startup(function () {
  // To render another page, just import the component and replace jsx with <ComponentName />
  ReactDOM.render(routes, document.getElementById('app'));
});
