import React, {memo, useCallback} from 'react';
import {Platform} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GeneralNotificationTab from './GeneralNotificationTab';
import InvitationTab from './InvitaitionTab';
import {hp} from '../../Config/responsive';
import useNotificationScreen from './useNotificationScreen';

const Tab = createMaterialTopTabNavigator();

const NotificationTabs = ({route, navigation}) => {
  useNotificationScreen(route, navigation);
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
          paddingTop: Platform.OS == 'ios' ? hp('4') : 0,
        },
        indicatorStyle: {
          // width: 0,
          height: 3,
          elevation: 0,
          backgroundColor: '#b531b1',
        },
      }}>
      <Tab.Screen
        name="GeneralNotificationTab"
        component={GeneralNotificationTab}
        options={{
          title: 'General',
        }}
      />
      <Tab.Screen
        name="InvitationTab"
        component={InvitationTab}
        options={{
          title: 'Invitation',
        }}
      />
    </Tab.Navigator>
  );
};
export default memo(NotificationTabs);
