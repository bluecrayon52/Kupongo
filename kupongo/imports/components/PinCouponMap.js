/**
 * Component that handles pinning coupons into the map.
 */
import React, {Component} from 'react';
// import mapsToken from '../config/passwords';
import PinMap from './PinMap';
import Coupon from '../api/Coupon';

class PinCouponMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pins: this.props.pins
    };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
        <PinMap
            {...this.props}
            markersDraggable={true}
            onClick={this.handleClick.bind(this)}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXRaZ7FEf_fTve2WERilxDy00V-JBmiYA"
            containerElement={<div className="mapContainer"/>}
            mapElement={<div style={{height: `100%`}}/>}
        />
    );
  }

  handleClick(event) {
    if (this.props.selectedTemplate === null) {
      return;
    }
    this.props.addPin(
        new Coupon({
          template: this.props.selectedTemplate,
          clicked: false,
          centerLat: event.latLng.lat(),
          centerLong: event.latLng.lng()
        }));
  }

}

export default PinCouponMap;
