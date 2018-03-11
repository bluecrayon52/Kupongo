/**
 * Page to view the coupons that have been pinned on the map.
 */
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {CouponDB} from '../api/Coupon';
import '../css/PinnedCoupons.css';
import PinMap from '../components/PinMap';
import Header from '../components/Header';
import PinnedView from '../components/PinnedView';

class PinnedCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: this.props.pins,
      selectedPin: null
    };

  }

  render() {
    return (
        <div>
          <Header/>
          <h1>View pinned coupons</h1>
          <p>Below are your currently pinned coupons.</p>

          <div className="mapViewContainer">
            <PinnedView
              pinned={this.state.pins}
              selectedPin={this.state.selectedPin}
              onSelectPin={this.onSelectPin.bind(this)}
              
            />
            <PinMap
                pins={this.state.pins}
                markersDraggable={false}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXRaZ7FEf_fTve2WERilxDy00V-JBmiYA"
                containerElement={<div className="pinnedMapContainer"/>}
                mapElement={<div style={{height: `100%`}}/>}
            />

          </div>
        </div>
    );
  }

  onSelectPin(pin) {
    this.setState({
      selectedPin: pin
    });
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
      companyName: 'Something Inc.'
    }).fetch()
  };
})(PinnedCoupons);
