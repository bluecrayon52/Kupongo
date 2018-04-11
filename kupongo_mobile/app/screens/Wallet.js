/**
 * Screen to display Coupon Wallet of user
 */
import React, {Component} from 'react';
import Meteor from 'react-native-meteor';
import {
  StyleSheet,
  Text,
  View, 
  FlatList
} from 'react-native';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.screenProps.userInfo,
      coupons: ['test']
    }
    
    this.state.user.couponList = new Set(this.state.user.couponList);
  };
  
  componentWillMount() {
    console.log('[Wallet]: componentWillMount running . . . . . ')
    console.log('[Wallet]: calling getCollectedCoupons for user._id: ' + this.state.user._id);
    // call server for coupons based on ids in couponList 
    Meteor.call('getCollectedCoupons', this.state.user._id, (err, res) => {
      console.log('[Wallet]: getCollectedCoupons response: ' + res);
      console.log('[Wallet]: getCollectedCoupons response err: ' + err.message);
        this.setState({
          coupons: res
        })
    });
  }
  
  render() {
    console.log('[Wallet]: render running . . . . . ');
    return (
      // <FlatList>
      <View>
        <Text>{this.state.user.couponWallet.length}</Text>
        {/* {this.state.coupons.map((coupon, index) => {
          return (
            <Text key={index}>{coupon.title}</Text>
          );
        })} */}
      {/* </FlatList> */}
      </View> 
    );
  }
}

const styles = StyleSheet.create({

});

export default Wallet;
