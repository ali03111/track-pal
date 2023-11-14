// import useNotificationScreen from '.';
import {useEffect, useRef, useState} from 'react';
import {msgs} from '../../Utils/localDB';
import {
  creaetChatObj,
  reference,
  referenceChat,
  sendDataToFIrebase,
} from '../../Services/FireBaseRealTImeServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {Platform} from 'react-native';
import API from '../../Utils/helperFunc';
import {NotificationStatus, sendChatNotification} from '../../Utils/Urls';
import {types} from '../../Redux/types';

/**
 * The function `notificationStatusFunc` is an asynchronous function that sends a POST request to the
 * API with a notification status.
 */
export const notificationStatusFunc = async status => {
  console.log('jbvjsdbvjsdbvskdjvbsdkvbsdkvbsd', status);
  await API.post(NotificationStatus, {
    notification_status: status,
  });
};

const useChatScreen = ({navigate}, {params}) => {
  const {item} = params.params;

  const {getState, dispatch} = useReduxStore();

  let regexp = /^(?![\s\b]).*/;

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
    const msgBoj = {
      userId: userData.id,
      msg: text,
      timeStamp: new Date().getTime(),
      userName: userData.name,
      email: userData.email,
    };
    onChangeText('');

    console.log('sdvns dhvsdjhvbsd', item);
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
    return () => notificationStatusFunc('true');
  }, []);

  useEffect(() => {
    const fire = referenceChat.doc(`"${item.id}"`);
    // const fire = referenceChat.doc(`"${item.id}"`).orderBy('timeStamp', 'desc');

    const subscriber = fire.onSnapshot(querySnapshot => {
      const allMsg = querySnapshot._data.chat.map(item => {
        return {...item};
      });

      if (allMsg.length > 0) {
        allMsg.sort((a, b) => a.timeStamp - b.timeStamp);
        setChatArry(allMsg);
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
