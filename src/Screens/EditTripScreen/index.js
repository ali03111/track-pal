import React, {memo} from 'react';
import {View, Platform} from 'react-native';
import {styles} from './styles';

import TripCreatedModal from '../HomeScreen/TripCreatedModal';
import useEditTripScreen from './useEditTripScreen';
import {hp, wp} from '../../Config/responsive';
import {getSingleCharacter} from '../../Utils/globalFunctions';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import GradientText from '../../Components/GradientText';
import {EmptyViewComp} from '../../Components/EmptyViewComp';
import {keyExtractor} from '../../Utils';
import Geolocation from '@react-native-community/geolocation';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MyTrips from './MyTrips';
import InvitedTrips from './InvitedTrips';
import GroupTrips from './GroupTrips';

const EditTripScreen = ({navigation}) => {
  const {isTripCreated} = useEditTripScreen(navigation);

  const Tab = createMaterialTopTabNavigator();

  return (
    // <View style={{height: hp('200')}}>
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        style: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
          paddingTop: Platform.OS == 'ios' ? hp('5') : 0,
        },
        indicatorStyle: {
          // width: 0,
          height: 3,
          elevation: 0,
          backgroundColor: '#b531b1',
        },
      }}>
      <Tab.Screen name="My Trips" component={MyTrips} />
      <Tab.Screen name="Invited Trips" component={InvitedTrips} />
      <Tab.Screen name="Group Trips" component={GroupTrips} />
    </Tab.Navigator>

    // <TripCreatedModal title={'Trip started'} isTripCreated={isTripCreated} />
    // </View>
  );
};
export default memo(EditTripScreen);
