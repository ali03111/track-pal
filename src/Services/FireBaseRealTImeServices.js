// import {firebase} from '@react-native-firebase/database';
import {firebaseDataBaseURL, notifyToOwnerUrl} from '../Utils/Urls';
import {successMessage} from '../Config/NotificationMessage';
import {store} from '../Redux/Reducer';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import {loadingFalse, loadingTrue} from '../Redux/Action/isloadingAction';
import {types} from '../Redux/types';
import {
  requestLocationAccuracy,
  LocationAccuracy,
  checkLocationAccuracy,
  PERMISSIONS,
  check,
  request,
  openSettings,
} from 'react-native-permissions';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import API from '../Utils/helperFunc';
import {alertTrue} from '../Redux/Action/isAlertAction';
import NavigationService from './NavigationService';

const perSKU = Platform.select({
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
});

export const reference = firestore().collection('Trips');
export const referenceChat = firestore().collection('Chats');

const requestPermission = async () => {
  const status = await check(perSKU);
  console.log('sssssss', status);
  // const {status} = await requestLocationAccuracy();
  // Request permission to access geolocation if needed
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Location permission denied');
    }
  }

  if (status == 'granted') return true;
  else {
    Alert.alert(
      'Warning',
      `Please allow you location permission to track you real-time location..`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Open Setting',
          onPress: () => {
            openSettings().catch(() => console.warn('Cannot open settings'));
          },
        },
      ],
      {
        userInterfaceStyle: 'light',
      },
    );
    return false;
  }
};

const createTripObj = async data => {
  const {
    Auth: {userData},
  } = store.getState('Auth');
  // const {tripId, members, destination, startPoint, tripType, TripName} = data;
  const {tripId, members, destination, startPoint, tripType, TripName, image} =
    data;
  console.log('membersmembersmembersmembersmembersmembers', data);
  try {
    const membersData = members.map(res => ({
      id: res.id,
      details: res,
      location: {
        coords: {},
        description: '',
      },
    }));

    const fire = reference
      .doc(`${userData.id}`)
      .collection(`"${tripId}"`)
      .doc(`${userData.id}`);

    const fireChat = referenceChat.doc(`"${tripId}"`);

    await fire.set({
      tripCreator: {
        email: userData.email,
        gender: userData.gender || '',
        id: userData.id,
        name: userData.name || '',
        phone: userData.phone || '',
        image: userData.profile_image || '',
      },
      destination,
      startPoint,
      tripType,
      TripName,
      members: membersData,
      tripImage: image,
    });
    await fireChat.set({chat: []});
  } catch (error) {
    console.log('Error creating trip:', error);
  }
};

const creaetChatObj = async data => {
  const {
    Auth: {userData},
  } = store.getState('Auth');
  const {tripId} = data;
  // console.log('membersmembersmembersmembersmembersmembers', members);
  try {
    // const membersData = members.map(res => ({
    //   id: res.id,
    //   details: {id: res.id, email: res.email},
    //   location: {
    //     coords: {},
    //     description: '',
    //   },
    //   chat: [],
    // }));

    const fire = referenceChat
      .doc(`${userData.id}`)
      .collection(`"${tripId}"`)
      .doc(`${userData.id}`);
    // .doc();
    // const fire = reference.doc(`/Trips/${userData.id}/${tripId}`);

    await fire.set({chat: []});
  } catch (error) {
    console.log('Error creating trip:', error);
  }
};

const updateDataFirebase = async data => {
  const {
    Auth: {userData},
  } = store.getState('Auth');
  const {tripId, tripOnnwerID} = data;

  try {
    store.dispatch(loadingTrue());
    const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);

    const firebaseGet = await fire.doc(`${tripOnnwerID}`).get();

    const wholeObj = firebaseGet.data();

    // Find the index of the object with id 6 in the members array
    const index = wholeObj.members.findIndex(
      member => member.id == userData.id,
    );
    wholeObj.members[index] = {...wholeObj.members[index], status: true};

    await fire.doc(`${tripOnnwerID}`).update(wholeObj);

    return {ok: true, result: null};
  } catch (error) {
    console.log('Error creating trip:=======>>>>>>>', error);
    return {ok: false, result: error};
  }
};

