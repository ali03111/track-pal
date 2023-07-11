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
import useReduxStore from '../../Hooks/UseReduxStore';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useEditProfile = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.editProfile,
  );
  const {getState, dispatch} = useReduxStore();

  const {userData} = getState('Auth');
  console.log('userData', userData);
  const navigateToReset = () => navigate('ResetPasswordScreen');

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    navigateToReset,
  };
};

export default useEditProfile;
