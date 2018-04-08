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
      // Check if this is being used on "view pinned" page.
      if (this.props.selectedPin) {
        icon = this.props.selectedPin._id === this.props.pin._id ? 'assets/highlighted_coupon.png' : 'assets/coupon_icon.png';
      }
    } else {
      icon = (this.props.pin.templateId === this.props.selectedTemplate._id
      || this.props.pin.templateId === this.props.selectedTemplate.templateId) ? 'assets/highlighted_coupon.png' : 'assets/coupon_icon.png';
    }
    return (
        <Marker
            onClick={() => {
              this.setState({clicked: true});
              if (this.props.onSelectPin) {
                this.props.onSelectPin(this.props.index);
              }
            }}
            draggable={this.props.markersDraggable}
            onDragEnd={this.updateLocation.bind(this)}
            position={{
              lat: this.props.pin.location.coordinates[1],
              lng: this.props.pin.location.coordinates[0]
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
              {this.props.pinnedView &&
                  <div>
                    {this.props.pin.currentQuantity} / {this.props.pin.quantity}
                  </div>
              }
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
    pin.location.coordinates = [event.latLng.lng(), event.latLng.lat()];

    this.props.onDragEnd(this.props.index, pin);
  }
}

export default CouponPinMarker;
