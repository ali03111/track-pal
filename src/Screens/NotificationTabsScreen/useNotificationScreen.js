import React, {memo, useCallback, useEffect, useState} from 'react';

import {ChatData} from '../../Utils/localDB';
import {Invitation} from '../../Utils/localDB';
import {changeUserTripStatus, userTrips} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import {updateDataFirebase} from '../../Services/FireBaseRealTImeServices';
import {errorMessage} from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';

const useNotificationScreen = ({params}, {navigate}) => {
  const [tripNotification, setTripNotification] = useState([]);
  const [tripTime, setTripTime] = useState('');
  const {dispatch} = useReduxStore();
  const getUserTrips = async () => {
    const {ok, data} = await API.get(userTrips);
    if (ok) {
      setTripNotification(data);
    } else errorMessage('an error occured');
  };

  const tripStatus = async (status, id, tripOnnwerID) => {
    const {ok, data} = await API.post(changeUserTripStatus, {status, id});
    if (ok) {
      dispatch(loadingTrue());
      if (status == 1) {
        const {ok} = await updateDataFirebase({
          tripId: id,
          tripOnnwerID,
        });
        if (ok) {
          setTripNotification(data.trips);
          dispatch(loadingFalse());
        } else dispatch(loadingFalse());
      } else {
        setTripNotification(data.trips);
        dispatch(loadingFalse());
      }
    } else {
      dispatch(loadingFalse());
      errorMessage('some thing is wrong');
    }
  };

  const useEffectFuc = () => {
    getUserTrips();
    console.log('paramsparamsparamsparamsparamsparams', params);
    setTimeout(() => {
      params?.sendTo && navigate(params?.sendTo);
    }, 1000);
    // params?.sendTo && navigate(params?.sendTo);
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
