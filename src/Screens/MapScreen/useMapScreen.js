import {useEffect, useRef, useState} from 'react';
import {
  getFirebaseData,
  getCurrentLocation,
  getFirebaseUpdatedData,
  reference,
  shareLocationFirebase,
  notifyUser,
  getFirebaseAllData,
} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {Dimensions} from 'react-native';
import Geolib from 'geolib';
import getDistance from 'geolib/es/getPreciseDistance';
import {AnimatedRegion} from 'react-native-maps';
import {SOSToMembers} from '../../Utils/Urls';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import API from '../../Utils/helperFunc';

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

  const iconRef = useRef(null);

  const [currentUser, setCurrentUser] = useState({
    coords: {
      longitude: null,
      latitude: null,
    },
    status: true,
  });
  const userMarkerRef = useRef(
    new AnimatedRegion({
      latitude: 0,
      longitude: 0,
    }),
  );
  const {getState} = useReduxStore();
  const {userData} = getState('Auth');

  const getMembers = async () => {
    const {ok, data} = await getFirebaseData({
      tripId: item.id,
      tripOnnwerID: item.owner ? Number(item.user_id) : item.trip_owner.id,
    });
    if (ok) {
      if (!item.owner && item.type != 'personalTrip') {
        setAllMembers(() => data.filter(res => res.id != userData.id));
        const user = data.filter(res => res.id == userData.id);
        setCurrentUser(prev => {
          if (user.length > 0) return user[0];
          else return prev;
        });
        if (user.length > 0)
          userMarkerRef.current
            .timing(
              {
                latitude: user[0].coords.latitude,
                longitude: user[0].coords.longitude,
              },
              100,
            )
            .start();
      } else if (item.owner) {
        setAllMembers(data);
        console.log('asd asd', data);
      } else if (item.type == 'personalTrip') {
        const user = data.filter(res => res.id == item.trip_owner.id);
        console.log('updateState(1, item.id, index, true);', user);
        setCurrentUser(prev => {
          if (user.length > 0) return user[0];
          else return prev;
        });
      }
    } else console.log('get all members error', data);
  };
  const [tripInfo, setTripInfo] = useState([]);

  const getAllData = async () => {
    const {ok, data} = await getFirebaseAllData({
      tripId: item.id,
      tripOnnwerID: item.owner ? Number(item.user_id) : item.trip_owner.id,
    });
    if (ok) {
      setTripInfo(data);
    } else console.log('get all members error', data);
  };

  const notificationToAllMembers = async () => {
    const {ok, originalError, data} = await API.get(SOSToMembers + item.id);
    console.log('test', data);
    if (ok) successMessage('Notification has been sent.');
    else errorMessage(originalError?.message);
  };

  const useEffectFunc = () => {
    getMembers();
    getAllData();
    firebaseSnapOn();
    iconRef.current = 1;
  };

  useEffect(() => {
    if (item.isRoute) {
      setTimeout(() => {
        navigate('ChatScreen', {params: {item: item}});
      }, 2000);
    }
  }, []);

  useEffect(shareLocationFirebase, [shareLocationFirebase]);

  const getKiloMeter = user => {
    userMarkerRef.current
      .timing(
        {
          latitude: user[0].coords.latitude,
          longitude: user[0].coords.longitude,
        },
        100,
      )
      .start();
    distance = getDistance(
      {
        latitude: user[0].coords.latitude,
        longitude: user[0].coords.longitude,
      },
      {latitude: log.latitude, longitude: log.longitude},
    );
    const kiloMeter = distance / 1000;
    console.log(
      'kiloMeterkiloMeterkiloMeterkiloMeterkiloMeterkiloMeter',
      kiloMeter,
    );
    kiloMeterRef.current = kiloMeter.toFixed(2);
    Number(kiloMeterRef.current) <= Number('0.04') &&
      !item.owner &&
      notifyUser(`${item.owner ? Number(item.user_id) : item.trip_owner.id}`);
  };

  const firebaseSnapOn = () => {
    const fire = reference
      .doc(`${item.owner ? Number(item.user_id) : item.trip_owner.id}`)
      .collection(`"${item.id}"`);

    const subscriber = fire.onSnapshot(querySnapshot => {
      const allMsg = querySnapshot.docs.map(item => {
        return {...item._data};
      });
      // console.log('asdksjdbjsdbjksbbsdjbjsbdkj bkjsdbj ', allMsg);
      if (allMsg[0]?.members) {
        const filterData = allMsg[0].members.filter(
          member => member.status == true && member?.coords != null && true,
        );
        if (!item.owner && item.type != 'personalTrip') {
          setAllMembers(() => filterData.filter(res => res.id != userData.id));
          const user = filterData.filter(res => res.id == userData.id);
          const checkLength = Boolean(user.length > 0);
          setCurrentUser(prev => {
            if (checkLength) {
              return user[0];
            } else return prev;
          });
          if (checkLength) {
            getKiloMeter(user);
          }
        } else if (item.owner) {
          setAllMembers(filterData);
        } else if (item.type == 'personalTrip') {
          const user = filterData.filter(res => res.id == item.trip_owner.id);
          const checkLength = Boolean(user.length > 0);
          console.log(
            'checkLengthcheckLengthcheckLengthcheckLengthcheckLengthcheckLengthcheckLength',
            user,
          );
          setCurrentUser(prev => {
            if (user.length > 0) return user[0];
            else return prev;
          });
          if (checkLength) getKiloMeter(user);
        }
      }
    });
    return () => subscriber();
  };

  useEffect(useEffectFunc, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return {
    allMember,
    destination: JSON.parse(item.end_destination),
    tripData: item,
    currentUser,
    latitudeDelta,
    laongituteDalta,
    kiloMeterRef,
    userMarkerRef,
    iconRef,
    toggleModal,
    isModalVisible,
    tripInfo,
    notificationToAllMembers,
    userData,
  };
};

export default useMapScreen;
