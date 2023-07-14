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
import {tripsData} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';

const useEditTripScreen = () => {
  const [isTripCreated, setIsTripCreated] = useState(false);

  const updateState = () => {
    setIsTripCreated(!isTripCreated);
  };

  const [tripCardData, setTripCardData] = useState([]);

  const tripsCard = async () => {
    const {ok, data} = await API.get(tripsData);
    if (ok) {
      // console.log('asdasdasd', data);
      setTripCardData(data.invitation_trips);
    }
  };

  const useEffectFuc = () => {
    tripsCard();
  };

  useEffect(useEffectFuc, []);

  return {trips, updateState, isTripCreated, tripCardData};
};

export default useEditTripScreen;
