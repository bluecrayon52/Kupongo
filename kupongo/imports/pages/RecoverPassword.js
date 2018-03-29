/*
Recover password page
*/
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PasswordRecover from '../components/PasswordRecovery';

class RecoverPassword extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PasswordRecover history={this.props.history}/>
            </div>
        );
    }
}

export default withTracker(() => {
    //MongoDB subscription to User
    Meteor.subscribe('User');
    return {

    };
})(RecoverPassword);