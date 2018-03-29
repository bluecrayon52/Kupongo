/*
Set new password page
*/
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import ResetPassword from '../components/ResetPassword';

class SetPassword extends Component {

    constructor(props) {
        super(props);
    }

    //TODO (Preston): Figure out how to send a user a token so only they can access this page.
    /*componentWillMount() {
        if(Session.equals('isAuthorized', true)) {
            console.log("User is authorized.")
        } else {
            console.log("User is not authorized.")
            this.props.history.push('/');
        }
    }*/

    render() {
        return (
            <div>
                <ResetPassword history={this.props.history}/>
            </div>
        );
    }
}

export default withTracker(() => {
    //MongoDB subscription to User
    Meteor.subscribe('User');
    return {

    };
})(SetPassword);