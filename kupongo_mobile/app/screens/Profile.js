/**
 * Screen for displaying user profile stuff.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

class Profile extends Component {
  render() {
    return (
        <View>
          <Text>Profile stuff here</Text>
          <Button
              title="Sign Out"
              onPress={() => this.props.screenProps.onLogout()}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
});

export default Profile;
