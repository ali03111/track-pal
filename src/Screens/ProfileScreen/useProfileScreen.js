import {useEffect, useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import {logOutUser, verifyUser} from '../../Redux/Action/AuthAction';
import API from '../../Utils/helperFunc';
import {deleteAccUrl} from '../../Utils/Urls';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {logoutService} from '../../Services/AuthServices';

const useProfileScreen = ({navigate, addListener}) => {
  const dynamicNav = path => navigate(path);
  const [alert, setAlert] = useState(false);
  const {dispatch, getState} = useReduxStore();
  const {userData} = getState('Auth');
  const onCancel = () => {
    setAlert(!alert);
  };

  console.log(
    'userDatauserDatauserDatauserDatauserDatauserDatauserData',
    userData?.subscription?.plan,
  );

  const deleteAccount = async () => {
    const {ok, data} = await API.delete(deleteAccUrl);
    if (ok) {
      successMessage(data?.message);
      await logoutService();
      dispatch(logOutUser());
    } else errorMessage(data?.message);
  };

  useEffect(() => {
    const event = addListener('focus', () => {
      dispatch(verifyUser());
    });
    return event;
  }, []);

  const onConfirm = () => {
    setAlert(false);
    setTimeout(async () => {
      await logoutService();
      dispatch(logOutUser());
    }, 900);
  };

  return {dynamicNav, alert, onCancel, onConfirm, userData, deleteAccount};
};

export default useProfileScreen;
