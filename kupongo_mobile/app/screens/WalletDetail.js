
import React, {Component} from 'react';
import Meteor from 'react-native-meteor';
import {
    StyleSheet,
    Text,
    View, 
    Button,
    Alert,
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
          coupon: this.props.navigation.state.params.coupon,
          tempCouponImg: require('../../assets/k.png')      // temporary until we can save pics to Mongo
        }

    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.viewContainer}> 
            <Card 
                image={this.state.tempCouponImg}
                imageStyle={styles.couponImage}
                title={this.state.coupon.companyName}
                dividerStyle={styles.cardTitleDivider}
                titleStyle={styles.cardTitle} 
                containerStyle={styles.couponCard}>
                <Text style={styles.descText}>{this.state.coupon.description}</Text>
                <Divider style={styles.cardBodyDivider} />
                <Text style={styles.instText}>{this.state.coupon.instructions}</Text>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#afdfcd'
                    fontFamily='Lato'
                    buttonStyle={styles.redeeemButton}
                    onPress={()=> Alert.alert( 
                        'Are You Sure?', 
                        'You can only access the redemption view once!',
                        [
                            {text: 'Cancel', onPress: () => console.log('Redeem Canceled'), style: 'cancel' },
                            {text: 'Continue', onPress: () => navigate('Redeem', {coupon: this.state.coupon})},
                        ],
                    )}
                    title='REDEEM NOW' />    
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
        // minHeight: 300,
        backgroundColor: '#fcfcfc',
        margin: 5,
        shadowColor: '#d2d2d2',
        borderColor: '#d9d9d9',
        borderRadius: 10,
    },

    cardTitle: {

    },

    couponImage: {
        height: 300 // this is specific to the tempCouponImg
    },

    cardTitleDivider: {
        backgroundColor: '#aee3b2',
        height: 3,
    },

    cardBodyDivider: {
        backgroundColor: '#aee3b2',
        height: 3,
    },

    descText: {
        marginBottom: 10
    },
    
    instText: {
        marginTop: 10,
        marginBottom: 10
    }, 

    redeeemButton: {
        borderRadius: 0, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 0
    }

});

export default WalletDetail;