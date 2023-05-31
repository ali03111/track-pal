import React, {memo, useCallback} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GeneralNotificationTab from './GeneralNotificationTab';
import InvitationTab from './InvitaitionTab';
import {hp} from '../../Config/responsive';

const Tab = createMaterialTopTabNavigator();

const NotificationTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
          marginTop: hp('4'),
        },
        indicatorStyle: {
          // width: 0,
          height: 3,
          elevation: 0,
          backgroundColor: '#b531b1',
        },
      }}>
      <Tab.Screen name="General" component={GeneralNotificationTab} />
      <Tab.Screen name="Invitation" component={InvitationTab} />
    </Tab.Navigator>
  );
};
export default memo(NotificationTabs);
