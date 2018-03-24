/**
 * Servers to just render the main app from app/
 */

import React, { Component } from 'react';
import Kupongo from './app/router';

export default class App extends Component {
  render() {
    return (
        <Kupongo/>
    );
  }
}

