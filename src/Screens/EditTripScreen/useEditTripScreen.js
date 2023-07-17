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
import {updateLocationONfire} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';

const useEditTripScreen = ({addListener, navigate}) => {
  const [isTripCreated, setIsTripCreated] = useState(false);

  const [tripCardData, setTripCardData] = useState([]);
  const [invitedTrips, setInvitedTrip] = useState([]);

  const updateState = async (status, id, index) => {
    const {ok, data} = await API.post(changeOwnerStatusUrl, {
      status,
      id,
    });
    if (ok) {
      tripsCard();
      if (status == 1) {
        // setIsTripCreated(!isTripCreated);
        // setTimeout(() => {
        //   setIsTripCreated(!isTripCreated);
        //   // navigate('MapAndChatScreen', {item: tripCardData[index]});
        // }, 1000);
      }
      // updateLocationONfire({tripId:id})
      // status == 1 && setIsTripCreated(!isTripCreated);
    } else errorMessage('somfkle n');
  };

  const [activeSessionHelp, setActiveSessionHelp] = useState([]);

  const updateSectionsHelp = e => {
    setActiveSessionHelp(e);
  };
  const {dispatch} = useReduxStore();
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
          setIsTripCreated(!isTripCreated);
          dispatch(loadingFalse());
          setTimeout(() => {
            setIsTripCreated(!isTripCreated);
            navigate('MapAndChatScreen', {item: invitedTrips[index]});
          }, 1000);
        }, 1000);
        dispatch(loadingFalse());
      }
    } else errorMessage('somfkle n');
  };

  const tripsCard = async () => {
    const {ok, data} = await API.get(tripsData);
    if (ok) {
      // console.log('asdasdasd', data);
      setTripCardData(data.my_trips);
      setInvitedTrip(data.invitation_trips);
    }
  };

  const useEffectFuc = () => {
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
  };
};

export default useEditTripScreen;
