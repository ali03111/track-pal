import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import GradientText from '../../Components/GradientText';
import ThemeButton from '../../Components/ThemeButton';
import {syncPhone} from '../../Assets';
import useSyncScreen from './useSyncScreen';

const SyncScreen = ({navigation}) => {
  const {} = useSyncScreen(navigation);
  return (
    <View style={styles.syncMain}>
      <Image source={syncPhone} style={styles.syncImg} />
      <GradientText style={styles.heading} GradientAlignment={0.6}>
        Sync Phone Book
      </GradientText>
      <ThemeButton title={'Sync'} />
    </View>
  );
};
export default memo(SyncScreen);
