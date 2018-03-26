/**
 * Home Page
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Kupongo!
          </Text>

          <Text style={{color: 'green'}}
              onPress={() => this.props.navigation.navigate('Updatepassword')}>
              Update Password
        	</Text>

          <Button
              onPress={() => {this.props.navigation.navigate('LiveMap', {
                // TODO(anyone): Replace this with actual user info upon login.
                user: {
                  _id: 'asdf',
                  couponList: new Set()
                }}
              )}}
              title="Live Map"
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
