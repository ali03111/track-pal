import React, {memo, useCallback, useEffect, useState} from 'react';

import {ChatData, tripsTypes} from '../../Utils/localDB';
import {Invitation} from '../../Utils/localDB';
import {
  changeUserTripStatus,
  notificationUrl,
  userTrips,
} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import {updateDataFirebase} from '../../Services/FireBaseRealTImeServices';
import {errorMessage} from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {types} from '../../Redux/types';

const useNotificationScreen = ({params}, {navigate, addListener}) => {
  const [tripNotification, setTripNotification] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const {dispatch} = useReduxStore();

  const getUserTrips = async () => {
    const {ok, data} = await API.get(userTrips);
    if (ok) {
      console.log('datadatadatadatadata', data);
      setTripNotification(data);
    } else errorMessage('an error occured');
  };

  const tripStatus = async (status, id, tripOnnwerID, indexNumber) => {
    setCurrentIndex(indexNumber);
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
          setShowAlert(!showAlert);
        } else {
          console.log('errrrrrrrrrrrrr', data);
          dispatch(loadingFalse());
        }
      } else {
        setTripNotification(data.trips);
        dispatch(loadingFalse());
      }
    } else {
      dispatch(loadingFalse());
      errorMessage('some thing is wrong');
    }
  };

  const screenName = {
    [tripsTypes[0].id]: 'Invited Trips',
    [tripsTypes[1].id]: 'Group Trips',
    [tripsTypes[2].id]: 'Personal Trips',
  };

  const toggleButton = () => {
    setShowAlert(!showAlert);
    if (showAlert) {
      navigate('EditTripScreen', {
        item: tripNotification[currentIndex],
        sendTo: screenName[tripNotification[currentIndex].type],
      });
      setTimeout(() => {
        navigate(screenName[tripNotification[currentIndex].type]);
      }, 1000);
    } else setShowAlert(false);
  };

  const useEffectFuc = () => {
    const event = addListener('focus', () => {
      getUserTrips();
      dispatch({type: types.ClearNotifyInvitation});
    });
    return event;
  };

  useEffect(useEffectFuc, []);

  return {
    ChatData,
    Invitation,
    tripNotification,
    tripStatus,
    getUserTrips,
    showAlert,
    toggleButton,
    setCurrentIndex,
  };
};
export default useNotificationScreen;
