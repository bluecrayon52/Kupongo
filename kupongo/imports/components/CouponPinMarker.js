/**
 * Component that handles displaying coupons for the business to pin in the map.
 */
import React, {Component} from 'react';
import {Marker, InfoWindow} from 'react-google-maps';
import '../css/CouponPinMarker.css';

class CouponPinMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  render() {
    // TODO: Change to compare IDs instead.
    let icon = this.props.pin.template === this.props.selectedTemplate ? 'assets/highlighted_coupon.png' : 'assets/coupon_icon.png';
    return (
        <Marker
            onClick={() => {
              this.setState({clicked: true})
            }}
            draggable={true}
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
              <div className="templateTitle">
                <p>{this.props.pin.title}</p>
              </div>
              <p>{this.props.pin.description}</p>
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
