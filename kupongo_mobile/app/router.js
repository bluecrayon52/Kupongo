/**
 * Routes all the screens.
 */

import React from 'react';

// Import screens here.
import Login from './screens/Login';
import LiveCouponMap from './screens/LiveCouponMap'
import Register from './screens/Register';
import Home from './screens/Home';
import Wallet from './screens/Wallet';
import Profile from './screens/Profile';
import Updatepassword from './screens/Updatepassword';


import {StackNavigator, TabNavigator} from 'react-navigation';


const Kupongo = StackNavigator({
  Main: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  },
  Updatepassword: {
    screen: Updatepassword,
    navigationOptions: {
      title: "Updatepassword"
    }
  }
  // Other screens go here too in the same format
});

const WalletScreens = StackNavigator({
  Main: {
    screen: Wallet,
    navigationOptions: {
      title: 'Coupon Wallet'
    }
  },
  // TODO(Nathan): Add the rest of the screens you want here (like detailed view, redemption view, etc.)
});

const ProfileScreens = StackNavigator({
  Main: {
    screen: Profile,
    navigationOptions: {
      title: 'Your Profile'
    }
  }
});

export const KupongoMain = TabNavigator({
  LiveMap: {
    screen: LiveCouponMap,
    navigationOptions: {
      title: "Live Map of Coupons"
    }
  },
  Wallet: {
    screen: WalletScreens,
    navigationOptions: {
      title: 'Wallet'
    }
  },
  Profile: {
    screen: ProfileScreens,
    navigationOptions: {
      title: 'Profile'
    }
  }
});

export default Kupongo;
