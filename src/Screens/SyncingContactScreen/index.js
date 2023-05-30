import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import {arrowBack, syncPhone} from '../../Assets';
import useSyncScreen from './useSyncContactScreen';
import CustomHeader from '../../Components/Header';

const SyncingScreen = ({navigation}) => {
  const {} = useSyncScreen(navigation);
  return (
    <View style={styles.syncMain}>
      <Image source={syncPhone} style={styles.syncImg} />
      <TextComponent styles={styles.syncHeading} text={'One moment, please'} />
      <TextComponent
        styles={styles.syncText}
        text={'We’re syncing your contacts for use.'}
      />
      {/* <CustomHeader
        arrowBackIcon={arrowBack}
        backText={'Back'}
        headerTitle={'asd'}
      /> */}
    </View>
  );
};
export default memo(SyncingScreen);
