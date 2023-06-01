import React, {memo} from 'react';
import {View, Image, Pressable} from 'react-native';
import {bgBlurDone, check} from '../../Assets';
import {styles} from './styles';
import {BlurView} from '@react-native-community/blur';
import Modal from 'react-native-modal';
import GradientText from '../../Components/GradientText';

const TripCreatedModal = ({isTripCreated, TripCreatedToggle, title}) => {
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
          <Image style={styles.absolute} source={bgBlurDone} />
          <View style={styles.checkedMain}>
            <Image source={check} />
            <GradientText
              GradientAlignment={0.8}
              onPress={TripCreatedToggle}
              style={styles.tripText}>
              {title ?? 'Trip Created'}
            </GradientText>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default memo(TripCreatedModal);
