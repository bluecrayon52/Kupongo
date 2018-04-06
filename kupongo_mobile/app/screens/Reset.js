/**
 * Reset password for customer that forget password
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
class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: 'Not pressed',
      newPassword: ''
    }
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Kupongo!
          </Text>
          <Text style={styles.instructions}>
            Update your Password
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
              placeholder="Enter New Password"
              ref="password"
              name="password"
	      secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
          />


          <Button
              onPress={() => {
                this.reset();
              }}
              title="Submit"
          />
        </View>
    );
  }
  reset() {
    const email = this.state.email;
    const password = this.state.password;
    const minLengthPassword = 12;
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/;''
    if (password.length < minLengthPassword){
      console.log("Pasword not minimum length.");
              alert("Password must be AT LEAST 12 character long");
} else{
  if(!regularExpression.test(password)){
    console.log("Password needs one special character and one upper case.");
    alert("Passwords MUST contain AT LEAST one special character and one upper case character.");
  } else if (!regularExpression.test(password)) {
          console.log("Password must have at least one special character and one number.");
          alert("Password must have at least one special character and one number.");
        }
        else{
      Meteor.call('resetLostPassword', email, password, (err, result) =>
  {
          if (result) {
            console.log("Password reset successful");
            this.props.navigation.navigate('Main');
          }
          else {
            alert("Failed to reset password.");
            this.props.navigation.navigate('Main');
          }
        });

  }
}

  }
  componentWillMount() {
    // Make sure you run "npm run start" on the kupongo project so the server is up.
    // This connects to that Meteor server. Once the AWS server is up, replace the ip address with the url of the server.
    // If you are on Android, find your network IP address, the one which your WiFi is using.
    // If you are on iOS, use localhost instead of your IP address.
    // NOTE: Before you push changes to github, remove your IP address as it just isn't needed, everyone will just
    //       user their own.
    let ip = 'localhost';
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
    width: 160,
  }
});

export default Reset;
