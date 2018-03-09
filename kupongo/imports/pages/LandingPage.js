/*
Landing page for new or returning users
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import '../css/Login.css';
import Login from '../components/Login'

class LandingPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Login />
            </div>
        );
    }
}

export default withTracker(() => {
    //MongoDB subscription to User
    Meteor.subscribe('User');
    return {

    };
})(LandingPage);