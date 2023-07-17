import {useEffect, useState} from 'react';
import {
  getFirebaseData,
  getCurrentLocation,
} from '../../Services/FireBaseRealTImeServices';

const useMapScreen = ({navigate}, {params}) => {
  const {item} = params.params;
  const [allMember, setAllMembers] = useState([]);
  const [destination, setDestination] = useState(
    JSON.parse(item.end_destination),
  );
  //   console.log('jabdjabvdjkbcvsjkdcvjsd', item);

  const getMembers = async () => {
    const {ok, data} = await getFirebaseData({
      tripId: item.id,
      tripOnnwerID: item.trip_owner.id,
    });
    if (ok) {
      console.log('jbcjksbdjkvbsdkjvbsdjbvjsd', data);
      setAllMembers(data);
    } else console.log('get all members error', data);
  };

  const useEffectFunc = () => {
    getMembers();
    // getCurrentLocation()
  };

  useEffect(useEffectFunc, []);

  return {
    allMember,
    destination: JSON.parse(item.end_destination),
    tripData: item,
  };
};

export default useMapScreen;
