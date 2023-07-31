import React, {memo} from 'react';
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

const TripOne = ({route, navigation}) => {
  const {
    allMember,
    destination,
    tripData,
    currentUser,
    laongituteDalta,
    latitudeDelta,
  } = useMapScreen(navigation, route);

  console.log('currentUsercurrentUsercurrentUser', currentUser);

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
        {/* <CircleImage image={DemoProfileImage1} style={styles.groupLogo} /> */}

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
      <MapView
        style={styles.staticMapImg}
        region={{
          latitude: tripData.owner
            ? destination.latitude
            : currentUser.coords.latitude,
          longitude: tripData.owner
            ? destination.longitude
            : currentUser.coords.longitude,
          latitudeDelta,
          longitudeDelta: laongituteDalta,
        }}>
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
            latitudeDelta,
            longitudeDelta: laongituteDalta,
          }}>
          <Lottie autoSize source={destinationLottie} autoPlay loop />
        </Marker>

        {!tripData.owner && (
          <>
            {console.log('jkadbcjksdbvjksbdjkvsdvsdnvks')}
            <MapViewDirections
              origin={{
                // 24.907937434853988, 67.02333317832343
                latitude: ' 24.907937434853988',
                longitude: '67.02333317832343',
                // latitude: currentUser.coords.latitude,
                // longitude: currentUser.coords.longitude,
              }}
              precision="high"
              destination={{
                // 24.909454807683705, 66.9879688334235
                latitude: '24.909454807683705',
                longitude: '66.9879688334235',
                // latitude: destination.latitude,
                // longitude: destination.longitude,
              }}
              mode="DRIVING"
              // optimizeWaypoints={true}
              // tappable
              // strokeColor={'red'}
              // start={{x: 0, y: 0}}
              // end={{x: 1, y: 0}}
              strokeWidth={4}
              strokeColors={['#92278F', '#EE2A7B']}
              // strokeColors={[Colors.themeColorDark, Colors.themeColorLight]}
              apikey={'AIzaSyDrsOp8m31p4Ouy3S0pfXRNehExMJ-Mp2U'} // android
              // apikey={'AIzaSyBlHyVz90xxc4lkp-1jGq68Ypmgnw4WCFE'}
              // strokeColors={['red']}
            />
            <Marker
              coordinate={{
                latitude: currentUser.coords.latitude,
                longitude: currentUser.coords.longitude,
                latitudeDelta,
                longitudeDelta: laongituteDalta,
              }}>
              {/* <Lottie source={userWithOutPicLottie} autoPlay loop /> */}

              <Lottie autoSize source={currentUserLottie} autoPlay loop />
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
                  latitudeDelta,
                  longitudeDelta: laongituteDalta,
                }}>
                <Lottie autoSize source={userWithOutPicLottie} autoPlay loop />
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
};

export default memo(TripOne);
