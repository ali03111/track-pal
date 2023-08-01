import {useEffect, useRef, useState} from 'react';
import {
  getFirebaseData,
  getCurrentLocation,
  getFirebaseUpdatedData,
  reference,
  shareLocationFirebase,
} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {Dimensions} from 'react-native';
import Geolib from 'geolib';
import getDistance from 'geolib/es/getPreciseDistance';

const useMapScreen = ({navigate}, {params}) => {
  const {item} = params.params;
  var distance = 0;

  const [allMember, setAllMembers] = useState([]);

  const log = JSON.parse(item.end_destination);
  const kiloMeterRef = useRef(0.0);
  const {width, height} = Dimensions.get('window');
  const ACPT_RATIO = width / height;
  const latitudeDelta = 0.02;
  const laongituteDalta = latitudeDelta * ACPT_RATIO;
  console.log(
    'JSON.parse(item.end_destination)JSON.parse(item.end_destination)JSON.parse(item.end_destination)',
    JSON.parse(item.end_destination),
  );
  const [currentUser, setCurrentUser] = useState({
    coords: {
      longitude: null,
      latitude: null,
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
          if (user.length > 0) return user[0];
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
        const user = filterData.filter(res => res.id == userData.id);
        const checkLength = Boolean(user.length > 0);
        setCurrentUser(prev => {
          if (checkLength) {
            return user[0];
          } else return prev;
        });
        if (checkLength) {
          distance = getDistance(
            {
              latitude: user[0].coords.latitude,
              longitude: user[0].coords.longitude,
            },
            {latitude: log.latitude, longitude: log.longitude},
          );
          const kiloMeter = distance / 1000;
          kiloMeterRef.current = kiloMeter.toFixed(2);
        }
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
    kiloMeterRef,
  };
};

export default useMapScreen;
