import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Enter your email and new password.</h1>
                <form className="resetForm">
                    <div className="loginContainer">
                        <label id="emailLabel" htmlFor="email"><b>Email: </b></label>
                        <input className="textInput" type="text" ref="emailInput"
                            placeholder="Email" name="email">
                        </input><br />

                        <label id="passwordLabel" htmlFor="password"><b>Password: </b></label>
                        <input className="textInput" type="password" ref="passwordInput"
                            placeholder="Password" name="password">
                        </input><br />

                        <button className="loginButton" onClick={this.handlePasswordRecovery.bind(this)}>
                            Update password
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    handlePasswordRecovery(event) {
        event.preventDefault();

        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();
        Meteor.call('resetLostPassword', email, password, (err, result) => {
            if(result == true) {
                console.log("Password reset successful.");
                this.props.history.push('/');
            } else {
                console.log("Password reset not successful.");
            }
        });
    }
}

export default withTracker(() => {
    //MongoDB subscription to User
    Meteor.subscribe('User');
    return {

    };
})(ResetPassword);