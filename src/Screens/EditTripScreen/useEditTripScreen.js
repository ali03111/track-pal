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

const useEditTripScreen = ({addListener, navigate}, {params}) => {
  console.log(
    'EditTripScreenEditTripScreenEditTripScreenEditTripScrsdsdsdsdsdeenEditTripScreenEditTripScreen',
    params?.params?.item,
  );

  const routeName = params?.params?.sendTo;

  const [isTripCreated, setIsTripCreated] = useState(false);
  const [tripCardData, setTripCardData] = useState(null);
  const [invitedTrips, setInvitedTrip] = useState(null);
  const [groupTrips, setGroupTrip] = useState(null);
  const [perssonalTrips, setPerssonalTrip] = useState(null);

  const {dispatch, getState} = useReduxStore();

  const {userData} = getState('Auth');
  const {chatNotify} = getState('chatNotify');

  const checkLenght = id => {
    let givenID = JSON.stringify(id);
    return chatNotify[givenID] ? chatNotify[givenID].length : 0;
  };
  const updateState = async (status, id, index, ownerStatus) => {
    const y = ownerStatus
      ? {...perssonalTrips[index]}
      : {...tripCardData[index]};

    const {ok, data, originalError} = await API.post(changeOwnerStatusUrl, {
      status,
      id,
    });
    dispatch(loadingTrue());
    if (ok) {
      tripsCard();
      if (status == 1) {
        if (ownerStatus) {
          await updateDataFirebase({
            tripId: id,
            tripOnnwerID: perssonalTrips[index].user_id,
          });
          await updateLocationONfire({
            tripId: id,
            tripOnnwerID: perssonalTrips[index].user_id,
          });
        }
        setTimeout(() => {
          setIsTripCreated(true);
          dispatch(loadingFalse());
          setTimeout(() => {
            setIsTripCreated(false);
            navigate('MapAndChatScreen', {
              item: {...y, owner: !ownerStatus ? true : false},
            });
          }, 1000);
        }, 2000);
        // setIsTripCreated(true);
        // dispatch(loadingFalse());
        // setTimeout(() => {
        //   setIsTripCreated(false);
        //   navigate('MapAndChatScreen', {
        //     item: {...y, owner: !ownerStatus ? true : false},
        //   });
        // }, 1000);
      } else if (status == 2) {
        ownerStatus &&
          onEndTrip({
            tripId: id,
            tripOnnwerID: perssonalTrips[index].user_id,
            userData,
          });
        Geolocation.clearWatch();
        dispatch(loadingFalse());
      }
      // updateLocationONfire({tripId:id})
      // status == 1 && setIsTripCreated(!isTripCreated);
    } else {
      dispatch(loadingFalse());
      errorMessage(originalError.message);
      console.log('datadatadatadata', data);
    }
  };

  const [activeSessionHelp, setActiveSessionHelp] = useState([]);

  const updateSectionsHelp = e => {
    setActiveSessionHelp(e);
  };
  const changeMemberStatus = async (status, id, tripOnnwerID, index) => {
    console.log('dvchsvcsdb kjsdjk bskd');
    try {
      const {ok, data, originalError} = await API.post(changeMemberStatusUrl, {
        status,
        id,
      });
      console.log('datadatadatadatadata', data);
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
        errorMessage(data.message);
      }
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
      dispatch(loadingFalse());
      errorMessage('An error occurred: ' + data.message);
    }
  };

  // const screenName = {
  //   [tripsTypes[0].id]:()=> changeMemberStatus(),
  //   [tripsTypes[1].id]: 'Group Trips',
  //   [tripsTypes[2].id]: 'Personal Trips',
  // };

  const changeMemberStatusGroup = async (status, id, tripOnnwerID, index) => {
    const {ok, data, originalError} = await API.post(changeMemberStatusUrl, {
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
      errorMessage(data.message);
      dispatch(loadingFalse());
    }
  };

  const tripsCard = async () => {
    const {ok, data} = await API.get(tripsData);
    console.log(
      'data.personal_tripsdata.personal_tripsdata.personal_tripsdata.personal_trips',
      data.personal_trips,
    );
    if (ok) {
      setTripCardData(data.my_trips);
      setInvitedTrip(data.invitation_trips);
      setGroupTrip(data.group_trips);
      setPerssonalTrip(data.personal_trips);
    }
  };

  useEffect(() => {
    console.log(
      'sdsdsddchatNotifychatNotifychatNotifychatNotifychatNotifychatNotifychatNotify',
      chatNotify,
    );
  }, [chatNotify]);

  const useEffectFuc = () => {
    // tripsCard();
    routeName && navigate(routeName);
    // routeName && changeMemberStatus(1,routeName.id,routeName.trip_owner.id);

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
    perssonalTrips,
    userData,
    checkLenght,
  };
};

export default useEditTripScreen;
