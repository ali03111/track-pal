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

const useChatScreen = ({navigate}, {params}) => {
  const {item} = params.params;

  const {getState} = useReduxStore();

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
    const {data} = await sendDataToFIrebase({
      tripOnnwerID: item.owner ? Number(item.user_id) : item.trip_owner.id,
      tripId: item.id,
      msgObj: msgBoj,
      userData,
    });
    console.log('message DAta', data);
  };

  useEffect(() => {
    handleAutoScroll();
  }, [chatArry]);

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
  };
};
export default useChatScreen;
