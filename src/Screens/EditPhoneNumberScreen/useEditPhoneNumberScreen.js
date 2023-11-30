import {firebase} from '@react-native-firebase/auth';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {successMessage, errorMessage} from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import auth from '@react-native-firebase/auth';
import {forgotPasswordAction} from '../../Redux/Action/AuthAction';
import {useState} from 'react';
import {sendVerficationCodeTwilo} from '../../Services/TwiloServices';
import API from '../../Utils/helperFunc';
import {SendVerficatioUrl} from '../../Utils/Urls';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useEditPhoneNumber = ({navigate, goBack}) => {
  const {dispatch, getState} = useReduxStore();

  const {userData} = getState('Auth');

  console.log('userDatauserDatauserDatauserData', userData);

  const [PhoneNumber, setPhoneNumber] = useState({
    countryCode: '',
    number: userData?.phone,
  });

  const {countryCode, number} = PhoneNumber;

  const updateState = data => setPhoneNumber(prev => ({...prev, ...data}));

  const sendVerficationCode = async () => {
    if (number != '' && number != undefined) {
      console.log('numbernumbernumber', number, countryCode);
      const {ok, data} = await API.get(SendVerficatioUrl + countryCode);
      console.log('skdskjsjdjskjdkjsdjskjdjskdjksd', data);
    } else errorMessage('Please enter your number');
    // updateState
  };

  return {
    goBack,
    sendVerficationCode,
    countryCode,
    number,
    updateState,
  };
};

export default useEditPhoneNumber;
