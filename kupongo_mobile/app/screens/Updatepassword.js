/**
 * Update Password
 */

import React, {Component} from 'react';
import Meteor from 'react-native-meteor';
import {IP} from './../config/constants';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput
} from 'react-native';


export default class Login extends Component {
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
              placeholder="Enter Current Password"
              ref="passwordinput"
              name="password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
          />
          <TextInput
              style={styles.input}
              placeholder="Enter New Password"
              ref="newPasswordinput"
              name="newPassword"
              onChangeText={(text) => this.setState({newPassword: text})}
              secureTextEntry={true}
          />
          <Button
              onPress={() => {
                this.update();
              }}
              title="Submit"
          />
        </View>
    );
  }
  update() {
    const email = this.state.email;
    const password = this.state.password;
    const newPassword = this.state.newPassword;
    this.props.navigation.navigate('Home', {
          user: {
            _id: 'asdf',
            couponList: new Set()
          }
        }
    );

  Meteor.call('updatePassword', email, password, newPassword, (err, result) =>{
    if(result===true){
      this.props.navigation.navigate('Home', {
            user: {
              _id: 'asdf',
              couponList: new Set()
            }
          }
      );
    } else{
      this.setState({email: ''});
      this.setState({password: ''});
      this.setState({newPassword: ''});
      //Figure out how to clear the TextInput
      alert("Email or current password incorrect");
      this.props.navigation.navigate('UpdatePassword', {
            user: {
              _id: 'asdf',
              couponList: new Set()
            }
          }
      );
    }
  });

  }
  componentWillMount() {
    // Make sure you run "npm run start" on the kupongo project so the server is up.
    // This connects to that Meteor server. Once the AWS server is up, replace the ip address with the url of the server.
    // If you are on Android, find your network IP address, the one which your WiFi is using.
    // If you are on iOS, use localhost instead of your IP address.
    // NOTE: Before you push changes to github, remove your IP address as it just isn't needed, everyone will just
    //       user their own.
    Meteor.connect(`ws://${IP}:3000/websocket`);
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
