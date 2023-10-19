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
import AwesomeAlert from 'react-native-awesome-alerts';
import {Colors} from './src/Theme/Variables';
import {alertFalse} from './src/Redux/Action/isAlertAction';
import API from './src/Utils/helperFunc';
import {changeMemberStatusUrl} from './src/Utils/Urls';
import {onEndTrip} from './src/Services/FireBaseRealTImeServices';
import {loadingFalse, loadingTrue} from './src/Redux/Action/isloadingAction';
import {hp, wp} from './src/Config/responsive';
import {Touchable} from './src/Components/Touchable';
import {TextComponent} from './src/Components/TextComponent';

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
  const {isAlert} = getState('isAlert');
  const {tripId, tripOwnerID} = getState('islocationShare');
  const {isLogin, userData} = getState('Auth');

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
    console.log(
      'isLoginisLoginisLoginisLoginisLoginisLoginisLoginisLoginisLoginisLoginisLoginisLoginisLogin',
      isLogin,
    );
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
    console.log('kjasdbchjsvdchvshdcsd', screenRoute);
    NavigationService.navigate(screenRoute.route);
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
      {isAlert && (
        <Overlay
          childern={
            <View style={styles.actionViewStyle}>
              <TextComponent text={'Are You!'} styles={styles.modalTitle} />
              <TextComponent
                text={'Do you want to end this trip?'}
                styles={styles.modalMsg}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp('70'),
                }}>
                <Touchable
                  onPress={() => dispatch(alertFalse())}
                  style={styles.cancelButtonStyle}
                  children={
                    <TextComponent
                      text={'Cancel'}
                      styles={{color: Colors.black}}
                    />
                  }
                />
                <Touchable
                  onPress={async () => {
                    dispatch(alertFalse());
                    const {ok, data} = await API.post(changeMemberStatusUrl, {
                      status: 2,
                      id: tripId,
                    });
                    console.log('dfsdfsdfsdfsdfsdffd', data);
                    if (ok) {
                      dispatch(loadingTrue());
                      onEndTrip({tripId, tripOnnwerID: tripOwnerID, userData});
                      dispatch(loadingFalse());
                      NavigationService.goBack();
                    }
                  }}
                  style={styles.confirmButtonStyle}
                  children={
                    <TextComponent
                      text={'Confirm'}
                      styles={{color: Colors.white}}
                    />
                  }
                />
              </View>
            </View>
          }
        />
      )}
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
  actionViewStyle: {
    width: wp('80'),
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('2'),
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: hp('2.5'),
  },
  modalMsg: {
    color: Colors.gray,
    fontSize: hp('1.8'),
    marginBottom: hp('3'),
  },
  cancelButtonStyle: {
    width: wp('33'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: hp('5'),
    borderColor: Colors.primaryColor,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  confirmButtonStyle: {
    width: wp('33'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    height: hp('5'),
    borderRadius: 8,
    alignSelf: 'center',
    // marginTop: hp('1'),
  },
  modalCancelBtnText: {
    fontSize: hp('1.8'),
    color: '#212759',
  },
  modalcConfirmBtnText: {
    fontSize: hp('1.8'),
  },
});

export default App;
