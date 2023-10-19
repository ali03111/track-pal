import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {hp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import {tripProfileColors} from '../Utils/localDB';
import {getSingleCharacter} from '../Utils/globalFunctions';

export const FirstCharacterComponent = ({
  text,
  extraStyle,
  textStyle,
  indexNumber,
}) => {
  const generateColor = () => {
    profileBgColor = tripProfileColors[indexNumber ?? 2];
    return profileBgColor;
  };
  return (
    <View
      style={{
        backgroundColor: generateColor(),
        ...styles.letterStyle,
        ...extraStyle,
      }}>
      <Text style={{...styles.letterSt, ...textStyle}}>
        {getSingleCharacter(text)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  letterSt: {
    color: Colors.white,
    fontSize: hp('3'),
    fontWeight: '700',
  },
  letterStyle: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
