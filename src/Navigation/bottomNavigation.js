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

globalStyles = {};
const isIOS = Boolean(Platform.OS == 'ios');
const tabarComponent = (activeImage, unActiveImage, ImageStyle) => {
  return {
    tabBarIcon: ({focused}) => (
      <View style={styles.tabarView}>
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

const Tab = createBottomTabNavigator();
function MybottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: Colors.white,
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
          height: hp('8'),
          borderTopWidth: 0,
          width: wp('100'),
          alignSelf: 'center',
          backgroundColor: 'transparent',
          backfaceVisibility: 'hidden',
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
        name="FavourateScreen"
        options={tabarComponent(map2, map)}
        component={Screens.RegisterScreen}
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
        )}
        component={Screens.ProfileScreen}
      />
      <Tab.Screen
        name="ChatScreen"
        options={tabarComponent(notification2, notification)}
        component={Screens.NotificationTabsScreen}
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
});
