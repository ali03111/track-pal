import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {styles} from './styles';
import {DemoProfileImage1, alert, bgBlurHome, link} from '../../Assets';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
import {BlurView} from '@react-native-community/blur';
import useMapScreen from './useMapScreen';

const MapScreen = ({route, navigation}) => {
  const {allMember, destination, tripData} = useMapScreen(navigation, route);
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
          <Text style={styles.groupName}>{tripData.name}</Text>
          <Text style={styles.groupMember}>{allMember.length} members</Text>
        </View>
        <Touchable style={styles.groupLink}>
          <Image source={alert} style={styles.externalLinks} />
        </Touchable>
      </View>
      <MapView
        style={styles.staticMapImg}
        mapType="hybrid"
        region={{
          latitude: 24.8323181,
          longitude: 67.0730434,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          style={{
            backgroundColor: 'green',
          }}
        />
        {allMember.length > 0 &&
          allMember.map(res => {
            console.log('sjdbvjsbjvb sdjkvsd', res);
            return (
              <Marker
                coordinate={{
                  latitude: res.coords.latitude,
                  longitude: res.coords.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
            );
          })}
      </MapView>
    </View>
  );
};

export default memo(MapScreen);
