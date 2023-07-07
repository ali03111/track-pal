/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  LogBox,
  StatusBar,
  Platform,
  NativeEventEmitter,
} from 'react-native';
import StackNavigatior from './src/Navigation/navigation';
import {logoScreen} from './src/Assets';
import {Settings} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import TelematicsSdk from 'react-native-telematics';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import useReduxStore from './src/Hooks/UseReduxStore';
import Overlay from './src/Components/Overlay';

const PlatformPer = Platform.select({
  ios: [
    PERMISSIONS.IOS.MOTION,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.IOS.LOCATION_ALWAYS,
    // PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
  ],
  android: [
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
  ],
});
const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const {getState, dispatch} = useReduxStore();
  const {isloading} = getState('isloading');
  useEffect(() => {
    /**
     * Initialize the sdk
     */
    (function initializeSDK() {
      Settings.initializeSDK();
    })();

    /**
     * Set app id
     */

    Settings.setAppID('1254157088825041');
  }, []);

  const telematicsSDK = async () => {
    await TelematicsSdk.initialize();
    await requestMultiple(PlatformPer);
    await checkMultiple(PlatformPer);
    var deviceToken = await DeviceInfo.getUniqueId();
    console.log('TelematicsSdk', deviceToken);
    const isGranted = await TelematicsSdk.enable(deviceToken);
    // createTelematicUser(deviceToken);
    // Get all future tags
    // const result = await TelematicsSdk.addFutureTrackTag(
    //   'Future tag name',
    //   'Future tag source',
    // );

    console.log('isGranted', isGranted);
    // iOS specific:
    // // Get an event for low power mode enabled
    // const eventEmitter = new NativeEventEmitter(TelematicsSdk);
    // const emitter = eventEmitter.addListener('onLowPowerModeEnabled', () => {
    //   console.log('Low power enabled');
    // });
    // // Don't forget to remove listener
    // emitter.remove();
    // const status = await TelematicsSdk.getStatus();
  };
  // const {isloading} = getState('isloading');
  const time = () => {
    return 2000;
  };

  const useEffectFun = () => {
    telematicsSDK();
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'ViewPropTypes will be removed from React Native',
      'Settings is not yet supported on Android',
      'ViewPropTypes will be removed',
      "exported from 'deprecated-react-native-prop-types'.",
      'Sending...',
      'Non-serializable values were found in the navigation state',
    ]);
    LogBox.ignoreAllLogs(true);
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
    GoogleSignin.configure({
      webClientId:
        '1005053076444-mgrhj94e5bcv1a937pc07914jmevu2gv.apps.googleusercontent.com',
    });
  };

  useEffect(useEffectFun, []);

  let Splash_Screen = (
    <ImageBackground
      source={logoScreen}
      style={styles.SplashScreen_RootView}></ImageBackground>
  );

  return (
    <>
      {isloading && <Overlay />}
      <StatusBar
        hidden={isVisible}
        backgroundColor={Platform.OS == 'ios' ? 'white' : '#F2F2F2'}
        barStyle={'dark-content'}
      />
      {/* {enableLatestRenderer()} */}
      {isVisible === true ? Splash_Screen : <StackNavigatior />}
      {/* <StackNavigatior />; */}
    </>
  );
};

const styles = StyleSheet.create({
  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default App;
