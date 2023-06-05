import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import MapView from 'react-native-maps';
import {styles} from './styles';
import {DemoProfileImage1, alert, bgBlurHome, link} from '../../Assets';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
import {BlurView} from '@react-native-community/blur';

const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.groupInfoMain}>
        {Platform.OS == 'ios' ? (
          <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
        ) : (
          <Image
            style={{...styles.absolute, opacity: 0.8}}
            source={bgBlurHome}
            blurRadius={0.5}
          />
        )}
        <CircleImage image={DemoProfileImage1} style={styles.groupLogo} />

        <View style={styles.groupDesc}>
          <Text style={styles.groupName}>Business Meets</Text>
          <Text style={styles.groupMember}>15 members</Text>
        </View>
        <Touchable style={styles.groupLink}>
          <Image source={alert} style={styles.externalLinks} />
        </Touchable>
      </View>
      <MapView
        style={styles.staticMapImg}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
    </View>
  );
};

export default memo(MapScreen);
