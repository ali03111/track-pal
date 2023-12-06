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
  console.log('useruseruseruseruseruseruseruseruseruseruseruser', params);
  const {dispatch, getState} = useReduxStore();
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const VerifyCode = async () => {
    let url = verifyNumberUrl + params.item.phone + '/' + value;
    const {ok, data} = await API.get(url);
    if (ok) {
      dispatch({type: types.UpdateProfile, payload: params.item});
      successMessage('Your number have been verified');
      popToTop();
      // reset('MybottomTabs');
      // navigate();
    } else {
      console.log('jkasbjkabsdas', data);
      errorMessage(data?.message);
    }
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
  };
};

export default useVerificationScreen;