const getLocationName = async (latitude, longitude) => {
  console.log('first');

  const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDrsOp8m31p4Ouy3S0pfXRNehExMJ-Mp2U`;

  // Replace "YOUR_API_KEY" with your actual Google Maps Geocoding API key

  const res = await fetch(geocodingAPI);
  const response = await res.json();

  if (response.results.length > 0) {
    const locationName = response.results[0].formatted_address;
    return locationName;
  }
};
var locationData;

const getCurrentLocation = async () => {
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
  Geolocation.getCurrentPosition(async info => {
    const locationName = await getLocationName(
      info.coords.latitude,
      info.coords.longitude,
    );
    locationData = {
      coords: {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      },
      description: locationName,
    };
    console.log('sjkbvjksbvjbsvsd', locationData);
  });
  // const coords = Geolocation.getCurrentPosition();
  // console.lg('jksbjksbdjkbsd', coords);
  // const locationName = await getLocationName(coords.latitude, coords.longitude);
  // return {
  //   coords: {
  //     latitude,
  //     longitude,
  //   },
  //   description: locationName,
  // };
};

const shareLocationFirebase = async () => {
  const {
    islocationShare: {islocationShare, tripId, tripOwnerID},
  } = store.getState('islocationShare');
  console.log(
    'islocationShareislocationShareislocationShareislocationShare',
    islocationShare,
  );
  if (islocationShare) {
    await firebaseSubON({tripId, tripOnnwerID: tripOwnerID});
  }
};

// shareLocationFirebase();

const updateLocationONfire = async data => {
  const {
    Auth: {userData},
  } = store.getState('Auth');
  const {tripId, tripOnnwerID} = data;
  store.dispatch(loadingTrue());
  console.log('tripIdtripIdtripIdtripIdtripIdtripIdtripIdtripId', tripId);
  try {
    store.dispatch({
      type: types.isLocationTrue,
      payload: {
        tripId,
        tripOwnerID: tripOnnwerID,
      },
    });

    await getCurrentLocation();
    // const locationData = await getCurrentLocation();
    setTimeout(async () => {
      const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);

      const firebaseGet = await fire.doc(`${tripOnnwerID}`).get();

      const wholeObj = firebaseGet.data();

      // Find the index of the object with id 6 in the members array
      const index = wholeObj.members.findIndex(
        member => member.id == userData.id,
      );
      wholeObj.members[index] = {...wholeObj.members[index], ...locationData};

      await fire.doc(`${tripOnnwerID}`).update(wholeObj);
      console.log(
        'locationDatalocationDatalocatsdasdasdasdasdasdasdasdasdasionDatalocationData',
        locationData,
      );
    }, 1000);

    return {ok: true, result: null};
  } catch (error) {
    console.log('Error creating trip:', error);
    return {ok: false, result: error};
  }
};

const getFirebaseData = async data => {
  store.dispatch(loadingTrue());
  const {tripId, tripOnnwerID} = data;
  try {
    const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);

    const firebaseGet = await fire.doc(`${tripOnnwerID}`).get();

    console.log('firebaseGetfirebaseGet', firebaseGet);

    const wholeObj = firebaseGet.data();

    console.log('wholeObjwholeObjwholeObjwholeObj', wholeObj);
    // Find the index of the object with id 6 in the members array
    const filterData = wholeObj.members.filter(
      member => member?.coords != null && true,
    );
    store.dispatch(loadingFalse());
    // wholeObj.members[index] = {...wholeObj.members[index], status: true};
    return {ok: true, data: filterData};
  } catch (error) {
    store.dispatch(loadingFalse());
    return {ok: false, data: error};
  }
};

const deleteDataOnFirebase = async data => {
  store.dispatch(loadingTrue());
  const {tripId, tripOnnwerID} = data;
  try {
    await referenceChat.doc(`"${tripId}"`).delete();
    const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);
    await fire.doc(`${tripOnnwerID}`).delete();
    store.dispatch({
      type: types.clearNofityObjByID,
      payload: tripId,
    });
    return {ok: true, data: {}};
  } catch (error) {
    store.dispatch(loadingFalse());
    return {ok: false, data: error};
  }
};

const updateTripDataonFirebase = async data => {
  const {tripId, tripOnnwerID, tripName, tripImage, new_users, remove_users} =
    data;
  try {
    const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);

    const firebaseGet = await fire.doc(`${tripOnnwerID}`).get();

    const wholeObj = firebaseGet.data();
    if (remove_users.length > 0) {
      console.log(
        'removed arry firebase',
        wholeObj.members.filter(item1 => !remove_users.includes(item1.id)),
      );
      // wholeObj.members.filter(
      //   item1 => !remove_users.some(item2 => item1.id === item2.id),
      // );
      wholeObj.members = wholeObj.members.filter(
        item1 => !remove_users.includes(item1.id),
      );
      // wholeObj.members.filter(
      //   item1 => !remove_users.find(item2 => item1.id === item2.id),
      // );
    }
    if (new_users.length > 0) {
      const membersData = new_users.map(res => ({
        id: res.id,
        details: res,
        location: {
          coords: {},
          description: '',
        },
      }));
      wholeObj.members = [...wholeObj.members, ...membersData];
    }
    // if (new_users.length > 0) {
    //   wholeObj.members.push(
    //     new_users.map(res => ({
    //       id: res.id,
    //       details: res,
    //       location: {
    //         coords: {},
    //         description: '',
    //       },
    //     })),
    //   );
    // }
    wholeObj.TripName = tripName;
    wholeObj.tripImage = tripImage;
    // wholeObj.members=
    // wholeObj = {
    //   ...wholeObj,
    //   TripName: tripName,
    //   tripImage,
    // };
    console.log(
      'updatedDataupdatedDataupdatedDataupdatedDataupdatedData',
      wholeObj,
    );
    const r = await fire.doc(`${tripOnnwerID}`).update(wholeObj);
    console.log('Firebase error', r);
    return {ok: true, data: null};
  } catch (error) {
    console.log('Firebase ', error);
    return {ok: false, data: error};
  }
};

const onEndTrip = async data => {
  store.dispatch(loadingTrue());
  const {tripId, tripOnnwerID, userData} = data;
  try {
    const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);

    const firebaseGet = await fire.doc(`${tripOnnwerID}`).get();

    const wholeObj = firebaseGet.data();

    console.log('wholeObjwholeObjwholeObjwholeObj', wholeObj);
    // Find the index of the object with id 6 in the members array
    const index = wholeObj.members.findIndex(
      member => member.id == userData.id,
    );

    store.dispatch(loadingFalse());
    wholeObj.members[index] = {...wholeObj.members[index], coords: null};
    await fire.doc(`${tripOnnwerID}`).update(wholeObj);
    return {ok: true, data: null};
  } catch (error) {
    store.dispatch(loadingFalse());
    return {ok: false, data: error};
  }
};

const sendDataToFIrebase = async data => {
  const {tripOnnwerID, tripId, msgObj, userData} = data;
  console.log('uyserSTchvschv sc', userData);
  try {
    const fire = referenceChat.doc(`"${tripId}"`);
    const fireGet = await fire.get();

    const firebaseGet = await fireGet._data.chat;

    await fire.update({chat: [...firebaseGet, msgObj]});

    return {ok: true, data: null};
  } catch (error) {
    return {ok: false, data: error};
  }
};

var filte = [];

const getFirebaseUpdatedData = async data => {
  const {tripId, tripOnnwerID} = data;

  try {
    const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);

    fire.onSnapshot(snapshot => {
      console.log('snapshotsnapshotsnapshotsnapshotsnapshot', snapshot);
      const allMsg = snapshot.docs.map(item => {
        return {...item._data};
      });
      // setMessages(allMsg);
      // const wholeObj = snapshot.data();

      console.log('wholesdfsdfsdfsdfdsfdsdsObj', allMsg);

      if (allMsg.length > 0) {
        filte = allMsg?.members?.filter(
          member => member.status === true && member.coords != null && true,
        );
        // console.log('filterData', filterData);

        // Do whatever you need with the filtered data

        // Example: Update state or call a function with the filtered data
        // updateState(filterData);
        // processFilteredData(filterData);
      }
    });

    // Return a result or handle success

    return {ok: true, data: filte};
  } catch (error) {
    // Handle error
    return {ok: false, data: error};
  }
};

const firebaseSubON = async data => {
  const {
    Auth: {userData},
  } = store.getState('Auth');
  const {tripId, tripOnnwerID} = data;
  try {
    const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);

    const firebaseGet = await fire.doc(`${tripOnnwerID}`).get();

    const wholeObj = firebaseGet.data();

    // Find the index of the object with id 6 in the members array
    const index = wholeObj.members.findIndex(
      member => member.id == userData.id,
    );
    console.log('wholeObjwholeObjwholeObjwholeObjwholeObjwholeObj', wholeObj);
    Geolocation.watchPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        wholeObj.members[index] = {
          ...wholeObj.members[index],
          coords: {
            latitude,
            longitude,
          },
        };

        await fire.doc(`${tripOnnwerID}`).update(wholeObj);
      },
      error => {
        return {ok: false, data: error};
      },
      {
        enableHighAccuracy: true,
        fastestInterval: 1,
        distanceFilter: 1,
        useSignificantChanges: true,
      },
    );

    return {ok: true, data: null};
  } catch (error) {
    console.log('Error creating trip: firebaseSubON', error);
    return {ok: false, data: error};
  }
};

const getFirebaseAllData = async data => {
  store.dispatch(loadingTrue());
  const {tripId, tripOnnwerID} = data;
  try {
    const fire = reference.doc(`${tripOnnwerID}`).collection(`"${tripId}"`);

    const firebaseGet = await fire.doc(`${tripOnnwerID}`).get();

    const wholeObj = firebaseGet.data();

    store.dispatch(loadingFalse());
    // wholeObj.members[index] = {...wholeObj.members[index], status: true};
    return {ok: true, data: wholeObj};
  } catch (error) {
    store.dispatch(loadingFalse());
    return {ok: false, data: error};
  }
};

const notifyUser = async id => {
  const getNameFunc = NavigationService.getCurrentRoute();
  const routeName = getNameFunc?.getCurrentRoute()?.name;
  const {ok, data} = await API.get(notifyToOwnerUrl + id);
  console.log('jadbfjkbadjbsjdbbsd', data);
  if (ok && routeName == 'MapAndChatScreen') {
    store.dispatch(alertTrue());
  }
};

export {
  createTripObj,
  updateDataFirebase,
  firebaseSubON,
  updateLocationONfire,
  getFirebaseData,
  getCurrentLocation,
  getFirebaseUpdatedData,
  shareLocationFirebase,
  sendDataToFIrebase,
  onEndTrip,
  requestPermission,
  creaetChatObj,
  notifyUser,
  getFirebaseAllData,
  deleteDataOnFirebase,
  updateTripDataonFirebase,
};
