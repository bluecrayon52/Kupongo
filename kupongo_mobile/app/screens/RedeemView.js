import React, {Component} from 'react';
import Meteor from 'react-native-meteor';
import {
    StyleSheet,
    Text,
    View, 
    Button,
  } from 'react-native';
import { Card, Divider} from 'react-native-elements'

class RedeemView extends Component {
      // dynamically set the header 
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params ? params.coupon.title : 'Redeem Coupon',
        }
    };

    constructor(props) {
        console.log('[RedeemView]: constructor is now runnig . . . . ')
        super(props);
        // access the coupon passed by the WalletDetail component
        this.state = {
          coupon: this.props.navigation.state.params.coupon
        }
    };

    render() {
        return (
            <View>
                <Text>{this.state.coupon.title}</Text>
                <Divider style={{ backgroundColor: '#afdfcd' }} />
              <Button
                  title="Redeem Me!"
                  onPress={() => console.log('[RedeemView]: coupon.title: ' + this.state.coupon.title)}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default RedeemView;