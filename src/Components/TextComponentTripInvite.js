import React from 'react';
import {Text, View} from 'react-native';
import {hp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';

export const TextComponentTripInvite = ({
  text,
  styles,
  onPress,
  numberOfLines,
  tripName,
  tripStyles,
}) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      <Text
        onPress={onPress}
        numberOfLines={numberOfLines}
        style={{
          color: Colors.black,
          fontSize: hp('2'),

          ...styles,
        }}>
        {text + ' '}
        <Text style={{...tripStyles}}>{tripName}</Text>
      </Text>
    </View>
  );
};
