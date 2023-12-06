import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';
import {arrowRightIcon, userProfileIcon} from '../Assets';

const ProfileBtn = ({title, onPress, icon, style, textStyle, imageStyle}) => {
  return (
    <Touchable Opacity={0.7} onPress={onPress} style={styles.button}>
      <Image source={icon} style={styles.iconStyle} />
      <Text style={styles.text}>{title}</Text>
      <Image source={arrowRightIcon} style={styles.arrowStyle} />
    </Touchable>
  );
};

export default ProfileBtn;

const styles = StyleSheet.create({
  button: {
    height: hp('6.5'),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(45, 45, 45, 0.1)',
    marginBottom: hp('2.5'),
  },
  text: {
    fontSize: hp('2'),
    color: Colors.black,
    textAlign: 'left',
    marginLeft: wp('3'),
    flex: 1,
  },
  linearGradient: {
    borderRadius: 10,
  },
  iconStyle: {
    flex: 0.08,
    width: wp('5'),
    height: hp('5'),
    resizeMode: 'contain',
    tintColor: Colors.iconColor,
  },
  arrowStyle: {
    flex: 0.06,
    width: wp('2'),
    height: hp('2'),
    resizeMode: 'contain',
  },
});
