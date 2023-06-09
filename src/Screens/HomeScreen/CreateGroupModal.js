import React, {memo, useState} from 'react';
import {View, Image, TextInput} from 'react-native';
import {DemoProfileImage1, editIcon, addProfileImage} from '../../Assets';
import {styles} from './styles';

import useHomeScreen from './useHomeScreen';
import {BlurView} from '@react-native-community/blur';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
const CreateGroupModal = ({iscreateModal, CreateGroup}) => {
  const {GroupInput, setGroupInput} = useHomeScreen();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={iscreateModal}
        hasBackdrop={false}
        animationInTiming={100}
        animationOutTiming={100}
        animationType="fade"
        style={styles.bottomModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            position: 'relative',
          }}>
          <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
          <View style={styles.modalData}>
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
                  onChangeText={setGroupInput}
                  value={GroupInput}
                  placeholder="Name your Trip"
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
