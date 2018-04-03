/**
 * Recover password
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
      pressed: 'Not pressed'
    }
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Kupongo!
          </Text>
          <Text style={styles.instructions}>
            Enter your email to recover your password
          </Text>
	<TextInput
              style={styles.input}
              placeholder="Email"
              ref="emailInput"
              name="email"
              onChangeText={(text) => this.setState({email: text})}
          />

          <Button
              onPress={() => {
                this.recover();
              }}
              title="Submit"
          />
        </View>
    );
  }
 recover() {
const email = this.state.email;
Meteor.call('mobileRecoverPasswordEmail', email);
        console.log("Email sent.");
        this.props.navigation.navigate('Main');
}
componentWillMount() {
  // Make sure you run "npm run start" on the kupongo project so the server is up.
  // This connects to that Meteor server. Once the AWS server is up, replace the ip address with the url of the server.
  // If you are on Android, find your network IP address, the one which your WiFi is using.
  // If you are on iOS, use localhost instead of your IP address.
  // NOTE: Before you push changes to github, remove your IP address as it just isn't needed, everyone will just
  //       user their own.
  let ip = '';
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    paddingHorizontal: 10,
    width: 115,
  }
});
