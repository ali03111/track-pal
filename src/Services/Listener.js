import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NavigationService from './NavigationService';
import {store} from '../Redux/Reducer';
import {types} from '../Redux/types';

// export default listeners = (props) => {
export default Listeners = navigation => {
  if (global.notifListener) {
    return;
  }

  global.notifListener = messaging().onMessage(async remoteMessage => {
    __DEV__ &&
      console.log('on screen messages' + JSON.stringify(remoteMessage));
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

    PushNotification.localNotification({
      // Android Only Properties /
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      smallIcon: 'ic_notification',
      bigText: remoteMessage.notification?.body, // (optional) default: "message" prop
      subText: remoteMessage.notification?.body, // (optional) default: none`
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      group: 'products', // (optional) add group to message
      channelId: 'products',
      groupSummary: true, // (optional) set this notification to be the group summary for a group of Messages, default: false
      priority: 'max', // (optional) set notification priority, default: high
      visibility: 'public', // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS Messages appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting

      //   / iOS only properties /

      //   / iOS and Android properties /
      title: remoteMessage.notification?.title, // (optional)
      message: remoteMessage.notification?.body, // (required)
      userInfo: {...remoteMessage.data}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    });
  });

  // Handle messages when the app is in the background or terminated
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(remoteMessage, 'slsklsjdlkfjlskdjf2222');

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
    __DEV__ && console.log('Message handled in the background!', remoteMessage);

    // const clickAction = remoteMessage.notification?.android?.clickAction;

    // Navigate based on the clickAction or any custom data
    // if (clickAction === 'NotificationScreen') {
    //   navigation.navigate('NotificationScreen', {
    //     jobTitle: remoteMessage.notification?.body,
    //     jobRequestTitle: remoteMessage.notification?.title,
    //   });
    // }
  });

  // On notification open when app is in background
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(remoteMessage, 'slsklsjdlkfjlskdssssssjf');

    console.log(remoteMessage, 'slsklsjdlkfjlskdssssssjf');

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
    const clickAction = remoteMessage.notification?.android?.clickAction;

    // if (clickAction === 'NotificationScreen') {
    //   navigation.navigate('NotificationScreen', {
    //     jobTitle: remoteMessage.notification?.body,
    //     jobRequestTitle: remoteMessage.notification?.title,
    //   });
    // }
  });
  // Handle when the notification causes the app to open from the quit state
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      console.log(remoteMessage, 'slsklsjdlkfjlskdjf');
      if (remoteMessage) {
        const notificationData = JSON.parse(remoteMessage.data.payload);

        const isRoute = Boolean(notificationData.is_route);

        const isInvitation = Boolean(
          notificationData.route == 'InvitationScreen',
        );

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
        const clickAction = remoteMessage.notification?.android?.clickAction;

        // if (clickAction === 'NotificationScreen') {
        //   setTimeout(() => {
        //     navigation.navigate('NotificationScreen', {
        //       jobTitle: remoteMessage.notification?.body,
        //       jobRequestTitle: remoteMessage.notification?.title,
        //     });
        //   }, 4000);
        // }
      }
    })
    .catch(() => {});

  messaging().onNotificationOpenedApp(async remoteMessage => {
    __DEV__ &&
      console.log(
        'Notification caused app to open from background state:' +
          remoteMessage.notification,
      );

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
    // if (remoteMessage?.data?.screenName === 'Chats') {
    //   navigation.navigate('Chats', {
    //     isRead: remoteMessage.data?.isRead,
    //     title: remoteMessage?.data?.title,
    //   });
    // }
  });

  PushNotification.configure({
    // When the notification is received or opened
    onNotification: async notification => {
      __DEV__ && console.log('NOTIFICATION:', notification);
      const notificationData = JSON.parse(remoteMessage.data.payload);

      const isRoute = Boolean(notificationData.is_route);

      const isInvitation = Boolean(
        notificationData.route == 'InvitationScreen',
      );

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
      //   if (notification?.data?.screenName === 'NotificationScreen') {
      //     navigation.navigate('NotificationScreen', {
      //       jobTitle: notification?.body,
      //       jobRequestTitle: notification?.title,
      //     });
      //   }
      notification.finish(PushNotificationIOS.FetchResult.NewData);
    },

    // iOS permissions
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    requestPermissions: true,
  });

  // PushNotification.configure({
  //   // (optional) Called when Token is generated (iOS and Android)
  //   // (required) Called when a remote is received or opened, or local notification is opened
  //   onRegister: () => {
  //     _DEV_ && console.log('REGISTRED');
  //   },
  //   popInitialNotification: async notification => {
  //     _DEV_ && console.log('popInitialNotification:', notification);
  //   },
  //   onNotification: async notification => {
  //     _DEV_ && console.log('NOTIFICATION:', notification);
  //     // process the notification
  //     // (required) Called when a remote is received or opened, or local notification is opened
  //     notification.finish(PushNotificationIOS.FetchResult.NoData);

  //     if (notification?.data?.screenName === 'Chats') {
  //       navigation.navigate('Chats', {
  //         isRead: notification?.data?.isRead,
  //         title: notification?.data?.title,
  //       });
  //     }
  //   },

  //   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //   // IOS ONLY (optional): default: all - Permissions to register.
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },

  //   // Should the initial notification be popped automatically
  //   //default: true
  //   popInitialNotification: true,

  //   /**
  //    * (optional) default: true
  //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //    * - if not, you must call PushMessagesHandler.requestPermissions() later
  //    * - if you are not using remote notification or do not have Firebase installed, use this:
  //    *     requestPermissions: Platform.OS === 'ios'
  //    */
  //   requestPermissions: true,
  // });
};

// import messaging from "@react-native-firebase/messaging";
// import PushNotification from "react-native-push-notification";
// import PushNotificationIOS from "@react-native-community/push-notification-ios";

// export default listeners = () => {

// PushNotification.configure({

//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

// });
// }
