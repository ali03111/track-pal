import React, {memo, useState} from 'react';
import {View, Image, TextInput, Pressable} from 'react-native';
import {
  DemoProfileImage1,
  editIcon,
  addProfileImage,
  check,
} from '../../Assets';
import {styles} from './styles';

import useHomeScreen from './useHomeScreen';
import {BlurView} from '@react-native-community/blur';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
import {TextComponent} from '../../Components/TextComponent';
import GradientText from '../../Components/GradientText';
const TripCreatedModal = ({isTripCreated, TripCreatedToggle}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={isTripCreated}
        hasBackdrop={false}
        animationInTiming={100}
        animationOutTiming={100}
        animationType="fade"
        style={styles.bottomModal}>
        <Pressable
          onPress={TripCreatedToggle}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            position: 'relative',
          }}>
          <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
          <View style={styles.checkedMain}>
            <Image source={check} />
            <GradientText
              GradientAlignment={0.8}
              onPress={TripCreatedToggle}
              style={styles.tripText}>
              Trip Created
            </GradientText>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default memo(TripCreatedModal);
