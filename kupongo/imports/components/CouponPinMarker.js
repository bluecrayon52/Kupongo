/**
 * Component that handles displaying coupons for the business to pin in the map.
 */
import React, {Component} from 'react';
import {Marker, InfoWindow} from 'react-google-maps';
import '../css/CouponPinMarker.css';
import CouponPreview from './CouponPreview';

class CouponPinMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  render() {
    let icon;
    if (this.props.selectedTemplate === null || this.props.selectedTemplate === undefined) {
      icon = 'assets/coupon_icon.png';
    } else {
      icon = (this.props.pin.templateId === this.props.selectedTemplate._id) ? 'assets/highlighted_coupon.png' : 'assets/coupon_icon.png';
    }
    return (
        <Marker
            onClick={() => {
              this.setState({clicked: true})
            }}
            draggable={this.props.markersDraggable}
            onDragEnd={this.updateLocation.bind(this)}
            position={{
              lat: this.props.pin.lat,
              lng: this.props.pin.lng
            }}
            icon={{
              url: icon,
              scaledSize: new google.maps.Size(30, 20)
            }}
        >
          { this.state.clicked &&
          <InfoWindow
              onCloseClick={() => this.setState({clicked: false})}
          >
            <div className="couponPinInfoWindow">
              <CouponPreview
                  coupon={this.props.pin}
              />
              <button
                  onClick={() => this.props.onRemovePin(this.props.index)}
              >Delete
              </button>
            </div>
          </InfoWindow>
          }
        </Marker>
    );
  }

  updateLocation(event) {
    let pin = this.props.pin;
    pin.lat = event.latLng.lat();
    pin.lng = event.latLng.lng();

    this.props.onDragEnd(this.props.index, pin);
  }
}

export default CouponPinMarker;
