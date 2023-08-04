// import {errorMessage} from '../../Components/NotificationMessage';
// import {loginUser} from '../../Redux/Actions/AuthAction';
// import API from '../../Utils/helperFunction';
// import {
//   faceBookLogin,
//   googleLogin,
//   PhoneNumberLogin,
//   verifyCode,
// } from '../../Utils/SocialLogin';
// import {loginUrl} from '../../Utils/Url';
import {useEffect, useState} from 'react';
import {trips} from '../../Utils/localDB';
import {
  changeMemberStatusUrl,
  changeOwnerStatusUrl,
  tripsData,
} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import {errorMessage} from '../../Config/NotificationMessage';
import {
  onEndTrip,
  updateDataFirebase,
  updateLocationONfire,
} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import Geolocation from '@react-native-community/geolocation';

const useEditTripScreen = ({addListener, navigate}) => {
  const [isTripCreated, setIsTripCreated] = useState(false);

  const [tripCardData, setTripCardData] = useState(null);
  const [invitedTrips, setInvitedTrip] = useState(null);
  const [groupTrips, setGroupTrip] = useState(null);

  const {dispatch, getState} = useReduxStore();

  const {userData} = getState('Auth');

  const updateState = async (status, id, index) => {
    const {ok, data} = await API.post(changeOwnerStatusUrl, {
      status,
      id,
    });
    dispatch(loadingTrue());
    if (ok) {
      tripsCard();
      if (status == 1) {
        setIsTripCreated(true);
        dispatch(loadingFalse());
        setTimeout(() => {
          setIsTripCreated(false);
          navigate('MapAndChatScreen', {
            item: {...tripCardData[index], owner: true},
          });
        }, 1000);
      } else if (status == 2) {
        Geolocation.clearWatch();
        dispatch(loadingFalse());
      }
      // updateLocationONfire({tripId:id})
      // status == 1 && setIsTripCreated(!isTripCreated);
    } else {
      dispatch(loadingFalse());
      console.log('datadatadatadata', data);
    }
  };

  const [activeSessionHelp, setActiveSessionHelp] = useState([]);

  const updateSectionsHelp = e => {
    setActiveSessionHelp(e);
  };
  const changeMemberStatus = async (status, id, tripOnnwerID, index) => {
    try {
      const {ok, data} = await API.post(changeMemberStatusUrl, {
        status,
        id,
      });
      dispatch(loadingTrue());
      if (ok) {
        tripsCard();
        dispatch(loadingTrue());
        if (status == 1) {
          await updateLocationONfire({tripId: id, tripOnnwerID});
          setTimeout(() => {
            setIsTripCreated(true);
            dispatch(loadingFalse());
            setTimeout(() => {
              setIsTripCreated(false);
              navigate('MapAndChatScreen', {item: invitedTrips[index]});
            }, 1000);
          }, 2000);
        } else if (status == 2) {
          onEndTrip({tripId: id, tripOnnwerID, userData});
          dispatch(loadingFalse());
        }
      } else {
        dispatch(loadingFalse());
        errorMessage('some thing went wrong');
      }
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
      dispatch(loadingFalse());
      errorMessage('An error occurred: ' + error.message);
    }
  };

  const changeMemberStatusGroup = async (status, id, tripOnnwerID, index) => {
    const {ok, data} = await API.post(changeMemberStatusUrl, {
      status,
      id,
    });
    dispatch(loadingTrue());
    if (ok) {
      tripsCard();
      if (status == 1) {
        tripOnnwerID == userData.id &&
          (await updateDataFirebase({tripId: id, tripOnnwerID}));
        await updateLocationONfire({tripId: id, tripOnnwerID});
        setTimeout(() => {
          setIsTripCreated(true);
          dispatch(loadingFalse());
          setTimeout(() => {
            setIsTripCreated(false);
            navigate('MapAndChatScreen', {item: groupTrips[index]});
          }, 1000);
        }, 2000);
        dispatch(loadingFalse());
      } else if (status == 2) {
        onEndTrip({tripId: id, tripOnnwerID, userData});
        dispatch(loadingFalse());
      }
    } else {
      errorMessage('somfkle n');
      dispatch(loadingFalse());
    }
  };

  const tripsCard = async () => {
    const {ok, data} = await API.get(tripsData);
    if (ok) {
      setTripCardData(data.my_trips);
      setInvitedTrip(data.invitation_trips);
      setGroupTrip(data.group_trips);
    }
  };

  const useEffectFuc = () => {
    // tripsCard();
    const event = addListener('focus', tripsCard);
    return event;
  };

  useEffect(useEffectFuc, []);

  return {
    trips,
    updateState,
    isTripCreated,
    tripCardData,
    activeSessionHelp,
    updateSectionsHelp,
    invitedTrips,
    tripsCard,
    changeMemberStatus,
    groupTrips,
    changeMemberStatusGroup,
  };
};

export default useEditTripScreen;
