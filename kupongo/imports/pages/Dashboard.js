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
import Popup from 'react-popup';
import {CouponDB} from '../api/Coupon';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            monitoring: this.props.monitoring || [],
            selectedCoupon: null
        };
    }

    componentWillMount() {
        if (Session.equals('isAuthorized', true)) {
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
                <Popup />
                <HomePage
                monitor={this.state.monitoring}
                selectedCoupon={this.state.selectedCoupon}
                onSelectCoupon={this.onSelectCoupon.bind(this)}
                userInfo={this.props.location.state.userInfo}
                />
            </div>
        );
    }

    onSelectCoupon(coupon) {
        this.setState({
            selectedCoupon: coupon,
            monitoring: this.state.monitoring,
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            monitoring: newProps.monitoring || this.state.monitoring
        });
    }
}

export default withTracker(() => {
    Meteor.subscribe('Coupon');
    return {
        //Temporary data
        monitoring: CouponDB.find({
            companyName: 'Coke'
        }).fetch()
    };
})(Dashboard);