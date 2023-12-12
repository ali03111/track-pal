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
import notifee, {
  EventType,
  AndroidLaunchActivityFlag,
} from '@notifee/react-native';

const TrackPal = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <FlashMessage position="top" />
      <App />
    </PersistGate>
  </Provider>
);

// notifee.onBackgroundEvent(async ({type, detail}) => {
//   const {notification} = detail;
//   console.log(
//     'notificationnotificationnotificatisdsdsonnoasdasdastificationnotificationnotification',
//     notification,
//     routeName,
//   );
//   let searchTerm = /invitation/;
//   let findWord = Boolean(searchTerm.test(notification.body));
//   const getNameFunc = NavigationService.getCurrentRoute();
//   const routeName = getNameFunc?.getCurrentRoute()?.name;

//   const storeObj = {
//     InvitationScreen: types.addNotiInvitation,
//     GeneralScreen: types.addNotification,
//     MapAndChatScreen: types.addChatNoification,
//   };

//   // isRoute &&
//   //   routeName != 'InvitationScreen' &&
//   //   store.dispatch({
//   //     type: storeObj[notificationData.route],
//   //     payload: notificationData,
//   //   });
//   findWord &&
//     routeName != 'InvitationScreen' &&
//     store.dispatch({
//       type: findWord ? types.addNotiInvitation : types.addNotification,
//       payload: notification,
//     });
//   const isPressed = Boolean(
//     type === EventType.ACTION_PRESS || type == EventType.PRESS,
//   );
//   // if (isPressed) onOpenNotification(notification);
//   // if (type !== 7) await this.setBadge();
// });

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
