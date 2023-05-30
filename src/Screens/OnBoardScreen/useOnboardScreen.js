import {useState} from 'react';
import {Dimensions} from 'react-native';
import useReduxStore from '../../Hooks/UseReduxStore';
import {types} from '../../Hooks/Redux/types';
import {onBoardinData} from '../../Utils/localDB';

const useOnboardingScreen = ({navigate, params}) => {
  // const {dispatch} = useReduxStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get('window').width;

  const onSnapToItem = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const goNext = () => {
    if (currentIndex == 1) navigate('LoginScreen');
    setCurrentIndex(pre => pre + 1);
  };

  const getStart = () => {
    // dispatch({
    //   type: types.onBoardFinished,
    // });
  };
  return {
    onBoardinData,
    onSnapToItem,
    currentIndex,
    getStart,
    goNext,
  };
};

export default useOnboardingScreen;
