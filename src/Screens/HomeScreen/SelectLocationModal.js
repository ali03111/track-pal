import React, {memo, useCallback, useState} from 'react';
import {View, Image, TextInput} from 'react-native';
import {arrows, bgBlur, dotbar, dots, from, location} from '../../Assets';
import {styles} from './styles';
import {Touchable} from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import {tripsTypes} from '../../Utils/localDB';
import {hp} from '../../Config/responsive';
import {AutoFillGoogleComp} from '../../Components/AutoFillGoogleComp';

const SelectLocationModal = ({
  isModalVisible,
  toggleLocationModal,
  onBackPress,
  extraData,
}) => {
  const isTripType = Boolean(extraData.selectTripType != tripsTypes[0].id);
  const {
    locationInput,
    destinationInput,
    updateInputState,
    getlocation,
    destinationInputRef,
  } = extraData;
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
        animationInTiming={100}
        animationOutTiming={100}
        // hideModalContentWhileAnimating
        // useNativeDriver
        // avoidKeyboard
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
          <View style={{...styles.modalData(isTripType)}}>
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
                  <View style={styles.inputArea}>
                    <Image source={location} style={styles.inputLeftImg} />
                    <AutoFillGoogleComp
                      handleButtonClick={e =>
                        updateInputState({locationInput: e})
                      }
                      key={0}
                      inputContainerStyle={styles.input}
                      inputPlaceHolder="Choose Start Location"
                      inputVal={locationInput.description}
                      defaultValue={locationInput.description}
                      onChangeText={text =>
                        updateInputState({locationInput: {description: text}})
                      }
                    />
                    <Touchable>
                      <Image source={dots} style={styles.inputRightImg} />
                    </Touchable>
                  </View>
                  {/* <Image source={dotbar} style={styles.dotbar} /> */}
                </>
              )}
              {isTripType && <Image source={dotbar} style={styles.dotbar} />}
              <View style={{...styles.inputArea}}>
                <Image source={from} style={styles.inputLeftImg} />
                <AutoFillGoogleComp
                  handleButtonClick={e => {
                    updateInputState({destinationInput: e});
                    destinationInputRef.current = e;
                  }}
                  key={1}
                  inputContainerStyle={styles.input}
                  inputPlaceHolder="Choose End Location"
                  inputVal={destinationInput.description}
                  defaultValue={destinationInput.description}
                  onChangeText={text => {
                    updateInputState({destinationInput: {description: text}});
                    destinationInputRef.current = {description: text};
                  }}
                />
                {/* <TextInput
                  style={styles.input}
                  onChangeText={e =>
                    updateInputState({destinationInput: {description: e}})
                  }
                  value={destinationInput.description }
                  placeholderTextColor={'gray'}
                  placeholder="Choose Destination"
                /> */}
                {isTripType && (
                  <Touchable>
                    <Image source={arrows} style={styles.inputRightImg} />
                  </Touchable>
                )}
              </View>
              <ThemeButton
                title={'Get Current Location'}
                onPress={getlocation}
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
