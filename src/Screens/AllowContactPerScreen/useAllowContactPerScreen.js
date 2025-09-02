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
  const [uploadState, setUploadState] = useState(false);
  const [viewState, setViewState] = useState(0);

  const toggleAlert = () => setAlertState(!alertState);
  const toggleUpload = () => setUploadState(!uploadState);

  const onConfirmUpload = async () => {
    setTimeout(() => {
      toggleUpload();
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

  const onConfirm = async () => {
    setTimeout(() => {
      toggleAlert();
    }, 1000);
    await checkContactPermission();
    toggleUpload();
  };

  return {
    toggleAlert,
    alertState,
    onConfirm,
    viewState,
    toggleUpload,
    uploadState,
    onConfirmUpload,
  };
};
export default useAllowContactPerScreen;
