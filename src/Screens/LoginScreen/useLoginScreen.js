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
import {
  appleIdlogin,
  faceBookLogin,
  googleLogin,
} from '../../Utils/SocialLogin';
import {getFbResult} from '../../Services/AuthServices';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useLogin = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.logIn,
  );
  const [remember, setRemember] = useState(false);
  const rememberValue = () => {
    setRemember(!remember);
  };

  const onPress = () => navigate('RegisterScreen');

  const loginUser = () => navigate('MybottomTabs');

  const socialLogin = async () => {
    const f = await appleIdlogin();
    const tod = await getFbResult();
    console.log('sdfsdf', tod);
  };

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    facebookLoginFunc: () => {},
    googleLoginFunc: () => {},
    PhoneNumberLoginFuc: () => {},
    remember,
    setRemember,
    rememberValue,
    onPress,
    loginUser,
    socialLogin,
  };
};

export default useLogin;
