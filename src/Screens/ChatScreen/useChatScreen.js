// import useNotificationScreen from '.';
import {useEffect, useState} from 'react';
import {msgs} from '../../Utils/localDB';
import {
  reference,
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

  const onSend = async () => {
    const msgBoj = {
      userId: userData.id,
      msg: text,
      timeStamp: new Date().getTime(),
      userName: userData.name,
      email: userData.email,
    };
    console.log('sdvns dhvsdjhvbsd', item);
    const {data} = await sendDataToFIrebase({
      tripOnnwerID: item.owner ? Number(item.user_id) : item.trip_owner.id,
      tripId: item.id,
      msgObj: msgBoj,
      userData,
    });
    onChangeText('');
    console.log('message DAta', data);
  };

  useEffect(() => {
    const fire = reference
      .doc(`${item.owner ? Number(item.user_id) : item.trip_owner.id}`)
      .collection(`"${item.id}"`);
    const subscriber = fire.onSnapshot(querySnapshot => {
      const allMsg = querySnapshot.docs.map(item => {
        return {...item._data};
      });
      const chatData = allMsg[0].members.map(res => [...res.chat]);
      var newChat = [].concat(...chatData);
      console.log('jdbjsdbjsdbjvbsdjvbsdjsdsdsdsdsv', newChat);

      // newChat.forEach(msg => (msg.userId = Number(msg.userId)));

      newChat.sort((a, b) => a.timeStamp - b.timeStamp);

      // newChat.sort((a, b) => a.timeStamp - b.timeStamp);
      // const sortedArray = [];
      // newChat.forEach(item => {
      //   if (
      //     sortedArray.length === 0 ||
      //     sortedArray[sortedArray.length - 1].timeStamp <= item.timeStamp
      //   ) {
      //     sortedArray.push(item);
      //   } else {
      //     let inserted = false;
      //     for (let i = sortedArray.length - 1; i >= 0; i--) {
      //       if (sortedArray[i].timeStamp > item.timeStamp) {
      //         sortedArray.splice(i, 0, item);
      //         inserted = true;
      //         break;
      //       }
      //     }
      //     if (!inserted) sortedArray.unshift(item);
      //   }
      // });

      console.log(
        'sortedArraysortedArraysortedArraysortedArray',
        Platform.OS,
        newChat,
      );

      // setCurrentUser(
      //   allMsg['0'].members.filter(res => res.id == userData.id)[0],
      // );newChat
      setChatArry(newChat);
      // setCurrentUser(() => filterData.filter(res => res.id == userData.id)[0]);
      // console.log(
      //   'shdvhjksdvkjsdkjvsdj,v,',
      //   allMsg['0'].members.filter(res => res.id == userData.id)[0],
      // );
    });
    return () => subscriber();
  }, []);

  return {
    msgs: chatArry,
    userData,
    text,
    onChangeText,
    sendDataToFIrebase: onSend,
  };
};
export default useChatScreen;
