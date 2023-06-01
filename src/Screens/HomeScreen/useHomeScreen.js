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
    isTripStarted: false,
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
    isTripStarted,
  } = homeStates;

  const updateState = data => setHomeStates(prev => ({...homeStates, ...data}));
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
    isTripStarted,
  };
};

export default useHomeScreen;
