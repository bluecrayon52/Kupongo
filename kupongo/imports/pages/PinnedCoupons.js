/**
 * Page to view the pins that have been placed on the map.
 */
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {CouponDB} from '../api/Coupon';
import '../css/PinnedCoupons.css';
import PinMap from '../components/PinMap';
import Header from '../components/Header';

class PinnedCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: this.props.pins
    };
  }

  render() {
    return (
        <div>
          <Header/>
          <h1>View pinned coupons</h1>
          <p>Below are your currently pinned coupons.</p>
          <div className="mapViewContainer">

            <PinMap
                pins={this.state.pins}
                markersDraggable={false}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXRaZ7FEf_fTve2WERilxDy00V-JBmiYA"
                containerElement={<div className="pinnedMapContainer"/>}
                mapElement={<div style={{height: `100%`}}/>}
            />

          </div>
          <button>Edit Pinned Coupons</button>
        </div>
    );
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      pins: newProps.pins || this.state.pins
    });
  }

}

export default withTracker(() => {
  Meteor.subscribe('Coupon');
  return {
    pins: CouponDB.find({
      // TODO(david): Change to look for current user's company name/id
      company: 'Coke'
    }).fetch()
  };
})(PinnedCoupons);
