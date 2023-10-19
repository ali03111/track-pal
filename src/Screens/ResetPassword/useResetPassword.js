import {firebase} from '@react-native-firebase/auth';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {successMessage, errorMessage} from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useResetPassword = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.newPassword,
  );
  const {dispatch} = useReduxStore();
  const changePassword = async currentPassword => {
    dispatch(loadingTrue());
    const {password, new_password, confirm_password} = currentPassword;
    console.log(password, new_password, confirm_password, 'asasadasd');
    var user = firebase.auth().currentUser;
    try {
      const reauthenticate = password => {
        // Pass only the password as an argument
        var crd = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password,
        );
        console.log('credential:', crd);
        return user.reauthenticateWithCredential(crd);
      };
      await reauthenticate(password); // Pass only the password
      await user.updatePassword(confirm_password);
      successMessage('Your password has been changed');
      goBack();
    } catch (error) {
      console.log('error:', error);
      errorMessage('Current password is wrong');
    } finally {
      dispatch(loadingFalse());
    }
  };

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    changePassword,
  };
};

export default useResetPassword;
