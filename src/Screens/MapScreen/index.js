import React, {memo, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {styles} from './styles';
import {
  DemoProfileImage1,
  alert,
  bgBlurHome,
  currentUserLottie,
  destinationLottie,
  link,
  profile,
  userWithOutPicLottie,
} from '../../Assets';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
import {BlurView} from '@react-native-community/blur';
import useMapScreen from './useMapScreen';
import MapViewDirections from 'react-native-maps-directions';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {TextComponent} from '../../Components/TextComponent';
import Lottie from 'lottie-react-native';
import {Colors} from '../../Theme/Variables';
// import ImageAsset from 'lottie-react-native/lib/js/components/ImageAsset';
import {hp, wp} from '../../Config/responsive';

const MapScreen = ({route, navigation}) => {
  const {
    allMember,
    destination,
    tripData,
    currentUser,
    laongituteDalta,
    latitudeDelta,
    kiloMeterRef,
    userMarkerRef,
  } = useMapScreen(navigation, route);

  console.log('currentUsercurrentUsercurrentUser', currentUser);

  const KiloMeterView = useCallback(() => {
    return (
      <TextComponent
        styles={styles.kiloMeterText}
        text={kiloMeterRef.current + ' KM away' ?? 0 + ' KM away'}
      />
    );
  }, [kiloMeterRef]);

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
        {tripData.image ? (
          <CircleImage image={tripData.image} style={styles.groupLogo} />
        ) : (
          <FirstCharacterComponent text={tripData.name} />
        )}

        <View style={styles.groupDesc}>
          <TextComponent
            styles={styles.groupName}
            text={tripData.name}
            numberOfLines={1}
          />
          <TextComponent
            styles={styles.groupMember}
            text={allMember.length + 1 + ' members'}
          />
        </View>
        <Touchable style={styles.groupLink}>
          <Image source={alert} style={styles.externalLinks} />
        </Touchable>
      </View>
      <View style={styles.staticMapImg}>
        <MapView
          style={styles.staticMapImg}
          region={{
            latitude: tripData.owner
              ? destination.latitude
              : currentUser.coords.latitude ?? destination.latitude,
            longitude: tripData.owner
              ? destination.longitude
              : currentUser.coords.longitude ?? destination.longitude,
            latitudeDelta,
            longitudeDelta: laongituteDalta,
          }}
          showsUserLocation
          focusable
          followsUserLocation
          moveOnMarkerPress
          showsMyLocationButton
          zoomEnabled>
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
              latitudeDelta,
              longitudeDelta: laongituteDalta,
            }}>
            <Lottie
              style={{height: hp('8'), width: wp('4')}}
              resizeMode="contain"
              source={destinationLottie}
              autoPlay
              loop
            />
          </Marker>
          {currentUser.coords.latitude != null && !tripData.owner && (
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
                strokeWidth={4}
                strokeColors={['#92278F', '#EE2A7B']}
                apikey={'AIzaSyDrsOp8m31p4Ouy3S0pfXRNehExMJ-Mp2U'} // android
              />
              <Marker.Animated
                focusable
                coordinate={{
                  latitude: currentUser.coords.latitude,
                  longitude: currentUser.coords.longitude,
                  latitudeDelta,
                  longitudeDelta: laongituteDalta,
                }}>
                <Lottie
                  style={{height: hp('8'), width: wp('4')}}
                  resizeMode="contain"
                  source={currentUserLottie}
                  autoPlay
                  loop
                />
              </Marker.Animated>
            </>
          )}
          {allMember.length > 0 &&
            allMember.map(res => {
              return (
                <Marker
                  focusable
                  tracksInfoWindowChanges
                  tracksViewChanges
                  coordinate={{
                    latitude: res.coords.latitude,
                    longitude: res.coords.longitude,
                    latitudeDelta,
                    longitudeDelta: laongituteDalta,
                  }}>
                  {res?.details.profile_image ? (
                    <CircleImage
                      uri={true}
                      image={res?.details.profile_image}
                      // style={styles.pImage}
                      styles={styles.pImage}
                    />
                  ) : (
                    <FirstCharacterComponent
                      text={res?.details.name}
                      extraStyle={styles.firstCharStyle}
                      textStyle={styles.firstTextStyle}
                    />
                  )}
                  <Lottie
                    source={userWithOutPicLottie}
                    autoPlay
                    loop
                    style={{height: hp('8'), width: wp('4')}}
                    resizeMode="contain"
                  />
                </Marker>
              );
            })}
        </MapView>
        {!tripData.owner && <KiloMeterView />}
      </View>
    </View>
  );
};

export default memo(MapScreen);
