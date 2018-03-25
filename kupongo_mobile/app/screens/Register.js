/**
 * Register users.
 */

import React, {Component} from 'react';
import Meteor from 'react-native-meteor';

import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput
} from 'react-native';


export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: ''
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Kupongo!
          </Text>
          <Text style={styles.instructions}>
            Register
          </Text>
          <TextInput
              style={styles.input}
              placeholder="Email"
              ref="emailInput"
              name="email"
              onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
              style={styles.input}
              placeholder="First Name"
              ref="firstNameInput"
              name="firstName"
              onChangeText={(text) => this.setState({firstName: text})}
          />
          <TextInput
              style={styles.input}
              placeholder="Last Name"
              ref="lastNameInput"
              name="lastName"
              onChangeText={(text) => this.setState({lastName: text})}
          />
          <TextInput
              style={styles.input}
              placeholder="Phone Number"
              ref="phoneNumberInput"
              name="phoneNumber"
              onChangeText={(text) => this.setState({phoneNumber: text})}
          />
          <TextInput
              style={styles.input}
              placeholder="Password"
              ref="passwordinput"
              name="password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
          />
          <TextInput
              style={styles.input}
              placeholder="Address"
              ref="addressInput"
              name="address"
              onChangeText={(text) => this.setState({address: text})}
          />
          <Button
              onPress={() => {
                this.process();
              }}
              title="Submit"
          />
        </View>
    );
  }

  process() {
    this.props.navigation.navigate('Home', {
          user: {
            _id: 'asdf',
            couponList: new Set()
          }
        }
    );
  }

  componentWillMount() {
    // Make sure you run "npm run start" on the kupongo project so the server is up.
    // This connects to that Meteor server. Once the AWS server is up, replace the ip address with the url of the server.
    // If you are on Android, find your network IP address, the one which your WiFi is using.
    // If you are on iOS, use localhost instead of your IP address.
    // NOTE: Before you push changes to github, remove your IP address as it just isn't needed, everyone will just
    //       user their own.
    let ip = '192.168.0.10';
    Meteor.connect(`ws://${ip}:3000/websocket`)
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
  input: {
    paddingHorizontal: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
