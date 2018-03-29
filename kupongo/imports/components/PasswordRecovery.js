import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

class PasswordRecovery extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Enter your email to recover your password.</h1>
                <form className="recoverForm">
                    <div className="loginContainer">
                        <label id="emailLabel" htmlFor="email"><b>Email: </b></label>
                        <input className="textInput" type="text" ref="emailInput"
                            placeholder="Email" name="email">
                        </input><br />

                        <button className="loginButton" onClick={this.handlePasswordRecovery.bind(this)}>
                            Send email
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    handlePasswordRecovery(event) {
        event.preventDefault();

        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        Meteor.call('recoverPasswordEmail', email);
        console.log("Email sent.");
        this.props.history.push('/');
    }
}

export default withTracker(() => {
    //MongoDB subscription to User
    Meteor.subscribe('User');
    return {

    };
})(PasswordRecovery);