import React, {memo, useState} from 'react';
import {View, Image, TextInput} from 'react-native';
import {
  DemoProfileImage1,
  editIcon,
  addProfileImage,
  bgBlur,
} from '../../Assets';
import {styles} from './styles';

import useHomeScreen from './useHomeScreen';
import {BlurView} from '@react-native-community/blur';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
const CreateGroupModal = ({
  iscreateModal,
  CreateGroup,
  onBackPress,
  extraData,
}) => {
  // const {GroupInput, setGroupInput} = useHomeScreen();
  const {selectTripType, GroupInput, updateInputState} = extraData;
  return (
    <View
      key={iscreateModal}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={iscreateModal}
        // hasBackdrop={false}
        animationInTiming={100}
        animationOutTiming={100}
        avoidKeyboard
        animationType="fade"
        hideModalContentWhileAnimating
        useNativeDriver
        onBackButtonPress={onBackPress}
        style={styles.bottomModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            // position: 'relative',
          }}>
          <Image style={styles.absolute} source={bgBlur} />
          <View style={styles.modalData(true)}>
            <View style={styles.modalInput}>
              <View style={styles.userProfileImg}>
                <CircleImage
                  image={DemoProfileImage1}
                  styles={styles.profileEditImg}
                />
                <Touchable Opacity={0.8}>
                  <Image source={addProfileImage} style={styles.addImageIcon} />
                </Touchable>
              </View>
              <View style={styles.editInput}>
                <Image source={editIcon} style={styles.editIcon} />
                <TextInput
                  style={styles.eInput}
                  onChangeText={e => updateInputState({GroupInput: e})}
                  value={GroupInput}
                  placeholder="Name your Trip"
                  placeholderTextColor={'gray'}
                />
              </View>
              <ThemeButton title={'Next'} onPress={CreateGroup} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(CreateGroupModal);
