import {useCallback, useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {frequentTrips, tripsTypes} from '../../Utils/localDB';
import {BackHandler, Keyboard} from 'react-native';
import {errorMessage} from '../../Config/NotificationMessage';
import API from '../../Utils/helperFunc';
import {CreateTripUrl, getAllUser} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingTrue} from '../../Redux/Action/isloadingAction';
import {createTripObj} from '../../Services/FireBaseRealTImeServices';
import {launchImageLibrary} from 'react-native-image-picker';

const useHomeScreen = () => {
  const {dispatch, getState} = useReduxStore();
  const {userData} = getState('Auth');
  const [homeStates, setHomeStates] = useState({
    selectTripType: tripsTypes[0].id,
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
      des: '',
    },
    groupMembers: [],
    allUser: [],
  });

  const [inputFeilds, setInputFeilds] = useState({
    destinationInput: {
      description: '',
      coords: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    locationInput: {
      description: '',
      coords: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
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
    isGroupMemberSelectModal,
    allUser,
    groupMembers,
  } = homeStates;

  const [updateError, setUpdateError] = useState('');

  const updateState = data => setHomeStates(prev => ({...prev, ...data}));
  const updateInputState = data => {
    setInputFeilds(() => ({...inputFeilds, ...data}));
  };
  // info?.coords?.latitude, info?.coords?.longitude

  const locationFun = stateName => {
    Geolocation.getCurrentPosition(async info => {
      const locationName = await getLocationName(
        info.coords.latitude,
        info.coords.longitude,
      );
      updateInputState({
        [stateName]: {
          coords: {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          },
          description: locationName,
        },
      });
    });
  };

  const bodyKey = {
    [tripsTypes[0].id]: {
      name: GroupInput,
      end_destination: destinationInput,
      user_ids: [...groupMembers, userData.id],
      type: selectTripType,
      // 'image' : 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    },
    [tripsTypes[1].id]: {
      start_destination: locationInput,
      name: GroupInput,
      end_destination: destinationInput,
      user_ids: [...groupMembers, userData.id],
      type: selectTripType,
    },
    [tripsTypes[2].id]: {
      start_destination: locationInput,
      name: GroupInput,
      end_destination: destinationInput,
      user_ids: [...groupMembers, userData.id],
      type: selectTripType,
    },
  };

  const firebaseDataType = {
    [tripsTypes[0].id]: {
      TripName: GroupInput,
      destination: destinationInput,
      tripType: selectTripType,
      startPoint: null,
      // 'tripId' : 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    },
    [tripsTypes[1].id]: {
      startPoint: locationInput,
      TripName: GroupInput,
      destination: destinationInput,
      tripType: selectTripType,
    },
    [tripsTypes[2].id]: {
      startPoint: locationInput,
      TripName: GroupInput,
      destination: destinationInput,
      tripType: selectTripType,
    },
  };

  const createTripFun = async () => {
    dispatch(loadingTrue());
    const body = bodyKey[selectTripType];
    const {ok, data, originalError} = await API.post(CreateTripUrl, body);
    if (ok) {
      createTripObj({
        ...firebaseDataType[selectTripType],
        tripId: data.trip_id,
        members: data.users,
      });
      openNextModal('isTripModalVisible', 'isTripStarted');
      updateInputState({
        destinationInput: {
          description: '',
          coords: {
            latitude: 37.78825,
            longitude: -122.4324,
          },
        },
        locationInput: {
          description: '',
          coords: {
            latitude: 37.78825,
            longitude: -122.4324,
          },
        },
        GroupInput: '',
      });
      updateState({
        groupMembers: [],
        selectTripType: tripsTypes[0].id,
      });
      setTimeout(() => {
        updateState({isTripStarted: false});
      }, 1000);
    }
    console.log('erororororororororororo', data, originalError);
  };

  const getLocationName = async (latitude, longitude) => {
    const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBlHyVz90xxc4lkp-1jGq68Ypmgnw4WCFE`;

    // Replace "YOUR_API_KEY" with your actual Google Maps Geocoding API key

    const res = await fetch(geocodingAPI);
    const response = await res.json();

    if (response.results.length > 0) {
      const locationName = response.results[0].formatted_address;
      return locationName;
    }
  };

  const getlocation = async () => {
    if (selectTripType == tripsTypes[0].id) {
      locationFun('destinationInput');
    } else {
      locationFun('locationInput');
    }
  };

  const errorStats = {
    isTripSelectModal: () => true,
    isModalVisible: () => {
      if (
        selectTripType != tripsTypes[0].id &&
        locationInput.description == ''
      ) {
        setUpdateError('Please enter the start location');
        return false;
      } else if (destinationInput.description == '') {
        setUpdateError('Please enter the destination location');
        return false;
      } else return true;
    },
    isTripModalVisible: () => true,
    iscreateModal: () => {
      if (GroupInput == '') {
        setUpdateError('Please enter the trip name ');
        return false;
      } else return true;
    },
    isTripCreated: () => true,
    isTripStarted: () => true,
    isGroupMemberSelectModal: () => {
      if (groupMembers.length > 0) {
        return true;
      } else {
        setUpdateError('Please select at least one memeber');
        return false;
      }
    },
  };

  const getUser = async () => {
    const {ok, data} = await API.get(getAllUser);
    if (ok) updateState({allUser: data});
  };

  const useEffectFuc = () => {
    getUser();
    locationFun(currentLocation);
  };

  const addMembersToGroup = ids => {
    if (groupMembers.includes(ids)) {
      updateState({groupMembers: groupMembers.filter(res => res != ids)});
    } else {
      updateState({groupMembers: [...groupMembers, ids]});
    }
  };

  const openNextModal = (preVal, newVal) => {
    const errorHandler = errorStats[preVal]();
    if (errorHandler) {
      updateState({[preVal]: false});
      setTimeout(() => {
        updateState({[newVal]: true});
      }, 0);
    }
  };
  const openPrevModal = (preVal, newVal) => {
    updateState({[preVal]: false});
    setTimeout(() => {
      updateState({[newVal]: true});
    }, 0);
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

  const [tripImage, setTripImage] = useState(null);
  const uploadFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
      },
      res => {
        if (!res?.didCancel) {
          console.log('imag222e', res.assets);
          setTripImage(res?.assets[0]);
        }
      },
    );
  };

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
    isGroupMemberSelectModal,
    remember,
    rememberValue,
    keyboardStatus,
    allUser,
    addMembersToGroup,
    groupMembers,
    updateError,
    createTripFun,
    uploadFromGalary,
    tripImage,
  };
};

export default useHomeScreen;
