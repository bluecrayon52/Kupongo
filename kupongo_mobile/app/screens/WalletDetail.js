
import React, {Component} from 'react';
import Meteor from 'react-native-meteor';
import {
    StyleSheet,
    Text,
    View, 
    Button,
  } from 'react-native';
import { Card, Divider} from 'react-native-elements'
  
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
        const { navigate } = this.props.navigation;
        return (
            // <View>
            //     <Text>{this.state.coupon.title}</Text>
            //     <Divider style={{ backgroundColor: '#afdfcd' }} />
            //   <Button
            //       title="Redeem Me!"
            //       onPress={() => console.log('[WalletDetail]: coupon.title: ' + this.state.coupon.title)}
            //   />
            // </View>
            <Card 
                title={this.state.coupon.companyName}>
                <Text style={{marginBottom: 10}}>{this.state.coupon.description}</Text>
                <Divider style={{ backgroundColor: '#afdfcd' }} />
                <Text style={{marginBottom: 10}}>{this.state.coupon.instructions}</Text>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#afdfcd'
                    fontFamily='Lato'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    onPress={()=> navigate('Redeem', {coupon: this.state.coupon})}
                    title='REDEEM NOW' />    
            </Card>
        );
    }
}

const styles = StyleSheet.create({

});

export default WalletDetail;