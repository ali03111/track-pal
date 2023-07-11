import React, {memo, useCallback, useState} from 'react';
import {View, Image, TextInput} from 'react-native';
import {arrows, bgBlur, dotbar, dots, from, location} from '../../Assets';
import {styles} from './styles';
import {Touchable} from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import {tripsTypes} from '../../Utils/localDB';
import {hp} from '../../Config/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SelectLocationModal = ({
  isModalVisible,
  toggleLocationModal,
  locationInput,
  destinationInput,
  updateState,
  onBackPress,
  extraData,
}) => {
  const isTripType = Boolean(extraData.selectTripType != tripsTypes[0].id);

  return (
    <View
      key={isModalVisible}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={isModalVisible}
        hasBackdrop={true}
        animationInTiming={100}
        animationOutTiming={100}
        hideModalContentWhileAnimating
        useNativeDriver
        avoidKeyboard
        onBackButtonPress={onBackPress}
        animationType="fade"
        // backdropColor={'white'}
        style={styles.bottomModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            // position: 'relative',
          }}>
          <Image style={styles.absolute} source={bgBlur} />
          <View style={styles.modalData(isTripType)}>
            {/* <View style={styles.groupInfoMain}>
                  <Image source={DemoProfileImage1} style={styles.groupLogo} />
                  <View style={styles.groupDesc}>
                    <Text style={styles.groupName}>Business Meets</Text>
                    <Text style={styles.groupMember}>15 members</Text>
                  </View>
                </View> */}
            <View style={styles.modalInput}>
              {isTripType && (
                <>
                  <Ionicons
                    name="close-outline"
                    size={hp('3.5')}
                    style={styles.closeIcon}
                    onPress={onBackPress}
                  />
                  <View style={styles.inputArea}>
                    <Image source={location} style={styles.inputLeftImg} />
                    <TextInput
                      style={styles.input}
                      onChangeText={e => updateState({locationInput: e})}
                      value={locationInput}
                      placeholder="Choose Start Location"
                      placeholderTextColor={'gray'}
                    />
                    <Touchable>
                      <Image source={dots} style={styles.inputRightImg} />
                    </Touchable>
                  </View>
                  <Image source={dotbar} style={styles.dotbar} />
                </>
              )}
              <View style={styles.inputArea}>
                <Image source={from} style={styles.inputLeftImg} />
                <TextInput
                  style={styles.input}
                  onChangeText={e => updateState({destinationInput: e})}
                  value={destinationInput}
                  placeholderTextColor={'gray'}
                  placeholder="Choose Destination"
                />
                <Touchable>
                  <Image source={arrows} style={styles.inputRightImg} />
                </Touchable>
              </View>
              <ThemeButton
                title={'Get Current Location'}
                onPress={toggleLocationModal}
                btnStyle={styles.locationBtn}
              />
              <ThemeButton
                title={'Confirm Location'}
                onPress={toggleLocationModal}
                btnStyle={{...styles.locationBtn, marginBottom: hp('3')}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(SelectLocationModal);
