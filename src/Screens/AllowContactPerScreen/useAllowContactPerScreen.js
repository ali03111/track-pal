import {useState} from 'react';
import {
  checkContactPermission,
  checkSqlDataBase,
  getContactFromSql,
  sendPhoneBookTOServer,
} from '../../Services/ContactServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {contactTrue} from '../../Redux/Action/isContactAction';

const useAllowContactPerScreen = ({goBack}) => {
  const {getState, dispatch} = useReduxStore();

  const {userData} = getState('Auth');

  const [alertState, setAlertState] = useState(false);
  const [viewState, setViewState] = useState(0);

  const toggleAlert = () => setAlertState(!alertState);

  const onConfirm = async () => {
    setTimeout(() => {
      toggleAlert();
    }, 1000);
    const checkPer = await checkContactPermission();

    if (checkPer) {
      setViewState(1);
      if (userData.isNewUser) {
        await sendPhoneBookTOServer();
        await getContactFromSql();
        dispatch(contactTrue());
        setTimeout(() => {
          goBack();
        }, 1500);
      } else {
        checkSqlDataBase();
        await getContactFromSql();
        dispatch(contactTrue());
        setTimeout(() => {
          goBack();
        }, 1500);
      }
    }
  };

  return {toggleAlert, alertState, onConfirm, viewState};
};
export default useAllowContactPerScreen;
