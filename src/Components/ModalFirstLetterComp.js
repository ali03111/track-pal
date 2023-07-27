import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {hp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import {tripProfileColors} from '../Utils/localDB';
import {getSingleCharacter} from '../Utils/globalFunctions';

// const generateColor = () => {
//   // const [colorState, setColorState] = useState('');

//   profileBgColor = tripProfileColors[Math.floor(Math.random() * 10)];
//   return profileBgColor;
//   // setColorState(generateColor);
// };

export const ModalFirstLetterComp = ({text, extraStyle}) => {
  return (
    <View
      style={{
        backgroundColor: '#4169E1',
        ...styles.letterStyle,
        ...extraStyle,
      }}>
      <Text style={styles.letterSt}>{getSingleCharacter(text)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  letterSt: {
    color: Colors.white,
    fontSize: hp('3.3'),
    fontWeight: '700',
  },
  letterStyle: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
