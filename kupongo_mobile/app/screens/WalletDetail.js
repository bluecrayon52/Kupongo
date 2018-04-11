
import React, {Component} from 'react';
import Meteor from 'react-native-meteor';
import {
    StyleSheet,
    Text,
    View, 
    Button,
  } from 'react-native';
  
class WalletDetail extends Component {
    // dynamically set the header 
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params ? params.coupon.title : 'Coupon Details',
        }
      };

    constructor(props) {
        console.log('[WalletDetail]: constructor is now runnig . . . . ')
        super(props);
        
        // access the coupon passed by the Wallet component
        this.state = {
          coupon: this.props.navigation.state.params.coupon
        }
    };

    render() {
        return (
            <View>
              <Text>{this.state.coupon.title}</Text>
              <Button
                  title="Redeem Me!"
                  onPress={() => console.log('[WalletDetail]: coupon.title: ' + this.state.coupon.title)}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default WalletDetail;