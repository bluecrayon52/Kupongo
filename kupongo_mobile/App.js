/**
 * Servers to just render the main app from app/
 */

import React, {Component} from 'react';
import Kupongo from './app/router';
import {KupongoMain} from './app/router';
import {isSignedIn, onSignOut} from './app/config/auth';
import Meteor, {createContainer} from 'react-native-meteor';
import {IP} from './app/config/constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  loginUser(userInfo) {
    Meteor.call('getUserInfo', userInfo._id, (err, result) => {
      console.log(err, result);
      if (err) {
        this.setState({
          isLoggedIn: false
        });
      } else {
        this.setState({
          isLoggedIn: true,
          userInfo: result,
        });
      }
    });
  }

  logoutUser() {
    onSignOut().then(() => this.setState({
      isLoggedIn: false,
    }));
  }

  componentDidMount() {
    Meteor.connect(`ws://${IP}:3000/websocket`);
    isSignedIn().then(res => {
      console.log(res);
      Meteor.call('getUserInfo', res._id, (err, result) => {
        console.log(err, result);
        if (err) {
          this.setState({
            isLoggedIn: false,
            userInfo: res,
          });
        } else {
          this.setState({
            isLoggedIn: true,
            userInfo: result,
          });
        }
      });
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
          <KupongoMain
              screenProps={{
                userInfo: this.state.userInfo,
                onLogout: this.logoutUser.bind(this)
              }}
          />
      );
    } else {
      return (
          <Kupongo
              screenProps={{
                onLogin: this.loginUser.bind(this)
              }}
          />
      );
    }
  }
}

