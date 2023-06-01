import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';
import LinearGradient from 'react-native-linear-gradient';
import {TextComponent} from './TextComponent';

const InactiveBtn = ({title, onPress, style, textStyle, btnStyle}) => {
  return (
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      style={[styles.button, {...style}]}>
      <TextComponent styles={styles.text} text={title} />
    </Touchable>
  );
};

export default InactiveBtn;

const styles = StyleSheet.create({
  button: {
    width: wp('27'),
    textAlign: 'center',
    height: hp('5'),
    justifyContent: 'center',
    marginHorizontal: wp('3'),
    marginBottom: hp('-1.5'),
    marginTop: hp('-1.2'),
    border: 1,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 10,
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: hp('2'),
    color: '#2D2D2D',
    textAlign: 'center',
    fontWeight: 400,
    justifyContent: 'center',
  },
});
