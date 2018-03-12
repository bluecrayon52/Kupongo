import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div>
                <h1 className="loginTitle">Kupongo Pro</h1>
                <form className="loginForm">
                    <div className="loginContainer">
                        <label id="emailLabel" htmlFor="email"><b>Email: </b></label>
                        <input className="textInput" type="text" ref="emailInput"
                            placeholder="Enter Email" name="email">
                        </input><br />

                        <label id="passwordLabel" htmlFor="password"><b>Password: </b></label>
                        <input className="textInput" type="password" ref="passwordInput"
                            placeholder="Enter Password" name="password">
                        </input><br />

                        <button className="loginButton" onClick={this.handleLoginButton.bind(this)}>
                            Login
                        </button><br />
                        <button className="loginButton" onClick={this.handleRegisterButton.bind(this)}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    //Login button clicked
    handleLoginButton(event) {
        event.preventDefault();

        // Get entered information from form
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

        const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        const minLengthPassword = 12;

        //Test if password and email conditions are met
        /*if (!regularExpression.test(password) || !(email.indexOf('@') >= 0) || (password.length < minLengthPassword)) {
            //Throw error
            console.log("incorrect password or email.");
            alert("Incorrect password or email entered.");
        } else {
            //BUG STARTS HERE
            //Check if user is already registered or not
            Meteor.call('login', email, password, function (error, result) {
                if (error) {
                    alert(error);
                } else {
                    // Clear form
                    ReactDOM.findDOMNode(this.refs.emailInput).value = '';
                    ReactDOM.findDOMNode(this.refs.passwordInput).value = '';

                    console.log("login form submitted");
                    this.props.history.push('/home')
                }
            });
        }*/
        //Route to home page until bug is fixed
        this.props.history.push('/home');
    }

    //Register button clicked
    handleRegisterButton(event) {
        this.props.history.push('/register');
    }
}

export default withRouter(Login);