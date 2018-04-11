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
import { Card, ListItem, Button } from 'react-native-elements'

class Wallet extends Component {
  constructor(props) {
    console.log('[Wallet]: constructor is now runnig . . . . ')
    super(props);
    this.state = {
      user: this.props.screenProps.userInfo,
      coupons: []
    }
    
    this.state.user.couponList = new Set(this.state.user.couponList);
  };
  
  componentWillMount() {
    console.log('[Wallet]: componentWillMount running . . . . . ')
    let res = [
      {_id: '1', companyName: 'Company 1', title: 'Coupon 1', description: 'Description 1', instructions: 'Instructuons 1'}, 
      {_id: '2', companyName: 'Company 2', title: 'Coupon 2', description: 'Description 2', instructions: 'Instructuons 2'}, 
      {_id: '3', companyName: 'Company 3', title: 'Coupon 3', description: 'Description 3', instructions: 'Instructuons 3'}, 
      {_id: '4', companyName: 'Company 4', title: 'Coupon 4', description: 'Description 4', instructions: 'Instructuons 4'}, 
      {_id: '5', companyName: 'Company 5', title: 'Coupon 5', description: 'Description 5', instructions: 'Instructuons 5'}, 
      {_id: '6', companyName: 'Company 6', title: 'Coupon 6', description: 'Description 6', instructions: 'Instructuons 6'}, 
      {_id: '7', companyName: 'Company 7', title: 'Coupon 7', description: 'Description 7', instructions: 'Instructuons 7'}, 
      {_id: '8', companyName: 'Company 8', title: 'Coupon 8', description: 'Description 8', instructions: 'Instructuons 8'}, 
      {_id: '9', companyName: 'Company 9', title: 'Coupon 9', description: 'Description 9', instructions: 'Instructuons 9'}
    ];

    this.setState({
      coupons: res
    })
    // console.log('[Wallet]: calling getCollectedCoupons for user._id: ' + this.state.user._id);
    // // call server for coupons based on ids in couponList 
    // Meteor.call('getCollectedCoupons', this.state.user._id, (err, res) => {
    //   console.log('[Wallet]: getCollectedCoupons response: ' + res);
    //   console.log('[Wallet]: getCollectedCoupons response err: ' + err.message);
    //     this.setState({
    //       coupons: res
    //     })
    // });
  }
  
  render() {
    console.log('[Wallet]: render running . . . . . ');
    console.log('[Wallet]: render this.state.coupons.length: ' + this.state.coupons.length);
    console.log('[Wallet]: render this.state.coupons[0].title: ' + this.state.coupons[0].title);
    return (
      <FlatList 
        style={{margin:0}}
        data={this.state.coupons}
        numColumns={3}
        keyExtractor={item => item._id }
        renderItem={({item}) => (
          console.log('[Wallet]: FlatList renderItem item.title: '+item.title),
          <Card 
            titleStyle={styles.cardTitle} 
            containerStyle={styles.couponCard} 
            title={item.title} 
          />  
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  couponCard: {
    flex: 1,
    height: 130
  },

  cardTitle: {
    fontSize: 12
  }
});

export default Wallet;
