import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';

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

        console.log("register form submitted");

        // Get entered information from form
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const companyName = ReactDOM.findDOMNode(this.refs.companyNameInput).value.trim();
        const firstName = ReactDOM.findDOMNode(this.refs.firstNameInput).value.trim();
        const lastName = ReactDOM.findDOMNode(this.refs.lastNameInput).value.trim();
        const phoneNumber = ReactDOM.findDOMNode(this.refs.phoneNumberInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

        //If new user add to database
        Meteor.call('register', email, companyName, password, firstName, lastName, phoneNumber);
        // Clear form
        ReactDOM.findDOMNode(this.refs.emailInput).value = '';
        ReactDOM.findDOMNode(this.refs.companyNameInput).value = '';
        ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
        ReactDOM.findDOMNode(this.refs.firstNameInput).value = '';
        ReactDOM.findDOMNode(this.refs.lastNameInput).value = '';
        ReactDOM.findDOMNode(this.refs.phoneNumberInput).value = '';

      // Redirect
      this.props.history.push('/home')
    }
}

export default withRouter(Register);
