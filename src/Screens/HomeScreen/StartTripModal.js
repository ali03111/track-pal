import React, {memo, useCallback, useState} from 'react';
import {View, Image, TextInput, Text} from 'react-native';
import {
  DemoProfileImage1,
  arrows,
  bgBlur,
  dotbar,
  dots,
  from,
  location,
} from '../../Assets';
import {styles} from './styles';

import {hp, wp} from '../../Config/responsive';
import useHomeScreen from './useHomeScreen';
import {Touchable} from '../../Components/Touchable';
import {BlurView} from '@react-native-community/blur';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import {CircleImage} from '../../Components/CircleImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {tripsTypes} from '../../Utils/localDB';
import {AutoFillGoogleComp} from '../../Components/AutoFillGoogleComp';
import {TextComponent} from '../../Components/TextComponent';
import useReduxStore from '../../Hooks/UseReduxStore';
import Overlay from '../../Components/Overlay';
import {Colors} from '../../Theme/Variables';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';

const StartTripModal = ({
  StartTripToggle,
  isTripModalVisible,
  onBackPress,
  extraData,
}) => {
  // const {
  //   locationInput,
  //   setLocationInput,
  //   destinationInput,
  //   setDestinationInput,
  // } = useHomeScreen();
  const isTripType = Boolean(extraData.selectTripType != tripsTypes[0].id);
  const isTrue = Boolean(true);
  const {getState} = useReduxStore();
  const {isloading} = getState('isloading');
  const {
    locationInput,
    destinationInput,
    updateInputState,
    getlocation,
    destinationInputRef,
    groupMembers,
    GroupInput,
    tripImage,
  } = extraData;
  return (
    <View
      key={isTripModalVisible}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={isTripModalVisible}
        // hasBackdrop={false}
        animationInTiming={100}
        animationOutTiming={100}
        animationType="fade"
        useNativeDriver
        avoidKeyboard
        onBackButtonPress={onBackPress}
        // backdropColor={'white'}
        style={styles.bottomModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            position: 'relative',
          }}>
          {isloading && <Overlay />}
          <Image style={styles.absolute} source={bgBlur} />
          <View style={styles.tripModalData}>
            <Ionicons
              name="close-outline"
              size={hp('3.5')}
              style={styles.tripCloseIcon}
              onPress={onBackPress}
              color={Colors.gray}
            />
            <View style={styles.groupInfoMain}>
              {tripImage ? (
                <CircleImage
                  image={tripImage?.uri}
                  uri={true}
                  styles={styles.groupLogo}
                />
              ) : (
                <FirstCharacterComponent text={GroupInput} />
              )}

              <View style={styles.groupDesc}>
                <Text style={styles.groupName}>{GroupInput}</Text>
                <Text style={styles.groupMember}>
                  {groupMembers.length} members
                </Text>
              </View>
            </View>
            <View style={styles.TripHeadBorder}></View>
            <View style={styles.modalInput}>
              {isTripType && (
                <>
                  <View style={styles.inputArea}>
                    <Image source={location} style={styles.inputLeftImg} />
                    <View
                      style={{
                        ...styles.input,
                        justifyContent: 'center',
                        paddingLeft: wp('2'),
                      }}>
                      <TextComponent
                        styles={{fontSize: hp('1.8')}}
                        numberOfLines={1}
                        text={locationInput?.description}
                      />
                    </View>
                    <Touchable>
                      <Image source={dots} style={styles.inputRightImg} />
                    </Touchable>
                  </View>
                  {/* <Image source={dotbar} style={styles.dotbar} /> */}
                </>
              )}
              {isTripType && <Image source={dotbar} style={styles.dotbar} />}
              {isTrue && (
                <View style={{...styles.inputArea}}>
                  <Image source={from} style={styles.inputLeftImg} />
                  <View
                    style={{
                      ...styles.input,
                      justifyContent: 'center',
                      paddingLeft: wp('2'),
                    }}>
                    <TextComponent
                      styles={{fontSize: hp('1.8')}}
                      numberOfLines={1}
                      text={destinationInput?.description}
                    />
                  </View>
                  {isTripType && (
                    <Touchable>
                      <Image source={arrows} style={styles.inputRightImg} />
                    </Touchable>
                  )}
                </View>
              )}
              {/* <ThemeButton
                title={'Get Current Location'}
                onPress={getlocation}
                btnStyle={styles.locationBtn}
              /> */}
              <ThemeButton
                title={'Confirm Location'}
                onPress={StartTripToggle}
                btnStyle={{...styles.locationBtn, marginBottom: hp('3')}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(StartTripModal);
