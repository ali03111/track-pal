import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {hp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import {tripProfileColors} from '../Utils/localDB';
import {getSingleCharacter} from '../Utils/globalFunctions';

export const FirstCharacterComponent = ({text}) => {
  const generateColor = () => {
    profileBgColor = tripProfileColors[Math.floor(Math.random() * 10)];
    return profileBgColor;
  };
  return (
    <View
      style={{
        backgroundColor: generateColor(),
        ...styles.letterStyle,
      }}>
      <Text style={styles.letterSt}>{getSingleCharacter(text)}</Text>
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
