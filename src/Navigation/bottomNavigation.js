import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Platform, Dimensions, StyleSheet, Image} from 'react-native';
import * as Screens from '../Screens/index';
import {Colors} from '../Theme/Variables';
import {hp, wp} from '../Config/responsive';
import {
  home,
  home2,
  map,
  map2,
  notification,
  notification2,
  sendNotification,
  setting,
  setting2,
} from '../Assets';
import useReduxStore from '../Hooks/UseReduxStore';

globalStyles = {};
const isIOS = Boolean(Platform.OS == 'ios');

const Tab = createBottomTabNavigator();
function MybottomTabs() {
  const {getState} = useReduxStore();

  const {inviNotify} = getState('inviNotify');
  const {generalNotify} = getState('generalNotify');

  const inviNotifyStatus = Boolean(inviNotify.length > 0);
  // const genNotifyStatus = Boolean(generalNotify.length > 0);

  console.log(
    'inviNotifyinviNotifyinviNotify',
    Boolean(inviNotify.length > 0),
    inviNotify,
  );

  const tabarComponent = (
    activeImage,
    unActiveImage,
    ImageStyle,
    isDot,
    DotStyles,
  ) => {
    return {
      tabBarIcon: ({focused}) => (
        <View style={styles.tabarView}>
          {isDot && <View style={{...styles.dot, ...DotStyles}} />}
          <Image
            style={{...styles.imgstyle, ...ImageStyle}}
            source={focused ? activeImage : unActiveImage}
          />
        </View>
      ),
      title: '',
      tabBarLabelStyle: styles.tabarTitle,
    };
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'yellow',
        // tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: 'transparent',
        headerShown: false,
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarAllowFontScaling: true,
        tabBarItemStyle: {
          width: 'auto',
        },
        tabBarStyle: {
          height: isIOS ? hp('10') : hp('8'),
          // height: hp('8'),
          borderTopWidth: 0,
          width: wp('100'),
          alignSelf: 'center',
          backgroundColor: 'white',
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          // overflow: 'hidden',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={tabarComponent(home2, home)}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name="EditTripScreen"
        options={tabarComponent(map2, map)}
        component={Screens.EditTripScreen}
      />
      <Tab.Screen
        name="SomeComponent"
        options={tabarComponent(
          sendNotification,
          sendNotification,
          (ImageStyle = {
            width: wp('24'),
            marginTop: hp('-5'),
            height: hp('12'),
          }),
          // inviNotifyStatus,
          // {
          //   left: wp('20'),
          // },
        )}
        component={Screens.GeneralNotification}
      />
      <Tab.Screen
        name="ChatScreen"
        options={tabarComponent(
          notification2,
          notification,
          {},
          inviNotifyStatus,
        )}
        component={Screens.InvitationScreen}
      />
      <Tab.Screen
        name="AccountScreen"
        options={tabarComponent(setting2, setting)}
        component={Screens.ProfileScreen}
      />
    </Tab.Navigator>
  );
}
export default MybottomTabs;

const styles = StyleSheet.create({
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp('1.5'),
    backgroundColor: Colors.badgeColor,
  },
  tabarTitle: {
    display: 'none',
  },
  tabarView: (focused, last) => ({
    width: 'auto',
    backgroundColor: 'transparent',
    bottom: hp('0.5'),
  }),

  imgstyle: {
    resizeMode: 'contain',
    width: wp('7'),
  },
  dot: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.03,
    height: Dimensions.get('window').width * 0.03,
    position: 'absolute',
    left: wp('5'),
    top: hp('0.68'),
    zIndex: 1,
  },
});
