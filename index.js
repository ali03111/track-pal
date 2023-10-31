/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/Reducer';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import message from '@react-native-firebase/messaging';
import {types} from './src/Redux/types';

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

  const storeObj = {
    InvitationScreen: types.addNotiInvitation,
    GeneralScreen: types.addNotification,
    MapAndChatScreen: types.addChatNoification,
  };

  isRoute &&
    store.dispatch({
      type: storeObj[notificationData.route],
      payload: notificationData,
    });

  // store.dispatch(setNotificationLength(remoteMessage));
});

AppRegistry.registerComponent(appName, () => TrackPal);
