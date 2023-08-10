import React, {memo, useCallback, useState} from 'react';
import {View, Image, TextInput, FlatList, Text, Button} from 'react-native';
import {
  DemoProfileImage1,
  editIcon,
  addProfileImage,
  bgBlur,
  tooltip,
  tooltip1,
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
import {hp, wp} from '../../Config/responsive';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Theme/Variables';

const TripTypeSelectModal = ({
  isTripSelectModal,
  toggleNextModal,
  onBackPress,
  extraData,
  istooltipModal,
}) => {
  const {selectTripType, updateState} = extraData;
  const [indexNumber, setIndexNumber] = useState(0);
  const renderItem = useCallback(({item, index}) => {
    return (
      <Touchable
        onPress={() => updateState({selectTripType: item?.id})}
        style={styles.radioMain}>
        <RadioButton.Group
          onValueChange={newValue => updateState({selectTripType: newValue})}
          value={selectTripType}>
          <View style={styles.radio}>
            <View style={styles.radioTitle}>
              <RadioButton value={item?.id} color="#EE2A7B" />
            </View>
            <View style={{flex: 1}}>
              <View style={styles.tooltipMain}>
                <TextComponent text={item?.title} styles={styles.radioText} />
                <Touchable
                  Opacity={0.7}
                  onPress={() => {
                    setIndexNumber(index);
                    updateState({istooltipModal: true});
                  }}>
                  <Image source={tooltip1} style={styles.tooltipImage} />
                </Touchable>
              </View>
              <TextComponent text={item?.des} styles={styles.radioDes} />
            </View>
          </View>
        </RadioButton.Group>
      </Touchable>
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
              <Ionicons
                name="close-outline"
                size={hp('3.5')}
                style={styles.closeIcon}
                onPress={onBackPress}
                color={Colors.gray}
              />
              <GradientText GradientAlignment={0.8} style={styles.selectTrip}>
                {'Select A Trip'}
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
      <View style={{flex: 1}}>
        <Modal
          isVisible={istooltipModal}
          backdropColor="black"
          backdropOpacity={0.5}>
          <View style={styles.tooltipView}>
            <Ionicons
              name="close-outline"
              size={hp('3.5')}
              style={styles.tooltipClose}
              onPress={() => updateState({istooltipModal: false})}
              color={Colors.gray}
            />
            <GradientText GradientAlignment={0.8} style={styles.tooltipHeading}>
              {tripsTypes[indexNumber].title}
            </GradientText>
            <TextComponent
              text={tripsTypes[indexNumber].details}
              styles={styles.tooltipText}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default memo(TripTypeSelectModal);
