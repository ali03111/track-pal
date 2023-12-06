// import {errorMessage} from '../../Components/NotificationMessage';
// import {loginUser} from '../../Redux/Actions/AuthAction';
// import API from '../../Utils/helperFunction';
// import {
//   faceBookLogin,
//   googleLogin,
//   PhoneNumberLogin,
//   verifyCode,
// } from '../../Utils/SocialLogin';
// import {loginUrl} from '../../Utils/Url';
import {useEffect, useState} from 'react';
import {trips} from '../../Utils/localDB';
import {
  changeMemberStatusUrl,
  changeOwnerStatusUrl,
  createTripImage,
  deleteTripUrl,
  editTripUrl,
  getAllUser,
  tripsData,
} from '../../Utils/Urls';
import API, {formDataFunc} from '../../Utils/helperFunc';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {
  deleteDataOnFirebase,
  onEndTrip,
  updateDataFirebase,
  updateLocationONfire,
  updateTripDataonFirebase,
} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import Geolocation from '@react-native-community/geolocation';
import {showMessage} from 'react-native-flash-message';
import {types} from '../../Redux/types';
import {Keyboard} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {getContactFromSql, sendUpdatedAt} from '../../Services/ContactServices';

const useEditTripScreen = ({addListener, navigate}, {params}) => {
  const routeName = params?.params?.sendTo;

  const [isTripCreated, setIsTripCreated] = useState(false);
  const [tripCardData, setTripCardData] = useState(null);
  const [invitedTrips, setInvitedTrip] = useState(null);
  const [groupTrips, setGroupTrip] = useState(null);
  const [perssonalTrips, setPerssonalTrip] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [modalsState, setModalsState] = useState({
    editTripData: null,
    infoModal: false,
    editModal: false,
    tripName: null,
    tripMemebers: [],
    tripPicture: null,
    keyboardType: false,
    allUser: [],
    userModal: false,
  });

  const {
    editModal,
    editTripData,
    infoModal,
    tripMemebers,
    tripName,
    tripPicture,
    keyboardType,
    allUser,
    userModal,
  } = modalsState;

  const updateModalsState = data =>
    setModalsState(prev => ({...prev, ...data}));

  const {dispatch, getState} = useReduxStore();
  const {contacts} = getState('contacts');

  const {userData} = getState('Auth');
  const {chatNotify} = getState('chatNotify');

  const checkLenght = id => {
    let givenID = JSON.stringify(id);
    return chatNotify[givenID] ? chatNotify[givenID].length : 0;
  };
  const updateState = async (status, id, index, ownerStatus) => {
    const y = ownerStatus
      ? {...perssonalTrips[index]}
      : {...tripCardData[index]};

    const {ok, data, originalError} = await API.post(changeOwnerStatusUrl, {
      status,
      id,
    });
    dispatch(loadingTrue());
    if (ok) {
      dispatch(loadingTrue());
      tripsCard();
      if (status == 1) {
        dispatch(loadingTrue());
        if (ownerStatus) {
          dispatch(loadingTrue());
          await updateDataFirebase({
            tripId: id,
            tripOnnwerID: perssonalTrips[index].user_id,
          });
          await updateLocationONfire({
            tripId: id,
            tripOnnwerID: perssonalTrips[index].user_id,
          });
        }
        setTimeout(() => {
          setIsTripCreated(true);
          setTimeout(() => {
            dispatch(loadingFalse());
            setIsTripCreated(false);
            navigate('MapAndChatScreen', {
              item: {...y, owner: !ownerStatus ? true : false},
            });
          }, 1000);
        }, 2000);
        // setIsTripCreated(true);
        // dispatch(loadingFalse());
        // setTimeout(() => {
        //   setIsTripCreated(false);
        //   navigate('MapAndChatScreen', {
        //     item: {...y, owner: !ownerStatus ? true : false},
        //   });
        // }, 1000);
      } else if (status == 2) {
        ownerStatus &&
          onEndTrip({
            tripId: id,
            tripOnnwerID: perssonalTrips[index].user_id,
            userData,
          });
        Geolocation.clearWatch();
        dispatch(loadingFalse());
      }
      // updateLocationONfire({tripId:id})
      // status == 1 && setIsTripCreated(!isTripCreated);
    } else {
      dispatch(loadingFalse());
      errorMessage(data.message);
      console.log('datadatadatadata', data);
    }
  };

  const [activeSessionHelp, setActiveSessionHelp] = useState([]);

  const updateSectionsHelp = e => {
    setActiveSessionHelp(e);
  };
  const changeMemberStatus = async (status, id, tripOnnwerID, index) => {
    console.log('dvchsvcsdb kjsdjk bskd');
    try {
      const {ok, data, originalError} = await API.post(changeMemberStatusUrl, {
        status,
        id,
      });
      console.log('datadatadatadatadata', data);
      dispatch(loadingTrue());
      if (ok) {
        tripsCard();
        dispatch(loadingTrue());
        if (status == 1) {
          dispatch(loadingTrue());
          await updateLocationONfire({tripId: id, tripOnnwerID});
          setTimeout(() => {
            setIsTripCreated(true);
            setTimeout(() => {
              dispatch(loadingFalse());
              setIsTripCreated(false);
              navigate('MapAndChatScreen', {item: invitedTrips[index]});
            }, 1000);
          }, 2000);
        } else if (status == 2) {
          onEndTrip({tripId: id, tripOnnwerID, userData});
          dispatch(loadingFalse());
        }
      } else {
        await tripsCard();
        dispatch(loadingFalse());
        errorMessage(data.message);
      }
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
      dispatch(loadingFalse());
      errorMessage('An error occurred: ' + data.message);
    }
  };

  // const screenName = {
  //   [tripsTypes[0].id]:()=> changeMemberStatus(),
  //   [tripsTypes[1].id]: 'Group Trips',
  //   [tripsTypes[2].id]: 'Personal Trips',
  // };

  const changeMemberStatusGroup = async (status, id, tripOnnwerID, index) => {
    const {ok, data, originalError} = await API.post(changeMemberStatusUrl, {
      status,
      id,
    });
    dispatch(loadingTrue());
    if (ok) {
      tripsCard();
      if (status == 1) {
        if (tripOnnwerID == userData.id) {
          await updateDataFirebase({tripId: id, tripOnnwerID});
        }
        await updateLocationONfire({tripId: id, tripOnnwerID});
        setTimeout(() => {
          setIsTripCreated(true);
          dispatch(loadingFalse());
          setTimeout(() => {
            setIsTripCreated(false);
            navigate('MapAndChatScreen', {item: groupTrips[index]});
          }, 1000);
        }, 2000);
        dispatch(loadingFalse());
      } else if (status == 2) {
        onEndTrip({tripId: id, tripOnnwerID, userData});
        dispatch(loadingFalse());
      }
    } else {
      await tripsCard();
      console.log('dfdfdfdfdfdfdfd', data);
      errorMessage(data.message);
      dispatch(loadingFalse());
    }
  };

  const deleteTrip = async (id, tripId) => {
    let isOwner = Boolean(id == userData.id);
    if (isOwner) {
      const {ok, data} = await API.get(deleteTripUrl + tripId);
      if (ok) {
        successMessage('Your trip has been deleted');
        deleteDataOnFirebase({tripId, tripOnnwerID: id});
        dispatch({
          type: types.clearNofityObjByID,
          payload: tripId.id,
        });
        tripsCard();
      } else errorMessage(data?.message);
    } else errorMessage('Only owner can delete this trip!');
  };

  const openInfoModal = trip => {
    console.log('sdlhfsdhflksdhflhsdkfhklsdhflksdhflksdhflkhsdlkfhlskdhflksd');
    let isOwner = Boolean(trip.user_id == userData.id);
    if (isOwner) {
      updateModalsState({editTripData: trip});
      updateModalsState({infoModal: true});
    } else errorMessage('Only owner can delete this trip!');
  };

  const tripsCard = async () => {
    const {ok, data} = await API.get(tripsData);
    console.log('sdsdsdsdsdsdsdds', ok, data);
    if (ok) {
      setTripCardData(data.my_trips);
      setInvitedTrip(data.invitation_trips);
      setGroupTrip(data.group_trips);
      setPerssonalTrip(data.personal_trips);
    } else {
      errorMessage(data?.message);
      setTripCardData([]);
      setInvitedTrip([]);
      setGroupTrip([]);
      setPerssonalTrip([]);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      updateModalsState({keyboardType: true});
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      updateModalsState({keyboardType: false});
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const getUser = async () => {
    await getContactFromSql();
    console.log('contactscontactscontactscontactscontactscontacts', contacts);
    updateModalsState({allUser: contacts});
  };

  const useEffectFuc = () => {
    const event = addListener('focus', () => {
      getUser();
      tripsCard();
    });
    return event;
  };

  const addMembersToGroup = users => {
    if (Boolean(tripMemebers.find(res => res.id == users.id))) {
      updateModalsState({
        tripMemebers: tripMemebers.filter(res => res.id != users.id),
      });
    } else {
      updateModalsState({tripMemebers: [...tripMemebers, users]});
    }
  };

  const filterIDSfromArry = arry => arry.map(res => res.id);

  const onCloseModal = () => {
    updateModalsState({
      editTripData: null,
      infoModal: false,
      editModal: false,
      tripName: null,
      tripMemebers: [],
      tripPicture: null,
      keyboardType: false,
    });
    setUpdateError('');
  };
  let regexp = /^(?![\s\b]).*/;
  const errorObj = {
    tripName: () => {
      if (tripName != '' && regexp.test(tripName) && tripName != undefined) {
        setUpdateError('');
        return true;
      } else {
        setUpdateError('Trip name is required');
        return false;
      }
    },
  };

  const updateTripImage = async params => {
    setTimeout(() => {
      dispatch(loadingTrue());
    }, 1000);
    const {ok, data} = await formDataFunc(
      createTripImage,
      {
        trip_id: params.trip_id,
        profileData: tripPicture,
      },
      'image',
    );
    return {status: ok, res: data};
  };

  const updateTripData = async () => {
    let isError = true;
    // let isError = errorObj['tripName']();
    dispatch(loadingTrue());
    try {
      if (isError) {
        const {ok, data, originalError} = await API.post(editTripUrl, {
          name: tripName ?? editTripData.name,
          user_ids:
            tripMemebers.length > 0
              ? filterIDSfromArry(tripMemebers)
              : filterIDSfromArry(editTripData.users),
          id: editTripData.id,
        });
        console.log('kjdbkjsdbkjbsdjkbfjksdbfd', data);
        if (tripPicture != null && ok) {
          var {status, res} = await updateTripImage(data);
        }
        if ((tripPicture != null && status) || (tripPicture == null && ok)) {
          const {ok} = await updateTripDataonFirebase({
            tripId: data.trip_id,
            tripOnnwerID: userData.id,
            tripName,
            tripImage: data?.image || null,
            remove_users: data.remove_users,
            new_users: data.new_users,
          });
          dispatch(loadingFalse());
          onCloseModal();
          tripsCard();
          console.log('okokokokokok', ok);
        }
        if (!ok) setUpdateError(data?.errors?.name[0] ?? data.message);
      } else {
        setUpdateError(data?.errors?.name[0] ?? data.message);
        dispatch(loadingFalse());
        console.log('error');
      }
    } catch (error) {
      errorMessage(error);
      setUpdateError(error);
      dispatch(loadingFalse());
      console.log('skljdfjksbdkfbsdjkbfjksdbjkfbsdjbfsd', error);
    }
  };

  const uploadFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
      },
      res => {
        if (!res?.didCancel) {
          console.log('imag222e', res.assets);
          updateModalsState({tripPicture: res?.assets[0]});
        }
      },
    );
  };

  useEffect(useEffectFuc, []);

  return {
    trips,
    updateState,
    isTripCreated,
    tripCardData,
    activeSessionHelp,
    updateSectionsHelp,
    invitedTrips,
    tripsCard,
    changeMemberStatus,
    groupTrips,
    changeMemberStatusGroup,
    perssonalTrips,
    userData,
    checkLenght,
    deleteTrip,
    editTrip: () => {},
    openInfoModal,
    infoModal,
    editTripData,
    updateModalsState,
    tripMemebers,
    tripName,
    tripPicture,
    keyboardType,
    uploadFromGalary,
    onCloseModal,
    allUser: contacts,
    userModal,
    addMembersToGroup,
    getUser: sendUpdatedAt,
    filterIDSfromArry,
    updateTripData,
    updateError,
  };
};

export default useEditTripScreen;
