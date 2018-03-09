/*
Home page for logged in users
*/
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import '../css/HomePage.css';
import HomePage from '../components/HomePage'
import Header from '../components/Header';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <HomePage/>
            </div>
        );
    }
}

export default withTracker(() => {
    //MongoDB subscription to User
    Meteor.subscribe('User');
    return {

    };
})(Dashboard);