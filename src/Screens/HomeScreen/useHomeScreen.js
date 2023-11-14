import {useCallback, useEffect, useRef, useState} from 'react';
// import Geolocation from '@react-native-community/geolocation';
import Geolocationios from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {frequentTrips, tripsTypes} from '../../Utils/localDB';
import {
  BackHandler,
  Keyboard,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {errorMessage} from '../../Config/NotificationMessage';
import API, {formDataFunc} from '../../Utils/helperFunc';
import {CreateTripUrl, createTripImage, getAllUser} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
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
    istooltipModal: false,
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
    istooltipModal,
    allUser,
    groupMembers,
  } = homeStates;

  const [tripImage, setTripImage] = useState(null);
  const [updateError, setUpdateError] = useState('');

  const updateState = data => setHomeStates(prev => ({...prev, ...data}));
  const updateInputState = data => {
    setInputFeilds(() => ({...inputFeilds, ...data}));
  };
  // info?.coords?.latitude, info?.coords?.longitude

  const locationFun = async stateName => {
    console.log('first');

    // Request permission to access geolocation if needed
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Location permission denied');
      }
    }

    if (Platform.OS == 'android') {
      Geolocation.getCurrentPosition(async info => {
        console.log('sec');

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
    } else {
      Geolocationios.getCurrentPosition(async info => {
        console.log('sec');

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
    }
  };

  const bodyKey = {
    [tripsTypes[0].id]: {
      name: GroupInput,
      end_destination: destinationInput,
      user_ids: [...groupMembers, userData.id],
      type: selectTripType,
      // 'image' : 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
      // profileData: tripImage,
    },
    [tripsTypes[1].id]: {
      start_destination: locationInput,
      name: GroupInput,
      end_destination: destinationInput,
      user_ids: [...groupMembers, userData.id],
      type: selectTripType,
      // profileData: tripImage,
    },
    [tripsTypes[2].id]: {
      start_destination: locationInput,
      name: GroupInput,
      end_destination: destinationInput,
      user_ids: [...groupMembers, userData.id],
      type: selectTripType,
      // profileData: tripImage,
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

  const updateTripImage = async params => {
    setTimeout(() => {
      dispatch(loadingTrue());
    }, 1000);
    const {ok, data} = await formDataFunc(
      createTripImage,
      {
        trip_id: params.trip_id,
        profileData: tripImage,
      },
      'image',
    );
    return {status: ok, res: data};
  };

  const createTripFun = async () => {
    dispatch(loadingTrue());
    const body = bodyKey[selectTripType];
    console.log('asd', body.profileData);
    const {ok, data, originalError} = await API.post(CreateTripUrl, body);
    if (tripImage != null) {
      var {status, res} = await updateTripImage(data);
      console.log('resresresresresresresresresssssss', res);
    }
    // const {ok, data} = await formDataFunc(CreateTripUrl, body, 'image');
    if ((tripImage != null && status) || (tripImage == null && ok)) {
      createTripObj({
        ...firebaseDataType[selectTripType],
        tripId: data.trip_id,
        members: data.users,
        image: res?.image ?? null,
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
      setTripImage(null);
      dispatch(loadingFalse());
      setTimeout(() => {
        updateState({isTripStarted: false});
      }, 1000);
    } else {
      dispatch(loadingFalse());
      errorMessage('');
    }
    // console.log('erororororororororororo', originalError);

    console.log('asdasdasdurl', CreateTripUrl);
    console.log('asdasdasd', body);
    // dispatch(loadingFalse());
  };

  const getLocationName = async (latitude, longitude) => {
    console.log('third');

    const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDrsOp8m31p4Ouy3S0pfXRNehExMJ-Mp2U`;

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
  let regexp = /^(?![\s\b]).*/;
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
      } else {
        setUpdateError('');
        return true;
      }
    },
    isTripModalVisible: () => true,
    iscreateModal: () => {
      if (
        GroupInput != '' &&
        regexp.test(GroupInput) &&
        GroupInput != undefined
      ) {
        setUpdateError('');
        return true;
      } else {
        setUpdateError('Please type correct name');
        return false;
      }
    },
    isTripCreated: () => true,
    isTripStarted: () => true,
    isGroupMemberSelectModal: () => {
      if (groupMembers.length > 0) {
        setUpdateError('');
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
    console.log('redawww');
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

  const clearImage = () => setTripImage(null);

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
    istooltipModal,
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
    getUser,
    clearImage,
  };
};

export default useHomeScreen;
