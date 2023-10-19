import {useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import {logOutUser} from '../../Redux/Action/AuthAction';

const useProfileScreen = ({navigate}) => {
  const dynamicNav = path => navigate(path);
  const [alert, setAlert] = useState(false);
  const {dispatch, getState} = useReduxStore();
  const {userData} = getState('Auth');
  const onCancel = () => {
    setAlert(!alert);
  };

  const onConfirm = () => {
    setAlert(false);
    setTimeout(() => {
      dispatch(logOutUser());
    }, 100);
  };

  return {dynamicNav, alert, onCancel, onConfirm, userData};
};

export default useProfileScreen;
