import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {styles} from './styles';
import {DemoProfileImage1, alert, bgBlurHome, link} from '../../Assets';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
import {BlurView} from '@react-native-community/blur';
import useMapScreen from './useMapScreen';
import MapViewDirections from 'react-native-maps-directions';

const MapScreen = ({route, navigation}) => {
  const {allMember, destination, tripData, currentUser} = useMapScreen(
    navigation,
    route,
  );
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
          latitude: tripData.owner
            ? destination.latitude
            : currentUser.coords.latitude,
          longitude: tripData.owner
            ? destination.longitude
            : currentUser.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <View style={{backgroundColor: 'yellow', padding: 10}}>
            <Text>destination</Text>
          </View>
        </Marker>

        {currentUser?.status && !tripData.owner && (
          <>
            <MapViewDirections
              origin={{
                latitude: currentUser.coords.latitude,
                longitude: currentUser.coords.longitude,
              }}
              precision="high"
              destination={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              mode="DRIVING"
              // optimizeWaypoints={true}
              strokeColor={'red'}
              strokeWidth={4}
              apikey={'AIzaSyBlHyVz90xxc4lkp-1jGq68Ypmgnw4WCFE'}
              // strokeColors={['red']}
            />
            <Marker
              coordinate={{
                latitude: currentUser.coords.latitude,
                longitude: currentUser.coords.longitude,
                // latitudeDelta: 0.015,
                // longitudeDelta: 0.0121,
              }}>
              <View style={{backgroundColor: 'blue', padding: 10}}>
                <Text>{currentUser.details.email}</Text>
              </View>
            </Marker>
          </>
          // console.log('jksbdjkbsdjkbvjsdb vsdjv sdj jdjdjd', currentUser)
        )}
        {allMember.length > 0 &&
          allMember.map(res => {
            console.log('sjdbvjsbjvb sdjkvsd', res);
            return (
              <Marker
                coordinate={{
                  latitude: res.coords.latitude,
                  longitude: res.coords.longitude,
                  // latitudeDelta: 0.015,
                  // longitudeDelta: 0.0121,
                }}>
                <View style={{backgroundColor: 'red', padding: 10}}>
                  <Text>{res.details.email}</Text>
                </View>
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
};

export default memo(MapScreen);
