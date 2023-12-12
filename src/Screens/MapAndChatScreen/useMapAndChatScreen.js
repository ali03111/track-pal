import useReduxStore from '../../Hooks/UseReduxStore';
import {ResetMsgCountUrl} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';

const useMapAndChatScreen = ({id}) => {
  const {getState, dispatch} = useReduxStore();

  const {chatNotify} = getState('chatNotify');
  const {userData} = getState('Auth');
  // console.log(
  //   'dbjksdbsdknkasdasdasdassndvnsdnjdsdfsdfsdfsdfskbsdjkbvklasdasdasjsdadsfsdbvklsbd',
  //   chatNotify[`"${id}"`],
  //   `"${id}"`,
  // );
  let givenID = JSON.stringify(id);
  // const checkLenght = id => {
  //   return chatNotify[givenID] ? chatNotify[givenID].length : 0;
  // };
  const checkLenght = chatNotify[givenID] ? chatNotify[givenID].length : 0;

  const clearNotCount = async () => {
    const {data} = await API.post(ResetMsgCountUrl, {trip_id: id});

    console.log(
      'jksbdjksbjkdbvkjsbdkjvbdjkbvjkdbkjvbdkjbvkjdbkvbdkjvbjkdbkvbdkbvkjdbvkjbdjkvbdjkvbd',
      data,
    );
  };

  return {checkLenght, dispatch, userData, clearNotCount};
};

export default useMapAndChatScreen;
