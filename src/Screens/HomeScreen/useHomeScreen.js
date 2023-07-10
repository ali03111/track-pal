import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {frequentTrips, tripsTypes} from '../../Utils/localDB';
import {BackHandler, Keyboard} from 'react-native';
import {errorMessage} from '../../Config/NotificationMessage';

const useHomeScreen = () => {
  const [homeStates, setHomeStates] = useState({
    locationInput: '',
    destinationInput: '',
    GroupInput: '',
    selectTripType: tripsTypes[1].id,
    isModalVisible: false,
    isTripModalVisible: false,
    iscreateModal: false,
    isTripCreated: false,
    isTripStarted: false,
    isTripSelectModal: false,
    isGroupMemberSelectModal: false,
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
    selectTripType,
    isGroupMemberSelectModal,
  } = homeStates;

  const updateState = data => setHomeStates(prev => ({...prev, ...data}));
  // info?.coords?.latitude, info?.coords?.longitude
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      updateState({currentLocation: info});
    });
  };

  const errorStats = {
    isTripSelectModal: () => true,
    isModalVisible: () => {
      if (selectTripType == tripsTypes[0].id && locationInput == '') {
        errorMessage('Please enter the start location');
        return false;
      } else if (destinationInput == '') {
        errorMessage('Please enter the destination location');
        return false;
      } else return true;
    },
    isTripModalVisible,
    iscreateModal: () => {
      if (GroupInput == '') {
        errorMessage('Please enter the trip name ');
        return false;
      } else return true;
    },
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

  const [remember, setRemember] = useState(true);
  const rememberValue = () => {
    setRemember(!remember);
  };

  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
    selectTripType,
    isGroupMemberSelectModal,
    remember,
    rememberValue,
    keyboardStatus,
  };
};

export default useHomeScreen;
