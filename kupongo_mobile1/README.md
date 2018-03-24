# Kupongo Mobile

Mobile application for Kupongo, meant for users to collect coupons
created by businesses.

# Development instructions

## Connecting to meteor server

In order to get access to the Meteor server functions and the MongoDB, you need
to tell the app to connect to the server. An example is found in
`app/screen/LiveCouponMap.js` in the function `componentWillMount()`.
You will see the line:

```javascript
    Meteor.connect('ws://192.168.X.X:3000/websocket')
```

Replace the `X.X` with your own IP address values. Now, when you start
the Meteor server from the `kupongo/` project, you will be connected
to the server and can call server functions just as you would in
the website. You will need to have this line of code in any screen that needs
to call Meteor functions or get data from MongoDB.


## Running on device

First, set up your device by following the [react native guide](https://facebook.github.io/react-native/docs/running-on-device.html)

Now once your device is ready, just run `sudo npm run android` and you'll
get the app installed on your phone and ready to use. For iOS, use
`react-native run-ios`.

## Seeing console.log()

On android, run `adb logcat | grep "ReactNativeJS"` in the terminal to see things
printed from the app. You can also try:

```bash
$ react-native log-ios
$ react-native log-android
```

See [react-native debugging guide](https://facebook.github.io/react-native/docs/debugging.html)
for more information.


