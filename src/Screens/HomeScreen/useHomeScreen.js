import {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {frequentTrips, tripsTypes} from '../../Utils/localDB';
import {BackHandler} from 'react-native';
import {errorMessage} from '../../Config/NotificationMessage';

const useHomeScreen = () => {
  const [homeStates, setHomeStates] = useState({
    selectTripType: tripsTypes[1].id,
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
      des: '',
    },
    groupMembers: [],
  });

  const [inputFeilds, setInputFeilds] = useState({
    destinationInput: {description: ''},
    locationInput: {description: ''},
    GroupInput: '',
  });

  // const [destinationInput, setDestinationInput] = useState({description: ''});
  const destinationInputRef = useRef({description: ''});
  const {locationInput, GroupInput, destinationInput} = inputFeilds;

  const {
    isModalVisible,
    isTripModalVisible,
    iscreateModal,
    isTripCreated,
    currentLocation,
    isTripStarted,
    isTripSelectModal,
    selectTripType,
  } = homeStates;

  const updateState = data => setHomeStates(prev => ({...prev, ...data}));
  const updateInputState = data => {
    console.log('lsdnvsndovbnsdvbnsdbnvosdbnvoisdnbvlsndlkvnsdvsd', data);
    setInputFeilds(() => ({...inputFeilds, ...data}));
  };
  // info?.coords?.latitude, info?.coords?.longitude

  const locationFun = stateName => {
    // var location;
    Geolocation.getCurrentPosition(async info => {
      const locationName = await getLocationName(
        info.coords.latitude,
        info.coords.longitude,
      );
      updateState({
        [stateName]: {
          coords: {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          },
          des: locationName,
        },
      });
    });
  };

  const getLocationName = async (latitude, longitude) => {
    const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBWU9HrMQUigxX7_ry_HpHNvEdn_Vve4DI`;

    // Replace "YOUR_API_KEY" with your actual Google Maps Geocoding API key

    const res = await fetch(geocodingAPI);
    const response = res.json();

    if (response.results.length > 0) {
      const locationName = response.results[0].formatted_address;
      return locationName;
    }
  };

  const getlocation = async () => {
    // locationFun();
    if (selectTripType == tripsTypes[0].id) {
      // updateState({destinationInput:currentLocation.})
    }
  };

  const errorStats = {
    isTripSelectModal: () => true,
    isModalVisible: () => {
      if (
        selectTripType != tripsTypes[0].id &&
        locationInput.description == ''
      ) {
        errorMessage('Please enter the start location');
        return false;
      } else if (destinationInput.description == '') {
        errorMessage('Please enter the destination location');
        return false;
      } else return true;
    },
    isTripModalVisible: () => true,
    iscreateModal: () => {
      if (GroupInput == '') {
        errorMessage('Please enter the trip name ');
        return false;
      } else return true;
    },
    isTripCreated: () => true,
    isTripStarted: () => true,
  };

  const useEffectFuc = () => {
    locationFun(currentLocation);
  };

  const openNextModal = (preVal, newVal) => {
    const errorHandler = errorStats[preVal]();
    console.log('errorhandklw', errorHandler);
    if (errorHandler) {
      updateState({[preVal]: false});
      setTimeout(() => {
        updateState({[newVal]: true});
      }, 0);
    } else errorMessage('ksdbvlksdlbsdlb');
  };
  const openPrevModal = (preVal, newVal) => {
    console.log('inpyutStataea', inputFeilds);
    updateState({[preVal]: false});
    setTimeout(() => {
      updateState({[newVal]: true});
    }, 0);
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
    selectTripType,
    getlocation,
    updateInputState,
    destinationInputRef,
  };
};

export default useHomeScreen;
