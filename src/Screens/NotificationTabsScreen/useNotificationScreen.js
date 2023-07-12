import React, {memo, useCallback, useEffect, useState} from 'react';

import {ChatData} from '../../Utils/localDB';
import {Invitation} from '../../Utils/localDB';
import {changeUserTripStatus, userTrips} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';

const useNotificationScreen = () => {
  const [tripNotification, setTripNotification] = useState([]);
  const [tripTime, setTripTime] = useState('');

  const getUserTrips = async () => {
    const {ok, data} = await API.get(userTrips);
    if (ok) {
      setTripNotification(data);
      // console.log('test', data);
    }
  };

  const tripStatus = async (status, id) => {
    const {ok, data} = await API.post(changeUserTripStatus, {status, id});
    if (ok) {
      setTripNotification(data.trips);
      console.log('response', data);
    }
  };

  const useEffectFuc = () => {
    getUserTrips();
  };

  useEffect(useEffectFuc, []);

  return {
    ChatData,
    Invitation,
    tripNotification,
    tripStatus,
    getUserTrips,
  };
};
export default useNotificationScreen;
