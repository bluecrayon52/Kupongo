/**
 * The component that abstracts the react-google-maps HOC GoogleMap object. Mainly use for coupon pinning.
 */
import React, {Component} from 'react';
import {GoogleMap, withGoogleMap} from 'react-google-maps';
import CouponPinMarker from './CouponPinMarker';

class PinMap extends Component {
  render() {
    let pins = this.props.pins || [];
    return (
        <GoogleMap
            onClick={this.props.onClick}
            defaultZoom={15}
            defaultCenter={{lat: 36.069827, lng: -79.809468}}
        >
          {pins.map((marker, index) => {
            return (
                <CouponPinMarker
                    {...this.props}
                    pin={marker}
                    index={index}
                />
            );
          })}
        </GoogleMap>
    );
  }
}

export default withGoogleMap(PinMap);
