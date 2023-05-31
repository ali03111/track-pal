import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {frequentTrips} from '../../Utils/localDB';

const useHomeScreen = () => {
  const [homeStates, setHomeStates] = useState({
    locationInput: '',
    destinationInput: '',
    GroupInput: '',
    isModalVisible: false,
    isTripModalVisible: false,
    iscreateModal: false,
    isTripCreated: false,
    currentLocation: {
      coords: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
  });

  const {
    locationInput,
    destinationInput,
    GroupInput,
    isModalVisible,
    isTripModalVisible,
    iscreateModal,
    isTripCreated,
    currentLocation,
  } = homeStates;

  const updateState = data => setHomeStates(prev => ({...prev, ...data}));
  // info?.coords?.latitude, info?.coords?.longitude
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      updateState({currentLocation: info});
    });
  };

  const useEffectFuc = () => {
    getCurrentLocation();
  };

  useEffect(useEffectFuc, []);

  return {
    frequentTrips,
    isModalVisible,
    locationInput,
    iscreateModal,
    GroupInput,
    isTripModalVisible,
    destinationInput,
    isTripCreated,
    updateState,
    currentLocation,
  };
};

export default useHomeScreen;
