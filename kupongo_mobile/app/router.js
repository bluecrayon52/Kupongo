/**
 * Routes all the screens.
 */

import React from 'react';

// Import screens here.
import Login from './screens/Login';
import LiveCouponMap from './screens/LiveCouponMap'
import Register from './screens/Register';
import Home from './screens/Home';

import { StackNavigator } from 'react-navigation';


const Kupongo = StackNavigator({
  Main: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  LiveMap: {
    screen: LiveCouponMap,
    navigationOptions: {
      title: "Live Map of Coupons"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  },
Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  }
  // Other screens go here too in the same format
});

export default Kupongo;
