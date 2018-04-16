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
          coupon: this.props.navigation.state.params.coupon,
          tempQR: require('../../assets/qr_sample.png'),    // temporary until we can save pics to Mongo
        }
    };

    render() {
        return (
            <View style={styles.viewContainer}>
                <Card 
                image={this.state.tempQR}
                imageStyle={styles.qrImage}
                containerStyle={styles.couponCard}>
                </Card> 
                <Card 
                    containerStyle={styles.upcCard}>
                    <Text style={styles.upcText}>UPC Code: {this.state.coupon.upcCode}</Text>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: '#aee3b2',
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },

    couponCard: {
        backgroundColor: '#fcfcfc',
        margin: 5,
        shadowColor: '#d2d2d2',
        borderColor: '#d9d9d9',
        borderRadius: 10,
    },

    upcCard: {
        backgroundColor: '#fcfcfc',
        margin: 5,
        shadowColor: '#d2d2d2',
        borderColor: '#d9d9d9',
        borderRadius: 10,
    },

    upcText: {
        fontSize: 20,
        textAlign: 'center'
    },

    qrImage: {
       height: 340  
    }

});

export default RedeemView;