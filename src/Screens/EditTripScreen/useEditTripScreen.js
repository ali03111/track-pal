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
import {useState} from 'react';
import {trips} from '../../Utils/localDB';

const useEditTripScreen = () => {
  const [isTripCreated, setIsTripCreated] = useState(false);

  const updateState = () => {
    setIsTripCreated(!isTripCreated);
  };

  return {trips, updateState, isTripCreated};
};

export default useEditTripScreen;
