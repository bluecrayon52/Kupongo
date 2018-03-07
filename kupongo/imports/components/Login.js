import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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

                        <Link to="/home">
                        <button className="loginButton" type="submit">
                              Login
                        </button><br />
                        </Link>
                        <Link to="/register">
                        <button className="loginButton" type="submit">
                            Register
                        </button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }

    //TODO(Preston) Redirect to register page when register buton is clicked

    //Login button clicked
    handleSubmit(event) {
        event.preventDefault();

        console.log("login form submitted");

        // Get entered information from form
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

        Meteor.call('ListOfUsers.login', email, password);

        // Clear form
        ReactDOM.findDOMNode(this.refs.emailInput).value = '';
        ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
    }
}

export default Login;