/*
Home page for logged in users
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import '../css/HomePage.css';
import HomePage from '../components/HomePage'

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HomePage/>
            </div>
        );
    }
}

export default withTracker(() => {
    //MongoDB subscription to userList
    Meteor.subscribe('userList');
    return {

    };
})(Dashboard);