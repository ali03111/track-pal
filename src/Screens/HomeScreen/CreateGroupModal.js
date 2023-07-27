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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';
import BlurImage from '../../Components/BlurImage';
import {Text} from 'react-native-paper';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {ModalFirstLetterComp} from '../../Components/ModalFirstLetterComp';

const CreateGroupModal = ({
  iscreateModal,
  CreateGroup,
  onBackPress,
  extraData,
}) => {
  // const {GroupInput, setGroupInput} = useHomeScreen();
  const {
    selectTripType,
    GroupInput,
    updateInputState,
    uploadFromGalary,
    tripImage,
  } = extraData;
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
          <View style={{...styles.modalData(true), paddingBottom: hp('2')}}>
            <View style={styles.modalInput}>
              <Ionicons
                name="close-outline"
                size={hp('3.5')}
                style={styles.closeIcon}
                onPress={onBackPress}
                color={Colors.gray}
              />
              <View style={styles.userProfileImg}>
                {/* <CircleImage
                  image={DemoProfileImage1}
                  styles={styles.profileEditImg}
                /> */}
                {/* <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <BlurImage
                    blurhash={'LKK1wP_3yYIU4.jsWrt7_NRjMdt7'}
                    radius={75}
                    styles={styles.ProfileImage}
                    uri={tripImage?.uri}
                  />
                </View> */}
                {/* <FirstCharacterComponent text={GroupInput ? GroupInput : 'T'} /> */}
                <ModalFirstLetterComp text={GroupInput ? GroupInput : 'T'} />

                {/* <Touchable onPress={uploadFromGalary} Opacity={0.8}>
                  <Image source={addProfileImage} style={styles.addImageIcon} />
                </Touchable> */}
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
