import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { Session } from 'meteor/session';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastname: '',
            email: '',
            companyName: '',
            password: '',
            phoneNumber: ''
        }
    }

    render() {
        return (
            <div>
                <form className="registerForm">
                    <div className="registerContainer">
                        <label className="regLabel" id="emailLabel" htmlFor="email"><b>Email: </b></label>
                        <input className="textInput" type="text" ref="emailInput"
                            placeholder="Email" name="email">
                        </input><br />

                        <label className="regLabel" id="companyName" htmlFor="text"><b>Company Name: </b></label>
                        <input className="textInput" type="text" ref="companyNameInput"
                            placeholder="Company Name" name="companyName">
                        </input><br />

                        <label className="regLabel" id="firstNameLabel" htmlFor="text"><b>First name: </b></label>
                        <input className="textInput" type="text" ref="firstNameInput"
                            placeholder="First name" name="firstName">
                        </input><br />

                        <label className="regLabel" id="lastNameLabel" htmlFor="text"><b>Last name: </b></label>
                        <input className="textInput" type="text" ref="lastNameInput"
                            placeholder="Last name" name="lastName">
                        </input><br />

                        <label className="regLabel" id="phoneNumberLabel" htmlFor="text"><b>Phone number: </b></label>
                        <input className="textInput" type="text" ref="phoneNumberInput"
                            placeholder="Phone number" name="phoneNumber">
                        </input><br />

                        <label className="regLabel" id="passwordLabel" htmlFor="password"><b>Password: </b></label>
                        <input className="textInput" type="password" ref="passwordInput"
                            placeholder="Password" name="password">
                        </input><br />

                        <button className="regButton" type="submit" onClick={this.handleRegister.bind(this)}>Register</button>
                    </div>
                </form>
            </div>
        );
    }

    //Register button clicked
    handleRegister(event) {
        event.preventDefault();

        // Get entered information from form
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const companyName = ReactDOM.findDOMNode(this.refs.companyNameInput).value.trim();
        const firstName = ReactDOM.findDOMNode(this.refs.firstNameInput).value.trim();
        const lastName = ReactDOM.findDOMNode(this.refs.lastNameInput).value.trim();
        const phoneNumber = ReactDOM.findDOMNode(this.refs.phoneNumberInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

        const concatCompanyName = companyName.replace(/\s/g, '');

        const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/;
        const minLengthPassword = 12;
        const lengthPhoneNumber = 10;

        //If any field is empty throw an error
        if (email == '' || companyName == '' || firstName == '' || lastName == '' || phoneNumber == '' || password == '') {
            //Throw error
            console.log("One or more fields are blank.");
            alert("Please fill in the blanks.");
            // Clear form
        } else {
            //Check if password or phonenumber are minimum length
            if (password.length < minLengthPassword || phoneNumber.length !== lengthPhoneNumber) {
                //Throw error
                console.log("Pasword or phonenumber are not minimum length.");
                alert("Password must be AT LEAST 12 character long and phonenumber must be EXACTLY 10 characters long.");
                ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
                ReactDOM.findDOMNode(this.refs.phoneNumberInput).value = '';
            } else {
                //Check if password has at lest one special character and one special number
                if (!regularExpression.test(password)) {
                    //Throw error
                    console.log("Password needs one special character and one upper case.");
                    alert("Passwords MUST contain AT LEAST one special character and one upper case character.");
                    ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
                } else {
                    if (!(email.indexOf('@') >= 0)) {
                        //Email is not email address
                        console.log("Incorrect email entered.");
                        alert("Incorrect email address entered.");
                        ReactDOM.findDOMNode(this.refs.emailInput).value = '';
                    } else {
                        if (!(email.indexOf(concatCompanyName) >= 0)) {
                            //Email and company name do not match
                            console.log("Company name and company email do not match.");
                            alert("Company email and company name do not match.");
                            ReactDOM.findDOMNode(this.refs.emailInput).value = '';
                            ReactDOM.findDOMNode(this.refs.companyNameInput).value = '';
                        } else {
                            //Everything passes so move forward
                            //Add user information and hashed password to database
                            Meteor.call('register', email, companyName, password, firstName, lastName, phoneNumber, (err, result) => {
                              if(result) {
                                  // Clear form
                                  ReactDOM.findDOMNode(this.refs.emailInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.companyNameInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.firstNameInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.lastNameInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.phoneNumberInput).value = '';

                                  Meteor.call('sendEmail', email);

                                  console.log("register form submitted");

                                  Session.set('isAuthorized', true);

                                  // Redirect
                                  this.props.history.push({
                                    pathname: '/home',
                                    state: {
                                        userInfo: result,
                                    }
                                  })
                              } else {
                                  alert("Account is already active.");
                                  ReactDOM.findDOMNode(this.refs.emailInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.companyNameInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.firstNameInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.lastNameInput).value = '';
                                  ReactDOM.findDOMNode(this.refs.phoneNumberInput).value = '';
                              }

                            });

                        }
                    }
                }
            }
        }
    }
}

export default withRouter(Register);
