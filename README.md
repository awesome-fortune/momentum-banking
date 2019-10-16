# Momentum banking demo

- A basic banking app built on Ionic and Angular

## Features
- Users can open new accounts and manage overdraft limits on existing accounts.
- Users can deposit and withdraw funds from existing accounts.

### Issues
- [@ionic-native/network](https://github.com/ionic-team/ionic-native/issues/3088) events not firing so we can't let the user know if
the app can't be used because of connectivity issues.

#### Prerequisites
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Android SDK](https://developer.android.com/studio)

#### Running the application
- `npm install`
- `ionic serve` to run the application in a bowser
- `ionic cordova emulate android` to run the app in an Android emulator