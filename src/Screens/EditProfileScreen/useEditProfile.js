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
import API, {formDataFunc} from '../../Utils/helperFunc';
import {UpdateProfileUrl} from '../../Utils/Urls';
import {launchImageLibrary} from 'react-native-image-picker';
import {types} from '../../Redux/types';
import {updateUser} from '../../Redux/Action/AuthAction';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {Platform} from 'react-native';
const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');
const useEditProfile = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.editProfile,
  );
  const {getState, dispatch} = useReduxStore();

  const {userData} = getState('Auth');
  console.log(Platform.OS == 'ios', 'userData', userData);
  const navigateToReset = () => navigate('ResetPasswordScreen');

  //GET IMAGE From Mobile
  const [profileData, setProfileData] = useState(null);
  const uploadFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
      },
      res => {
        if (!res?.didCancel) {
          console.log('imag222e', res.assets);
          setProfileData(res?.assets[0]);
        }
      },
    );
  };

  //UPDATE PROFILE
  const updateProfileFunction = async currentValue => {
    // const formdata = new FormData();
    // Object.entries(currentValue).forEach(([key, value]) => {
    //   if (profileData?.type) {
    //     formdata.append('profile_image', {
    //       uri: profileData.uri,
    //       type: profileData.type,
    //       name: profileData.fileName,
    //     });
    //   }
    //   formdata.append(key, value);
    // });
    try {
      // const {ok, data, originalError} = await API.post(
      //   UpdateProfileUrl,
      //   formdata,
      // );
      const {ok, data} = await formDataFunc(
        UpdateProfileUrl,
        {...currentValue, profileData},
        'profile_image',
      );
      console.log(ok, data, 'uueueue');
      if (ok) {
        successMessage(data.message);
        dispatch({type: types.UpdateProfile, payload: data.user});
      }
    } catch (e) {
      errorMessage(e.message.split(' ').slice(1).join(' ') ?? e);
    }
  };

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    navigateToReset,
    updateProfileFunction,
    uploadFromGalary,
    profileData,
    userData,
  };
};

export default useEditProfile;
