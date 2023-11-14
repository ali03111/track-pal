/**
 * @format
 */

import {AppRegistry, Text, TextInput, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/Reducer';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import message from '@react-native-firebase/messaging';
import {types} from './src/Redux/types';
import NavigationService from './src/Services/NavigationService';

const TrackPal = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <FlashMessage position="top" />
      <App />
    </PersistGate>
  </Provider>
);

message().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  const notificationData = JSON.parse(remoteMessage.data.payload);

  const isRoute = Boolean(notificationData.is_route);

  const isInvitation = Boolean(notificationData.route == 'InvitationScreen');

  const getNameFunc = NavigationService.getCurrentRoute();
  const routeName = getNameFunc?.getCurrentRoute()?.name;

  const storeObj = {
    InvitationScreen: types.addNotiInvitation,
    GeneralScreen: types.addNotification,
    MapAndChatScreen: types.addChatNoification,
  };

  isRoute &&
    routeName != 'InvitationScreen' &&
    store.dispatch({
      type: storeObj[notificationData.route],
      payload: notificationData,
    });

  // store.dispatch(setNotificationLength(remoteMessage));
});

//ADD this
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

if (View.defaultProps == null) {
  View.defaultProps = {};
  View.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => TrackPal);
