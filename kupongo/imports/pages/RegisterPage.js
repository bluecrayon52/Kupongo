/*
Register page for new users
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import '../css/Register.css';
import Register from '../components/Register'

class RegisterPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div><Register/></div>
        );
    }
}

export default withTracker(() => {
    //MongoDB subscription to User
    Meteor.subscribe('User');
    return {

    };
})(RegisterPage);