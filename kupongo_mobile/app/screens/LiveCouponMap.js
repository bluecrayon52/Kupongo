/**
 * Screen where user can see live map of the coupons.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import {MAP_STYLE} from '../config/MapStyles';

import Meteor, {createContainer} from 'react-native-meteor';


// TODO(david): Move to a utils file and import this instead.
function distance(lat1, lon1, lat2, lon2) {
  let p = 0.017453292519943295;
  let c = Math.cos;
  let a = 0.5 -
      c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;
  return 12742 * Math.asin(Math.sqrt(a));
}

function toBox(region) {
  return [
    [region.longitude - (0.7 * region.longitudeDelta), region.latitude + (0.7 * region.longitudeDelta)],
    [region.longitude + (0.7 * region.longitudeDelta), region.latitude + (0.7 * region.longitudeDelta)],
    [region.longitude + (0.7 * region.longitudeDelta), region.latitude - (0.7 * region.longitudeDelta)],
    [region.longitude - (0.7 * region.longitudeDelta), region.latitude - (0.7 * region.longitudeDelta)],
    [region.longitude - (0.7 * region.longitudeDelta), region.latitude + (0.7 * region.longitudeDelta)],
  ];
}


class LiveCouponMap extends Component {
  constructor(props) {
    super(props);

    let latitudeDelta = 0.00052;
    let longitudeDelta = 0.00007;
    this.state = {
      region: {
        latitude: 36.0664528,
        longitude: -79.8101501,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
      },
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
      userLocation: {
        latitude: 36.0664528,
        longitude: -79.8101501,
      },
      selectedIcon: require('../../assets/selected_coupon.png'),
      couponIcon: require('../../assets/coupon.png'),
      user: this.props.navigation.state.params.user,
      coupons: []
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <MapView
              ref="map"
              showsUserLocation={true}
              minZoomLevel={15}
              onMapReady={this.mapReady.bind(this)}
              showsMyLocationButton={true}
              followUserLocation={true}
              style={styles.map}
              customMapStyle={MAP_STYLE}
              onRegionChangeComplete={this.regionChanged.bind(this)}
          >
            {this.state.coupons.map((coupon) => {
              const icon = coupon.nearUser ? this.state.selectedIcon : this.state.couponIcon;
              return (
                  <MapView.Marker
                      key={coupon._id}
                      image={icon}
                      coordinate={{latitude: coupon.location.coordinates[1], longitude: coupon.location.coordinates[0]}}
                  >

                    <MapView.Callout tooltip
                                     onPress={() => {
                                       // We can't have a button to collect in the callout since Android doesn't support
                                       // that so we have to just detect if they tapped the window and check if
                                       // they are nearby here.
                                       console.log('Call meteor to collect coupon here if they are nearby.');
                                       if (coupon.nearUser)
                                         this.collectCoupon(coupon);
                                     }}
                                     style={styles.calloutStyle}>
                      {/* TODO(david): Style this better, looks boring right now. */}
                      <View>
                        <Text style={styles.calloutTitle}>{coupon.title}</Text>
                        <Text style={styles.calloutDescription}>{coupon.description}</Text>
                        {coupon.nearUser &&
                        <Text style={styles.collectMessage}>
                          Tap window to collect!
                        </Text>
                        }
                      </View>
                    </MapView.Callout>
                  </MapView.Marker>
              );
            })}

            {/* Shows actual user location as our functions sees them, we can't get the coordinates of the blue
             marker the maps shows natively.
             TODO(david): Animate this so it smoothly moves to new location. */}
            <MapView.Marker
                pinColor={"#0000FF"}
                coordinate={this.state.userLocation}
            />
          </MapView>
        </View>
    );
  }

  collectCoupon(coupon) {
    Meteor.call('collectCoupon', this.state.user._id, coupon._id, (err, result) => {
      if (err) {
        // TODO(david): Send message to user saying coupon failed with a popup maybe.
        console.log(err);
      } else {
        // Remove coupon from map.
        let user = this.state.user;
        user.couponList.add(coupon._id);
        let coupons = this.state.coupons.filter((item) =>  coupon._id !== item._id);
        this.setState({ user: user, coupons: coupons });
      }
    });
  }

  mapReady() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.refs.map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta
      }, 2);
    });
  }

  regionChanged(region) {
    if (distance(this.state.region.latitude, this.state.region.longitude, region.latitude, region.longitude) < .010) {
      if (Math.abs(this.state.region.latitudeDelta - region.latitudeDelta) < 0.001 &&
          Math.abs(this.state.region.longitudeDelta - region.longitudeDelta) < 0.001) {
        return;  // Don't bother making server call if they only moved by a little bit.
      }
    }
    console.log('region changed');
    Meteor.call('updateCurrentLocation', this.state.user._id, region.latitude, region.longitude, (err, result) => {
      if (err)
        console.log(err);
    });
    Meteor.call('getCouponsIn', toBox(region), (err, coupons) => {
      coupons = coupons.filter((coupon) => !this.state.user.couponList.has(coupon._id));
      this.setState({
        coupons: coupons,
        region: region,
      }, () => {
        this.checkIfNearCoupons({
          coords: this.state.userLocation
        });
      });
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let newRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta
      };
      newRegion.latitude = position.coords.latitude;
      newRegion.longitude = position.coords.longitude;

      this.setState({
        region: newRegion,
        userLocation: {
          latitude: newRegion.latitude,
          longitude: newRegion.longitude
        }
      }, () => {
        Meteor.call('getCouponsIn', toBox(newRegion), (err, coupons) => {
          this.setState({
            coupons: coupons
          }, () => {
            this.checkIfNearCoupons({
              coords: this.state.userLocation
            });
          });
        });
      });
    });

    navigator.geolocation.watchPosition(this.checkIfNearCoupons.bind(this),
        (error) => console.log(error), {
          enableHighAccuracy: true,
          distanceFilter: .5,
        });
  }

  checkIfNearCoupons(position) {
    const newLat = position.coords.latitude;
    const newLng = position.coords.longitude;

    let coupons = this.state.coupons;
    coupons.forEach((coupon) => {
      let dist = distance(coupon.location.coordinates[1], coupon.location.coordinates[0], newLat, newLng);
      coupon.nearUser = dist < .0048;
    });

    this.setState({
      coupons: coupons,
      userLocation: {
        latitude: newLat,
        longitude: newLng
      }
    });
  }

  componentWillMount() {
    // Make sure you run "npm run start" on the kupongo project so the server is up.
    // This connects to that Meteor server. Once the AWS server is up, replace the ip address with the url of the server.
    // If you are on Android, find your network IP address, the one which your WiFi is using.
    // If you are on iOS, use localhost instead of your IP address.
    // NOTE: Before you push changes to github, remove your IP address as it just isn't needed, everyone will just
    //       user their own.
    let ip = '192.168.1.6';
    Meteor.connect(`ws://${ip}:3000/websocket`)
  }

  componentWillReceiveProps(props) {
    if (props.coupons) {
      let coupons = [...props.coupons];
      coupons.forEach((coupon) => {
        coupon.nearUser = false;
      });

      this.setState({
        coupons: coupons
      }, () => {
        this.checkIfNearCoupons({
          coords: this.state.userLocation
        });
      });
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  calloutStyle: {
    padding: 5,
    backgroundColor: '#fcfcfc',
  },
  calloutTitle: {
    padding: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  calloutDescription: {
    padding: 5,
    textAlign: 'center',
    fontSize: 15,
    color: '#646464',
  },
  collectMessage: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#29b55d',
  },
  couponIcon: {
    height: 20,
    width: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

 export default createContainer(() => {
 // TODO(david): Won't work without dummy user, insert a universal one.
 // For anyone wanting to see their pinned coupons in development, insert a user in your database and then add it
 // as a parameter here
 // let userId = '';
 // Meteor.subscribe('Coupon', userId);
 return {
 // TODO(david): Replace with server code to get redacted coupons within a region.
 // coupons: Meteor.collection('Coupon').find({})
 }
 }, LiveCouponMap);
