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
const StartTripModal = ({StartTripToggle, isTripModalVisible}) => {
  const {
    locationInput,
    setLocationInput,
    destinationInput,
    setDestinationInput,
  } = useHomeScreen();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={isTripModalVisible}
        hasBackdrop={false}
        animationInTiming={100}
        animationOutTiming={100}
        animationType="fade"
        // backdropColor={'white'}
        style={styles.bottomModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            position: 'relative',
          }}>
          <Image style={styles.absolute} source={bgBlur} />
          <View style={styles.tripModalData}>
            <View style={styles.groupInfoMain}>
              {/* <Image source={DemoProfileImage1} style={styles.groupLogo} /> */}
              <CircleImage image={DemoProfileImage1} style={styles.groupLogo} />
              <View style={styles.groupDesc}>
                <Text style={styles.groupName}>Business Meets</Text>
                <Text style={styles.groupMember}>15 members</Text>
              </View>
            </View>
            <View style={styles.TripHeadBorder}></View>
            <View style={styles.mainInput}>
              <View style={styles.inputArea}>
                <Image source={location} style={styles.inputLeftImg} />
                <TextInput
                  style={styles.input}
                  onChangeText={setLocationInput}
                  value={locationInput}
                  placeholder="Choose Start Location"
                />
                <Touchable>
                  <Image source={dots} style={styles.inputRightImg} />
                </Touchable>
              </View>
              <Image source={dotbar} style={styles.dotbar} />
              <View style={styles.inputArea}>
                <Image source={from} style={styles.inputLeftImg} />
                <TextInput
                  style={styles.input}
                  onChangeText={setDestinationInput}
                  value={destinationInput}
                  placeholder="Choose Destination"
                />
                <Touchable>
                  <Image source={arrows} style={styles.inputRightImg} />
                </Touchable>
              </View>
              <ThemeButton
                title={'Start Trip'}
                onPress={StartTripToggle}
                btnStyle={styles.tripModalBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(StartTripModal);
