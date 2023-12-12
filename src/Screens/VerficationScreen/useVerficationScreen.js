import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {successMessage, errorMessage} from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import auth from '@react-native-firebase/auth';
import {forgotPasswordAction} from '../../Redux/Action/AuthAction';
import {useRef, useState} from 'react';
import {sendVerficationCodeTwilo} from '../../Services/TwiloServices';
import API from '../../Utils/helperFunc';
import {
  SendVerficatioUrl,
  UpdateProfileUrl,
  sendNumberToServerUrl,
  verifyNumberUrl,
} from '../../Utils/Urls';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {types} from '../../Redux/types';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useVerificationScreen = (
  {navigate, goBack, reset, popToTop},
  {params},
) => {
  const refTimer = useRef();
  const {dispatch, getState} = useReduxStore();
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const [isResend, setIsResend] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const VerifyCode = async () => {
    let url = verifyNumberUrl + params.item.phone + '/' + value;
    const {ok, data} = await API.get(url);
    if (ok) {
      dispatch({
        type: types.UpdateProfile,
        payload: {...params.item, is_verified: 1},
      });
      successMessage('Your number have been verified');
      popToTop();
    } else {
      errorMessage(data?.message);
    }
  };

  const sendVerfication = async num => {
    const {ok, data} = await API.get(SendVerficatioUrl + num);
    if (ok) successMessage('OTP has been send your verification number.');
    else errorMessage('Some error to send OTP!');
  };

  const resendOTP = () => {
    refTimer.current.resetTimer();
    setIsResend(false);
    sendVerfication(params.item.phone);
  };

  const timerCallbackFunc = timerFlag => {
    // Setting timer flag to finished
    setIsResend(true);
    console.warn(
      'You can alert the user by letting him know that Timer is out.',
    );
  };

  return {
    props,
    getCellOnLayoutHandler,
    value,
    setValue,
    ref,
    CELL_COUNT,
    VerifyCode,
    goBack,
    isResend,
    setIsResend,
    refTimer,
    timerCallbackFunc,
    resendOTP,
  };
};

export default useVerificationScreen;
