
import React, {Component} from 'react';
import Meteor from 'react-native-meteor';
import {
    StyleSheet,
    Text,
    View, 
    Button,
  } from 'react-native';
  
class WalletDetail extends Component {
    render() {
        return (
            <View>
              <Text>Details Details</Text>
              <Button
                  title="Redeem Me!"
                  onPress={() => console.log('[WalletDetail]: Ouch!')}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default WalletDetail;