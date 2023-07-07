import {useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import {logOutUser} from '../../Redux/Action/AuthAction';

const useProfileScreen = ({navigate}) => {
  const dynamicNav = path => navigate(path);
  const [alert, setAlert] = useState(false);
  const {dispatch} = useReduxStore();
  const onCancel = () => {
    setAlert(!alert);
  };

  const onConfirm = () => {
    setAlert(false);
    setTimeout(() => {
      dispatch(logOutUser());
    }, 1);
  };

  return {dynamicNav, alert, onCancel, onConfirm};
};

export default useProfileScreen;
