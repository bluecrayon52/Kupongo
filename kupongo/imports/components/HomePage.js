import React, { Component } from 'react';
import Popup from 'react-popup';
import ScrollArea from 'react-scrollbar';
import '../css/MonitoringContainer.css';
import { Meteor } from 'meteor/meteor';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.props.monitor = this.props.monitor || [];
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <div className="monitoringContainer">
                <h1>Welcome, {this.props.userInfo.firstName}!</h1>
                <p>Select a coupon for more details.</p>
                <ScrollArea
                    className="scrollArea"
                    style={{
                        height: '700px'
                    }}
                    smoothScrolling={true}
                    horizontal={false}
                >
                    {this.props.monitor.map((coupon, index) => {
                        let selected = (this.props.selectedCoupon && this.props.selectedCoupon._id === coupon._id) ? 'selected' : '';
                        let classes = `${selected} couponContainer `;
                        return (
                            <div className="singleCoupon" key={coupon._id}>
                                <div className={classes} onClick={() => this.props.onSelectCoupon(coupon)}>
                                    <div className="couponTitle">{coupon.title}</div>
                                    <p className="couponDescription">{coupon.description}</p>
                                </div>

                                <div className="couponTools">
                                    <button className="tool"
                                        onClick={() => {
                                            Popup.plugins().checkCoupon(coupon._id, (values) => {
                                            });
                                        }}
                                    >Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </ScrollArea>
            </div>
        );
    }
}

Popup.registerPlugin('checkCoupon', function (coupon, callback) {
    var quantity;
    Meteor.call('getCouponQuantity', coupon, (err, result) => {
        quantity = result;
    });
    Meteor.call('getCurrentCouponQuantity', coupon, (err, result) => {
        console.log(result);
        this.create({
            title: 'Coupons Left',
            content: "There are " + result + " coupon(s) remaining out of " + quantity,
            buttons: {
                right: [{
                    text: 'Close',
                    className: 'closeButton',
                    action: () => {
                        Popup.close();
                    }
                }]
            }
        });
    })
});

export default HomePage;