import React, {memo} from 'react';
import {View, Text} from 'react-native';
import MapView from 'react-native-maps';
import {styles} from './styles';

const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
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
