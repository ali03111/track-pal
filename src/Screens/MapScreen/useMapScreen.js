import {useEffect, useState} from 'react';
import {
  getFirebaseData,
  getCurrentLocation,
  getFirebaseUpdatedData,
  reference,
  shareLocationFirebase,
} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';

const useMapScreen = ({navigate}, {params}) => {
  const {item} = params.params;
  const [allMember, setAllMembers] = useState([]);
  const log = JSON.parse(item.end_destination);
  const [currentUser, setCurrentUser] = useState({
    coords: {
      latitude: log.latitude,
      longitude: log.longitude,
    },
    status: false,
  });
  const [destination, setDestination] = useState(
    JSON.parse(item.end_destination),
  );
  //   console.log('jabdjabvdjkbcvsjkdcvjsd', item);
  const {getState} = useReduxStore();
  const {userData} = getState('Auth');
  const getMembers = async () => {
    const {ok, data} = await getFirebaseData({
      tripId: item.id,
      tripOnnwerID: item.owner ? Number(item.user_id) : item.trip_owner.id,
    });
    if (ok) {
      console.log('jbcjksbdjkvbsdkjvbsdjbvjsd', data);
      if (!item.owner) {
        setAllMembers(() => data.filter(res => res.id != userData.id));
        setCurrentUser(() => data.filter(res => res.id == userData.id)[0]);
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
      const filterData = allMsg['0'].members.filter(
        member => member.status == true && member?.coords != null && true,
      );

      if (!item.owner) {
        setAllMembers(() => filterData.filter(res => res.id != userData.id));
        setCurrentUser(
          () => filterData.filter(res => res.id == userData.id)[0],
        );
      } else if (item.owner) {
        setAllMembers(filterData);
      }

      // setAllMembers(() => filterData.filter(res => res.id != userData.id));
      // setCurrentUser(() => filterData.filter(res => res.id == userData.id)[0]);
      // console.log(
      //   'shdvhjksdvkjsdkjvsdj,v,',
      //   allMsg['0'].members.filter(res => res.id == userData.id)[0],
      // );
    });
    return () => subscriber();
  };

  useEffect(useEffectFunc, []);

  return {
    allMember,
    destination: JSON.parse(item.end_destination),
    tripData: item,
    currentUser,
  };
};

export default useMapScreen;
