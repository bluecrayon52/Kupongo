/**
 * Initial screen to login users.
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


export default class Login extends Component {
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
            To get started, login.
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
              placeholder="Password"
              ref="passwordinput"
              name="password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
          />

          <Button
              onPress={() => {
                this.processLogin();
              }
              }
              title="Login"
          />

          <Text style={{color: 'green'}}
                onPress={() => this.props.navigation.navigate('Register')}>
            Don't have an Account? Sign up !
          </Text>

        </View>
    );
  }

  processLogin() {
    const email = this.state.email;
    const password = this.state.password;
    /* Re-route this to meteor register server when it works */
    this.props.screenProps.onLogin({
      user: {
        _id: 'asdf',
        couponList: new Set()
      }
    });

    /*
    Meteor.call('login', email, password, (err, result) => {
      if (result === true) {
        this.props.navigation.navigate('Home', {
              user: {
                _id: 'asdf',
                couponList: new Set()
              }
            }
        );
      }
      else {
        alert("Incorrect information entered.");
        this.setState({email: ''});
        this.setState({password: ''});
        //figure out how to clear fields
        this.props.navigation.navigate('Main', {
              user: {
                _id: 'asdf',
                couponList: new Set()
              }
            }
        );
      }
    });
    */
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
  input: {
    paddingHorizontal: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
