import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {frequentTrips} from '../../Utils/localDB';
import {BackHandler} from 'react-native';

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
    isTripSelectModal: false,
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
    isTripSelectModal,
  } = homeStates;

  const updateState = data => setHomeStates(prev => ({...prev, ...data}));
  // info?.coords?.latitude, info?.coords?.longitude
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      updateState({currentLocation: info});
    });
  };

  const errorStats = {
    isTripSelectModal,
    isModalVisible,
    isTripModalVisible,
    iscreateModal,
    isTripCreated,
    currentLocation,
    isTripStarted,
  };

  const useEffectFuc = () => {
    getCurrentLocation();
  };

  const openNextModal = (preVal, newVal) => {
    updateState({[preVal]: false});
    setTimeout(() => {
      updateState({[newVal]: true});
    }, 100);
  };
  const openPrevModal = (preVal, newVal) => {
    updateState({[preVal]: false});
    setTimeout(() => {
      updateState({[newVal]: true});
    }, 100);
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
    isTripSelectModal,
    openNextModal,
    openPrevModal,
  };
};

export default useHomeScreen;
