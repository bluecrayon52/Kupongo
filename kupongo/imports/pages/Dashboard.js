/*
Home page for logged in users
*/
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import '../css/HomePage.css';
import HomePage from '../components/HomePage'
import Header from '../components/Header';
import { Session } from 'meteor/session';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if(Session.equals('isAuthorized', true)) {
            console.log("User is authorized.")
        } else {
            console.log("User is not authorized.")
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}
                        userInfo={this.props.location.state.userInfo}
                />
                <HomePage
                    userInfo={this.props.location.state.userInfo}
                />
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