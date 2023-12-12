// import useNotificationScreen from '.';
import {useEffect, useRef, useState} from 'react';
import {msgs} from '../../Utils/localDB';
import {
  creaetChatObj,
  getFormattedTime,
  reference,
  referenceChat,
  sendDataToFIrebase,
} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {Platform} from 'react-native';
import API from '../../Utils/helperFunc';
import {NotificationStatus, sendChatNotification} from '../../Utils/Urls';
import {types} from '../../Redux/types';
import {store} from '../../Redux/Reducer';
import moment from 'moment-timezone';

var tripId = null;

/**
 * The function `notificationStatusFunc` is an asynchronous function that sends a POST request to the
 * API with a notification status.
 */
export const notificationStatusFunc = async status => {
  if (!status && tripId != null) {
    store.dispatch({
      type: types.clearNofityObjByID,
      payload: tripId,
    });
  }
  console.log('jbvjsdbvjsdbvskdjvbsdkvbsdkvbsd', status, Platform.OS);
  const {data} = await API.post(NotificationStatus, {
    notification_status: status,
  });

  console.log(
    'jbvjsdbvjsdbvskdjvbsdkvbsdkvbsdjbvjsdbvjsdbvskdjvbsdkvbsdkvbsddata',
    data,
  );
};

const useChatScreen = ({navigate}, {params}) => {
  const {item} = params.params;

  tripId = item.id;

  const {getState, dispatch} = useReduxStore();

  const {timeZone} = getState('timeZone');

  let regexp = /^(?![\s\b]+$).+/gm;

  const {userData} = getState('Auth');
  const [chatArry, setChatArry] = useState([]);
  const [text, onChangeText] = useState('');
  const scrollViewRef = useRef();

  const handleAutoScroll = () => {
    if (scrollViewRef.current && chatArry.length > 0) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const onSend = async () => {
    const NewTime = new Date();
    const convertedTime = getFormattedTime(NewTime, '', 'UTC');
    const p = moment().utc();
    console.log(
      'convertedTimeconvertedTimeconvertedTime',
      convertedTime,
      p.toISOString(),
    );
    const msgBoj = {
      userId: userData.id,
      msg: text.trimStart(),
      timeStamp: moment().utc().toISOString(),
      userName: userData.name,
      email: userData.email,
    };
    onChangeText('');

    console.log('sdvns dhvsdjhvbsd', msgBoj);
    await sendDataToFIrebase({
      tripOnnwerID: item.owner ? Number(item.user_id) : item.trip_owner.id,
      tripId: item.id,
      msgObj: msgBoj,
      userData,
    });
    const {data} = await API.post(sendChatNotification, {
      trip_id: item.id,
      message: text,
    });
    console.log('message DAta', data);
  };

  useEffect(() => {
    handleAutoScroll();
  }, [chatArry]);

  useEffect(() => {
    return () => notificationStatusFunc(1);
  }, []);

  useEffect(() => {
    const fire = referenceChat.doc(`"${item.id}"`);
    // const fire = referenceChat.doc(`"${item.id}"`).orderBy('timeStamp', 'desc');

    const subscriber = fire.onSnapshot(querySnapshot => {
      const allMsg = querySnapshot._data.chat.map(item => {
        return {...item};
      });

      if (allMsg.length > 0) {
        const timeConveted = allMsg.map(res => ({
          ...res,
          timeStamp: getFormattedTime(res.timeStamp),
        }));
        // timeConveted.sort((a, b) => {
        //   const timeComparison = a.timeStamp - b.timeStamp;
        //   if (timeComparison !== 0) {
        //     return timeComparison;
        //   }

        //   // Compare seconds if the dates are equal
        //   const secondsA = a.timeStamp.getUTCSeconds();
        //   const secondsB = b.timeStamp.getUTCSeconds();
        //   return secondsA - secondsB;
        // });
        timeConveted.sort((a, b) => a.msgId - b.msgId);
        setChatArry(timeConveted);
      }
    });
    return () => subscriber();
  }, []);

  return {
    msgs: chatArry,
    userData,
    text,
    onChangeText,
    sendDataToFIrebase: onSend,
    handleAutoScroll,
    scrollViewRef,
    regexp,
  };
};
export default useChatScreen;
