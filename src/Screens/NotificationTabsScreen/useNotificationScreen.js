import React, {memo, useCallback, useEffect, useState} from 'react';

import {ChatData} from '../../Utils/localDB';
import {Invitation} from '../../Utils/localDB';
import {changeUserTripStatus, userTrips} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import {updateDataFirebase} from '../../Services/FireBaseRealTImeServices';
import {errorMessage} from '../../Config/NotificationMessage';

const useNotificationScreen = () => {
  const [tripNotification, setTripNotification] = useState([]);
  const [tripTime, setTripTime] = useState('');

  const getUserTrips = async () => {
    const {ok, data} = await API.get(userTrips);
    if (ok) {
      setTripNotification(data);
    } else errorMessage('some error wentn');
  };

  const tripStatus = async (status, id, tripOnnwerID) => {
    const {ok, data} = await API.post(changeUserTripStatus, {status, id});
    if (ok) {
      if (status == 1) {
        const {ok} = await updateDataFirebase({
          tripId: id,
          tripOnnwerID,
        });
        if (ok) {
          setTripNotification(data.trips);
        }
      } else setTripNotification(data.trips);
    } else errorMessage('lkbdvlkbsdlvbsldb');
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
