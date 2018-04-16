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
import Recoverpassword from './screens/Recoverpassword';
import Reset from './screens/Reset';
import {StackNavigator, TabNavigator} from 'react-navigation';
import WalletDetail from './screens/WalletDetail';
import RedeemView from './screens/RedeemView';
import {Image} from 'react-native';


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
  },
  Recoverpassword: {
    screen: Recoverpassword,
    navigationOptions: {
      title: "Recoverpassword"
    }
  },
  Reset: {
    screen: Reset,
    navigationOptions: {
      title: "Reset"
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
  Detail: {
    screen: WalletDetail,
  },

  Redeem: {
    screen: RedeemView,
  }
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
      title: 'Map',
      tabBarIcon: ({tintColor})=> (<Image source={require('../assets/ic_map_2x.png')} style={{width: 22, height: 22, tintColor: 'black'}}></Image>)
    }
  },
  Wallet: {
    screen: WalletScreens,
    navigationOptions: {
      title: 'Wallet',
      tabBarIcon: ({tintColor})=> (<Image source={require('../assets/ic_account_balance_wallet_2x.png')} style={{width: 22, height: 22, tintColor: 'black'}}></Image>)
    }
  },
  Profile: {
    screen: ProfileScreens,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: ({tintColor})=> (<Image source={require('../assets/ic_account_circle_2x.png')} style={{width: 22, height: 22, tintColor: 'black'}}></Image>)
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#e8e5e5',
    inactiveTintColor: 'black',
    inactiveBackgroundColor: '#fcfcfc',
    labelStyle: {
      fontSize: 12,
      padding: 0
    }
  } 
});

export default Kupongo;
