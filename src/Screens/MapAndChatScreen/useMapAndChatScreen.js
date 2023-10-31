import useReduxStore from '../../Hooks/UseReduxStore';

const useMapAndChatScreen = ({id}) => {
  const {getState} = useReduxStore();

  const {chatNotify} = getState('chatNotify');
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

  return {checkLenght};
};

export default useMapAndChatScreen;
