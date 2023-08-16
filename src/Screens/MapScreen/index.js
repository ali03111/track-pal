import React, {memo, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
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
  sosLottie,
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
import InfoModal from './InfoModal';

const MapScreen = ({route, navigation}) => {
  const {
    allMember,
    destination,
    tripData,
    currentUser,
    laongituteDalta,
    latitudeDelta,
    kiloMeterRef,
    toggleModal,
    isModalVisible,
    tripInfo,
    notificationToAllMembers,
    userMarkerRef,
    iconRef,
  } = useMapScreen(navigation, route);

  // console.log('currentUsercurrentUsercurrentUser', currentUser);
  // console.log('triiiiiiiiiiiiiiiiiiiiiiiiiiiiiiip data', tripData);
  // console.log('destionationnnnnnnnnn', destination);

  const KiloMeterView = useCallback(() => {
    return (
      <TextComponent
        styles={styles.kiloMeterText}
        text={kiloMeterRef.current + ' KM away' ?? 0 + ' KM away'}
      />
    );
  }, [kiloMeterRef]);

  const MembersView = useCallback(
    ({res}) => {
      return (
        <Marker
          focusable
          // tracksInfoWindowChanges
          // tracksViewChanges
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
    },
    [allMember],
  );

  const TripNameBottom = useCallback(() => {
    return tripData.image ? (
      <CircleImage image={tripData.image} style={styles.groupLogo} />
    ) : (
      <FirstCharacterComponent indexNumber={5} text={tripData.name} />
    );
  }, [iconRef]);

  return (
    <View style={{flex: 1}}>
      <Touchable
        style={styles.groupInfoMain}
        Opacity={0.7}
        onPress={toggleModal}>
        {Platform.OS == 'ios' ? (
          <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
        ) : (
          <Image
            style={{...styles.absolute, opacity: 0.8}}
            source={bgBlurHome}
            blurRadius={0.5}
          />
        )}

        {iconRef.current == 1 && <TripNameBottom />}

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
        <Touchable style={styles.groupLink} onPress={notificationToAllMembers}>
          {/* <Image source={alert} style={styles.externalLinks} /> */}
          <Lottie
            style={{height: hp('8'), width: wp('4')}}
            resizeMode="contain"
            source={sosLottie}
            autoPlay
            loop
          />
        </Touchable>
        <InfoModal
          {...{isModalVisible, toggleModal, tripData, currentUser, tripInfo}}
        />
      </Touchable>
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
          // showsUserLocation={tripData.owner ? false : true}
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
          {
            currentUser.coords.latitude != null && !tripData.owner && (
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
                  optimizeWaypoints
                  geodesic
                  mode="DRIVING"
                  strokeWidth={4}
                  strokeColors={['#92278F', '#EE2A7B']}
                  apikey={'AIzaSyDrsOp8m31p4Ouy3S0pfXRNehExMJ-Mp2U'} // android
                  strokeColor={Colors.faceBookColor}
                />
                <Marker
                  // focusable
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
                </Marker>
              </>
            )
            // useCallback(() => {
            //   return (
            //   );
            // }, [currentUser])
          }
          {allMember.length > 0 &&
            allMember.map(res => <MembersView res={res} />)}
        </MapView>
        {!tripData.owner && <KiloMeterView />}
      </View>
    </View>
  );
};

export default memo(MapScreen);
