/**
 * Handles rendering the Coupon callout.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';


class CouponCallout extends Component {
  render() {
    return (
        <MapView.Marker
            key={this.props.coupon._id}
            image={this.props.icon}
            coordinate={{
              latitude: this.props.coupon.location.coordinates[1],
              longitude: this.props.coupon.location.coordinates[0]
            }}
        >

          <MapView.Callout tooltip
                           onPress={() => {
                             // We can't have a button to collect in the callout since Android doesn't support
                             // that so we have to just detect if they tapped the window and check if
                             // they are nearby here.
                             if (this.props.coupon.nearUser)
                               this.props.collectCoupon(this.props.coupon);
                           }}
                           style={styles.calloutStyle}>
            {/* TODO(david): Style this better, looks boring right now. */}
            <View>
              <Text style={styles.calloutTitle}>{this.props.coupon.title}</Text>
              <Text style={styles.calloutDescription}>{this.props.coupon.description}</Text>
              <View style={styles.infoView}>
                <Text style={styles.infoText}>By {this.props.coupon.companyName}</Text>
                <Text
                    style={classifyExpiration(this.props.coupon.collectEndDate)}>{dateToString(this.props.coupon.collectEndDate)}</Text>
              </View>
              {this.props.coupon.nearUser &&
              <Text style={styles.collectMessage}>
                Tap window to collect!
              </Text>
              }
            </View>
          </MapView.Callout>
        </MapView.Marker>
    );
  }
}

// Utils functions
// TODO(david): Move to a utils file.
function dateToString(date) {
  return `Gone in ${differenceInDays(date, new Date())} days`;
}

function differenceInDays(date1, date2) {
  return Math.ceil(Math.abs(date2 - date1) / (1000 * 3600 * 24));
}

/**
 * Gives back an indication of how close the expiration date on the coupon is based on the provided date.
 * @param date
 */
function classifyExpiration(date) {
  const days = differenceInDays(date, new Date());

  // One week is okay.
  let style = {
    margin: 3,
    padding: 3,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    // color: '#898b15',
  };
  if (days < 5) {
    style.color = 'orange';
    if (days > 2) {
      style.color = '#c6ac49';
    } else if (days >= 0) {
      style.color = 'red';
    }
  }
  return style;
}

const styles = StyleSheet.create({
  infoView: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  infoText: {
    margin: 3,
    padding: 3,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  calloutStyle: {
    padding: 5,
    backgroundColor: '#fcfcfc',
    borderWidth: 3,
    borderColor: '#8f8f8f',
  },
  calloutTitle: {
    padding: 5,
    textAlign: 'center',
    color: '#474747',
    fontSize: 20,
    fontWeight: 'bold',
    borderStyle: 'dotted',
    borderBottomWidth: 2,
    borderBottomColor: 'green',
  },
  calloutDescription: {
    padding: 5,
    margin: 5,
    textAlign: 'center',
    fontSize: 13,
    color: '#646464',
  },
  collectMessage: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#29b55d',
  },
  couponIcon: {
    height: 20,
    width: 20,
  }
});


export default CouponCallout;
