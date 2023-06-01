import React, {memo, useCallback, useState} from 'react';
import {View, Image, TextInput} from 'react-native';
import {arrows, bgBlur, dotbar, dots, from, location} from '../../Assets';
import {styles} from './styles';
import {Touchable} from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';

const SelectLocationModal = ({
  isModalVisible,
  toggleLocationModal,
  locationInput,
  destinationInput,
  updateState,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={isModalVisible}
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
          <View style={styles.modalData}>
            {/* <View style={styles.groupInfoMain}>
                  <Image source={DemoProfileImage1} style={styles.groupLogo} />
                  <View style={styles.groupDesc}>
                    <Text style={styles.groupName}>Business Meets</Text>
                    <Text style={styles.groupMember}>15 members</Text>
                  </View>
                </View> */}
            <View style={styles.modalInput}>
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
                title={'Confirm Location'}
                onPress={toggleLocationModal}
                btnStyle={styles.locationBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(SelectLocationModal);
