import {useEffect, useState} from 'react';
import {
  getFirebaseData,
  getCurrentLocation,
  getFirebaseUpdatedData,
  reference,
  shareLocationFirebase,
} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {Dimensions} from 'react-native';

const useMapScreen = ({navigate}, {params}) => {
  const {item} = params.params;
  console.log('jabdjabvdjkbcvsjkdcvjsd', item);
  const [allMember, setAllMembers] = useState([]);
  const log = JSON.parse(item.end_destination);

  const {width, height} = Dimensions.get('window');
  const ACPT_RATIO = width / height;
  const latitudeDelta = 0.02;
  const laongituteDalta = latitudeDelta * ACPT_RATIO;

  const [currentUser, setCurrentUser] = useState({
    coords: {
      latitude: log.latitude,
      longitude: log.longitude,
    },
    status: true,
  });

  const {getState} = useReduxStore();
  const {userData} = getState('Auth');

  const getMembers = async () => {
    const {ok, data} = await getFirebaseData({
      tripId: item.id,
      tripOnnwerID: item.owner ? Number(item.user_id) : item.trip_owner.id,
    });
    if (ok) {
      if (!item.owner) {
        setAllMembers(() => data.filter(res => res.id != userData.id));
        setCurrentUser(prev => {
          const user = data.filter(res => res.id == userData.id);
          if (user.length == 0) return user[0];
          else return prev;
        });
      } else if (item.owner) {
        setAllMembers(data);
      }
    } else console.log('get all members error', data);
  };

  const useEffectFunc = () => {
    getMembers();
    firebaseSnapOn();
  };

  useEffect(shareLocationFirebase, [shareLocationFirebase]);

  const firebaseSnapOn = () => {
    const fire = reference
      .doc(`${item.owner ? Number(item.user_id) : item.trip_owner.id}`)
      .collection(`"${item.id}"`);

    const subscriber = fire.onSnapshot(querySnapshot => {
      const allMsg = querySnapshot.docs.map(item => {
        return {...item._data};
      });
      const filterData = allMsg[0].members.filter(
        member => member.status == true && member?.coords != null && true,
      );

      if (!item.owner) {
        setAllMembers(() => filterData.filter(res => res.id != userData.id));
        setCurrentUser(prev => {
          const user = filterData.filter(res => res.id == userData.id);
          if (user.length == 0) return user[0];
          else return prev;
        });
      } else if (item.owner) {
        setAllMembers(filterData);
      }
    });
    return () => subscriber();
  };

  useEffect(useEffectFunc, []);

  return {
    allMember,
    destination: JSON.parse(item.end_destination),
    tripData: item,
    currentUser,
    latitudeDelta,
    laongituteDalta,
  };
};

export default useMapScreen;
