import React, {memo, useCallback, useState} from 'react';
import {View, Text, Image, FlatList, TextInput, Platform} from 'react-native';
import {
  DemoProfileImage1,
  arrows,
  bgBlurHome,
  dotbar,
  dots,
  from,
  link,
  location,
  logo,
  map,
  staticMap,
  whitebg,
} from '../../Assets';
import {styles} from './styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {hp, wp} from '../../Config/responsive';
import useHomeScreen from './useHomeScreen';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import SelectLocationModal from './SelectLocationModal';
import CreateGroupModal from './CreateGroupModal';
import {CircleImage} from '../../Components/CircleImage';
import StartTripModal from './StartTripModal';
import TripCreatedModal from './TripCreatedModal';

const HomeScreen = () => {
  const {
    frequentTrips,
    isModalVisible,
    locationInput,
    iscreateModal,
    GroupInput,
    isTripModalVisible,
    destinationInput,
    isTripCreated,
    currentLocation,
    isTripStarted,
    updateState,
  } = useHomeScreen();
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.trips}>
        {/* <Image source={item?.image} /> */}
        <CircleImage image={item?.image} />
        <GradientText style={styles.heading} GradientAlignment={0.6}>
          {item?.name}
        </GradientText>
      </View>
    );
  });
  return (
    <View style={styles.homeScreenStyle}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.mapArea}>
        <View style={styles.groupInfoMain}>
          {Platform.OS == 'ios' ? (
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={10}
            />
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
            <Image source={link} style={styles.externalLinks} />
          </Touchable>
        </View>
        <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.staticMapImg}
          region={{
            latitude: currentLocation?.coords?.latitude,
            longitude: currentLocation?.coords?.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
        {/* <Image source={staticMap} style={styles.staticMapImg} /> */}
      </View>
      <TextComponent text={'Frequent Trips'} styles={styles.TripsHeading} />
      <FlatList
        refreshing={false}
        data={frequentTrips}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: wp('4'),
        }}
      />
      <View style={styles.btn}>
        <ThemeButton
          title={'Create New Trip'}
          onPress={() => updateState({isModalVisible: true})}
          style={styles.tripBtn}
        />
        {/* <ThemeButton
          title={'asd'}
          onPress={CreateGroup}
          style={styles.tripBtn}
        /> */}
        <SelectLocationModal
          {...{
            isModalVisible,
            toggleLocationModal: () => {
              updateState({isModalVisible: false, iscreateModal: true});
              console.log(
                'sfngkjbdfkffffgbdklfbgdfgdf',
                iscreateModal,
                isModalVisible,
              );
              // updateState({iscreateModal: true});
            },
          }}
        />
        <CreateGroupModal
          {...{
            iscreateModal,
            CreateGroup: () => {
              updateState({iscreateModal: false, isTripCreated: true});
              // updateState({isTripCreated: true});
            },
          }}
        />
        <TripCreatedModal
          {...{
            isTripCreated,
            TripCreatedToggle: () => {
              updateState({isTripCreated: false, isTripModalVisible: true});
            },
          }}
        />
        <StartTripModal
          {...{
            isTripModalVisible,
            StartTripToggle: () => {
              updateState({isTripModalVisible: false, isTripStarted: true});
              // updateState({isTripStarted: true});
            },
          }}
        />
        <TripCreatedModal
          {...{
            isTripCreated: isTripStarted,
            title: 'Trip Started',
            TripCreatedToggle: () => {
              updateState({isTripStarted: false});
            },
          }}
        />
      </View>
    </View>
  );
};

export default memo(HomeScreen);
