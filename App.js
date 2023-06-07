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
} from 'react-native';
import StackNavigatior from './src/Navigation/navigation';
import {logoScreen} from './src/Assets';
import {enableLatestRenderer} from 'react-native-maps';
import {Settings} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };

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

  // const {isloading} = getState('isloading');
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
      <StatusBar
        hidden={isVisible}
        // backgroundColor={Platform.OS == 'ios' ? 'white' : 'transparent'}
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
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
