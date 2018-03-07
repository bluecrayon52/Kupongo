import React, { Component } from 'react';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastname: '',
            email: '',
            password: '',
            phoneNumber: ''
        }
    }

    render() {
        return (
            <div>
                <form className="registerForm">
                    <div className="registerContainer">
                        <label id="emailLabel" htmlFor="email"><b>Email: </b></label>
                        <input type="text" ref="emailInput"
                            placeholder="Email" name="email">
                        </input><br />

                        <label id="firstNameLabel" htmlFor="text"><b>First name: </b></label>
                        <input type="text" ref="firstNameInput"
                            placeholder="First name" name="firstName">
                        </input><br />

                        <label id="lastNameLabel" htmlFor="text"><b>Last name: </b></label>
                        <input type="text" ref="lastNameInput"
                            placeholder="Last name" name="lastName">
                        </input><br />

                        <label id="phoneNumberLabel" htmlFor="text"><b>Phone number: </b></label>
                        <input type="text" ref="phoneNumberInput"
                            placeholder="Phone number" name="phoneNumber">
                        </input><br />

                        <label id="passwordLabel" htmlFor="password"><b>Password: </b></label>
                        <input type="password" ref="passwordInput"
                            placeholder="Password" name="password">
                        </input><br />

                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }

    //Register button clicked
    handleRegister(event) {
        event.preventDefault();

        console.log("register form submitted");

        // Get entered information from form
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();

        //Warn user if email has been used
        Meteor.call('ListOfUsers.checkUser', email, function (err, result) {
            if (result) {
                //Email/User is already registered
                alert('Email ' + email + ' is already taken!')
                // Clear form
                ReactDOM.findDOMNode(this.refs.emailInput).value = '';
                ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
                ReactDOM.findDOMNode(this.refs.firstNameInputInput).value = '';
                ReactDOM.findDOMNode(this.refs.lastNameInput).value = '';
                ReactDOM.findDOMNode(this.refs.phoneNumberInput).value = '';
            } else {
                //If new user add to database
                Meteor.call('ListOfUsers.register', email, password);
                // Clear form
                ReactDOM.findDOMNode(this.refs.emailInput).value = '';
                ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
                ReactDOM.findDOMNode(this.refs.firstNameInputInput).value = '';
                ReactDOM.findDOMNode(this.refs.lastNameInput).value = '';
                ReactDOM.findDOMNode(this.refs.phoneNumberInput).value = '';
            }
        });
    }
}

export default Register;