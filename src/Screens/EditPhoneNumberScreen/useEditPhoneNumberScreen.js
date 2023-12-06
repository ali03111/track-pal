import {firebase} from '@react-native-firebase/auth';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {successMessage, errorMessage} from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import auth from '@react-native-firebase/auth';
import {forgotPasswordAction} from '../../Redux/Action/AuthAction';
import {useState} from 'react';
import {sendVerficationCodeTwilo} from '../../Services/TwiloServices';
import API from '../../Utils/helperFunc';
import {
  SendVerficatioUrl,
  UpdateProfileUrl,
  sendNumberToServerUrl,
} from '../../Utils/Urls';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useEditPhoneNumber = ({navigate, goBack}) => {
  const {dispatch, getState} = useReduxStore();

  const {userData} = getState('Auth');

  const isNumber = Boolean(userData.phone == null || userData.phone == '');
  console.log('userDatauserDatauserDatauserData', userData);

  const [PhoneNumber, setPhoneNumber] = useState({
    countryCode: '',
    number: '',
    edit: isNumber,
  });

  const {countryCode, number, edit} = PhoneNumber;

  const updateState = data => setPhoneNumber(prev => ({...prev, ...data}));

  const sendVerfication = async num => {
    const {ok, data} = await API.get(SendVerficatioUrl + num);
    return {status: ok, res: data};
  };

  const sendVerficationCode = async () => {
    if (edit && number != null && number != '') {
      const {ok, data} = await API.post(UpdateProfileUrl, {phone: number});
      console.log('resresresresresresresresresresres', data);
      if (ok) {
        const {status, res} = await sendVerfication(number);
        // if (status) successMessage('VerficationScreen');
        if (status) navigate('VerficationScreen', {item: data.user});
        else errorMessage(res?.message);
      } else errorMessage(data?.message);
    } else if (!edit) {
      const {status, res} = await sendVerfication(userData.phone);
      // if (status) successMessage('VerficationScreen');
      if (status) navigate('VerficationScreen', {item: userData});
      else errorMessage(res?.message);
    }
  };

  return {
    goBack,
    sendVerficationCode,
    countryCode,
    number,
    updateState,
    edit,
    phoneNumber: userData?.phone,
  };
};

export default useEditPhoneNumber;
