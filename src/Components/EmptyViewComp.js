import React from 'react';
import {View, Text} from 'react-native';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextComponent} from './TextComponent';
import {Touchable} from './Touchable';
import ThemeButton from './ThemeButton';

export const EmptyViewComp = ({onRefresh, refreshStyle}) => {
  return (
    <View
      style={{
        width: wp('70'),
        height: hp('30'),
        backgroundColor: Colors.themeExtraLight,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        ...refreshStyle,
      }}>
      <MaterialIcons
        name="search-off"
        size={hp('6')}
        color={Colors.primaryColor}
      />
      <TextComponent
        text={'No data found'}
        styles={{color: Colors.primaryColor, fontSIze: hp('3')}}
      />
      <ThemeButton
        // textStyle={styles.btnText}
        // onPress={() => onPress(1, tripId, tripOwner.id)}
        btnStyle={{
          backgroundColor: Colors.primaryColor,
          marginTop: hp('3'),
          width: wp('50'),
          // height: hp('5'),
          borderRadius: 10,
        }}
        // hide={true}
        title={'Refresh'}
        onPress={onRefresh}
      />
    </View>
  );
};
