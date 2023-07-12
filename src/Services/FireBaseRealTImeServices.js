import {firebase} from '@react-native-firebase/database';
import {firebaseDataBaseURL} from '../Utils/Urls';
import {successMessage} from '../Config/NotificationMessage';
import {store} from '../Redux/Reducer';

const createTripObj = async data => {
  const {
    Auth: {userData},
  } = store.getState('Auth');
  const {tripId, members, destination, startPoint, tripType, TripName} = data;
  try {
    const membersData = members.map(res => ({
      [res.id]: {
        details: {id: res.id, email: res.email},
        location: {
          coords: {},
          description: '',
        },
        chat: [],
        status: false,
      },
    }));

    const reference = firebase
      .app()
      .database(firebaseDataBaseURL)
      .ref(`/Trips/${userData.id}/${tripId}`);

    await reference.set({
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
    });
  } catch (error) {
    console.log('Error creating trip:', error);
  }
};

export {createTripObj};
