import React, {memo, useCallback, useState} from 'react';
import {View, Image, TextInput, FlatList, Text} from 'react-native';
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
import {RadioButton} from 'react-native-paper';
import {tripsTypes} from '../../Utils/localDB';
import {wp} from '../../Config/responsive';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';

const TripTypeSelectModal = ({
  isTripSelectModal,
  toggleNextModal,
  onBackPress,
}) => {
  const [value, setValue] = React.useState('first');
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.radioMain}>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <View style={styles.radio}>
            <View style={styles.radioTitle}>
              <RadioButton value="first" color="#EE2A7B" />
            </View>
            <View style={{flex: 1}}>
              <TextComponent text={item?.title} styles={styles.radioText} />
              <TextComponent text={item?.des} styles={styles.radioDes} />
            </View>
          </View>
        </RadioButton.Group>
      </View>
    );
  });
  return (
    <View
      key={isTripSelectModal}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={isTripSelectModal}
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
            <View style={styles.SelectTripModal}>
              <GradientText GradientAlignment={0.8} style={styles.selectTrip}>
                {'Select A Trip Type'}
              </GradientText>
              <FlatList
                refreshing={false}
                data={tripsTypes}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                contentContainerStyle={{
                  paddingRight: wp('2'),
                  paddingLeft: wp('0'),
                }}
              />

              <ThemeButton
                title={'Next'}
                onPress={toggleNextModal}
                btnStyle={styles.btnstyle}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(TripTypeSelectModal);
