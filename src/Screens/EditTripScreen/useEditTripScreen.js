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

  const [tripCardData, setTripCardData] = useState([]);
  const [invitedTrips, setInvitedTrip] = useState([]);
  const [groupTrips, setGroupTrip] = useState([]);

  const {dispatch, getState} = useReduxStore();

  const {userData} = getState('Auth');

  const updateState = async (status, id, index) => {
    const {ok, data} = await API.post(changeOwnerStatusUrl, {
      status,
      id,
    });
    if (ok) {
      tripsCard();
      if (status == 1) {
        setIsTripCreated(true);
        setTimeout(() => {
          setIsTripCreated(false);
          navigate('MapAndChatScreen', {
            item: {...tripCardData[index], owner: true},
          });
        }, 1000);
      } else if (status == 2) {
        Geolocation.clearWatch();
      }
      // updateLocationONfire({tripId:id})
      // status == 1 && setIsTripCreated(!isTripCreated);
    } else console.log('datadatadatadata', data);
  };

  const [activeSessionHelp, setActiveSessionHelp] = useState([]);

  const updateSectionsHelp = e => {
    setActiveSessionHelp(e);
  };
  const changeMemberStatus = async (status, id, tripOnnwerID, index) => {
    const {ok, data} = await API.post(changeMemberStatusUrl, {
      status,
      id,
    });
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
        dispatch(loadingFalse());
      }
    } else errorMessage('somfkle n');
  };

  const changeMemberStatusGroup = async (status, id, tripOnnwerID, index) => {
    const {ok, data} = await API.post(changeMemberStatusUrl, {
      status,
      id,
    });
    console.log('datadatadatadatadatadatadatadata', data, status, id);
    if (ok) {
      tripsCard();
      dispatch(loadingTrue());
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
      } else if (status == 2) onEndTrip({tripId: id, tripOnnwerID, userData});
    } else errorMessage('somfkle n');
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
    tripsCard();
    // const event = addListener('focus', tripsCard);
    // return event;
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
