/**
 * Servers to just render the main app from app/
 */

import React, {Component} from 'react';
import Kupongo from './app/router';
import {KupongoMain} from './app/router';
import {isSignedIn, onSignOut} from './app/config/auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  loginUser(userInfo) {
    // TODO(david): Make this use AsyncStorage to remember the user was logged in.
    this.setState({
      isLoggedIn: true,
      userInfo: userInfo,
    });
  }

  logoutUser() {
    onSignOut().then(() => this.setState({
      isLoggedIn: false,
    }));
  }

  componentDidMount() {
    isSignedIn().then(res => this.setState({
      isLoggedIn: res !== false,
      userInfo: res,
    }));
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

