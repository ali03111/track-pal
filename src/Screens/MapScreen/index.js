import React, {memo, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
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
import {imageURL, imageUrl} from '../../Utils/Urls';
import {tripsTypes} from '../../Utils/localDB';

const MapScreen = ({route, navigation}) => {
  const {
    allMember,
    destination,
    tripData,
    currentUser,
    laongituteDalta,
    latitudeDelta,
    kiloMeterRef,
    userData,
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
            <>
              <Lottie
                source={userWithOutPicLottie}
                autoPlay
                loop
                style={{height: hp('8'), width: wp('4')}}
                resizeMode="contain"
              />
              <View style={styles.pView}>
                <CircleImage
                  uri={true}
                  image={imageUrl(res?.details.profile_image)}
                  // style={styles.pImage}
                  styles={styles.pImage}
                />
              </View>
            </>
          ) : (
            <FirstCharacterComponent
              text={res?.details.name}
              extraStyle={styles.firstCharStyle}
              textStyle={styles.firstTextStyle}
            />
          )}
          {res?.details.profile_image == null && (
            <Lottie
              source={userWithOutPicLottie}
              autoPlay
              loop
              style={{height: hp('8'), width: wp('4')}}
              resizeMode="contain"
            />
          )}
        </Marker>
      );
    },
    [allMember],
  );
  const checkCurrentUser = Boolean(
    currentUser.coords.latitude != null && !tripData.owner,
  );

  const isPersonalTripInvited = Boolean(tripData.type == tripsTypes[2].id);

  console.log(
    'checkCurrentUsercheckCurrentUsercheckCurrentUsercheckCurrentUser',
    checkCurrentUser,
  );

  const TripNameBottom = useCallback(() => {
    return tripData.image ? (
      <CircleImage
        uri={true}
        image={imageUrl(tripData.image)}
        styles={styles.groupLogo}
      />
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
          {!isPersonalTripInvited && (
            <TextComponent
              styles={styles.groupMember}
              text={`Active Members ${
                checkCurrentUser ? allMember.length + 1 : allMember.length
              }`}
            />
          )}
        </View>
        <Touchable style={styles.groupLink} onPress={notificationToAllMembers}>
          {/* <Image source={alert} style={styles.externalLinks} /> */}
          {/* {tripData.trip_owner.id == userData.id && ( */}
          <Lottie
            style={{height: hp('8'), width: wp('4')}}
            resizeMode="contain"
            source={sosLottie}
            autoPlay
            loop
          />
          {/* )} */}
        </Touchable>
        <InfoModal
          {...{
            isModalVisible,
            toggleModal,
            tripData,
            currentUser,
            tripInfo,
            allMember,
            userData,
          }}
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
          onPoiClick={val =>
            console.log(
              'sldbvbsdjkvbsdiovbsdklvbklsdbvlksdbvklsdbvklsdbvklsdbvls',
              val,
            )
          }
          onLongPress={({val, currentTarget}) =>
            console.log(
              'onCalloutPressonCalloutPressonCalloutPressonCalloutPressonCalloutPress',
              currentTarget,
            )
          }
          followsUserLocation
          moveOnMarkerPress
          showsMyLocationButton
          // provider={PROVIDER_GOOGLE}
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
        {!tripData.owner && tripData.type != 'personalTrip' && (
          <KiloMeterView />
        )}
        {tripData.type == 'personalTrip' &&
          tripData.trip_owner.id == userData.id && <KiloMeterView />}
      </View>
    </View>
  );
};

export default memo(MapScreen);

// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Dimensions} from 'react-native';
// import MapView, {
//   Marker,
//   PROVIDER_GOOGLE,
//   TileOverlay,
//   UrlTile,
// } from 'react-native-maps';
// import API from '../../Utils/helperFunc';
// import {currentUserLottie} from '../../Assets';
// import {hp, wp} from '../../Config/responsive';
// import {LatLng, LeafletView} from 'react-native-leaflet-view';

// const MapScreen = () => {
//   const [crossings, setCrossings] = useState([]);

//   useEffect(() => {
//     // Fetch railway crossings in Brussels
//     fetchRailwayCrossings();
//   }, []);

//   const fetchRailwayCrossings = async () => {
//     try {
//       const response = await fetch(
//         'https://api.openrailwaymap.org/v2/facility?name=brussels&railway_crossing:movable=*',
//       );

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       console.log('Railway crossings in Brussels:', data);
//       setCrossings(data);
//     } catch (error) {
//       console.error('Error fetching railway crossings in Brussels:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         apikey={'AIzaSyDrsOp8m31p4Ouy3S0pfXRNehExMJ-Mp2U'}
//         // provider={PROVIDER_GOOGLE} // Use Google Maps
//         style={styles.map}
//         initialRegion={{
//           latitude: 50.8503,
//           longitude: 4.3517,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//         {/* <LeafletView
//           mapLayers={[
//             {
//               attribution:
//                 '&copy; <Text href="https://www.openstreetmap.org/copyright">OpenStreetMap</Text> contributors &copy; <Text href="https://carto.com/attributions">CARTO</Text>',
//               maxZoom: 19,
//               url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
//             },
//             {
//               attribution:
//                 '&copy; <Text href="https://www.openstreetmap.org/copyright">OpenStreetMap</Text> contributors &copy; <Text href="https://www.openrailwaymap.org/">OpenRailwayMap</Text>',
//               maxZoom: 18,
//               url: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
//             },
//           ]}
//           // The rest of your props, see the list below
//         /> */}
//         {/* <UrlTile
//           urlTemplate="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//           maximumZ={18}
//           zIndex={1}
//           // tileOverlay={{
//           //   urlTemplate:
//           //     'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
//           //   maximumZ: 18,
//           //   zIndex: 1,
//           //   attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
//           // }}
//         />
//         <UrlTile
//           urlTemplate="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
//           maximumZ={19}
//           zIndex={2}
//           // tileOverlay={{
//           //   urlTemplate:
//           //     'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
//           //   maximumZ: 19,
//           //   zIndex: 2,
//           //   attribution:
//           //     '&copy; OpenStreetMap contributors &copy; OpenRailwayMap',
//           // }}
//         /> */}
//         {crossings.map((crossing, index) => (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: crossing.latitude,
//               longitude: crossing.longitude,
//             }}
//             pinColor="red">
//             <Lottie
//               style={{height: hp('8'), width: wp('4')}}
//               resizeMode="contain"
//               source={currentUserLottie}
//               autoPlay
//               loop
//             />
//           </Marker>
//         ))}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: Dimensions.get('window').height,
//     width: Dimensions.get('window').width,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapScreen;
