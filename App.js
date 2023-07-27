/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  LogBox,
  StatusBar,
  Platform,
  NativeEventEmitter,
  AppState,
} from 'react-native';
import StackNavigatior from './src/Navigation/navigation';
import {logoScreen} from './src/Assets';
import {Settings} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
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
import {fcmService} from './src/Services/Notifications';
import {fcmRegister} from './src/Redux/Action/AuthAction';
import NavigationService from './src/Services/NavigationService';

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
  const {isLogin} = getState('Auth');

  const appState = useRef(AppState.currentState);

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

  useEffect(() => {
    /* It's a function that registers the device to receive push notifications. */
    if (isLogin)
      setTimeout(() => {
        fcmService.register(onRegister, onOpenNotification, appState.current);
      }, 5000);
    return () => {
      /* It's a function that unregisters the device from receiving push notifications. */
      if (isLogin) fcmService.unRegister();
    };
  }, [isLogin]);
  const onRegister = fcm_token => {
    console.log('fcm_token', Platform.OS, fcm_token);
    dispatch(fcmRegister(fcm_token));
  };

  const onOpenNotification = notify => {
    const screenRoute = JSON.parse(notify.data.payload);
    NavigationService.navigate('NotificationTabsScreen', {
      sendTo: screenRoute.route,
    });
  };

  const time = () => {
    return 2000;
  };

  const useEffectFun = () => {
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
