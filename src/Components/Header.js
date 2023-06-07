import React from 'react';
import {StyleSheet, Text, Image, View, Platform} from 'react-native';
import {TextComponent} from './TextComponent';
import {Touchable} from './Touchable';
import {arrowBack} from '../Assets';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';

const CustomHeader = ({
  headerTitle,
  style,
  saveReset,
  icon,
  arrowBackIcon,
  backText,
  saveResetStyle,
  goBack,
  backTextStyle,
  titleStyle,
}) => {
  return (
    <View style={[styles.TopHeader, {...style}]}>
      <View style={styles.HeaderLeft}>
        <Touchable onPress={goBack} style={styles.backMain}>
          <Image
            source={arrowBackIcon}
            style={{
              resizeMode: 'contain',
              ...styles.arrowback,
            }}
          />
          <TextComponent
            text={backText}
            styles={{...styles.backBtn, ...backTextStyle}}
          />
        </Touchable>
      </View>
      <View style={styles.HeaderCenter}>
        <TextComponent
          text={headerTitle}
          styles={{...styles.HeaderTitle, ...titleStyle}}
        />
      </View>
      <View style={styles.HeaderRight}>
        <Touchable style={styles.backMain}>
          <Image
            source={icon}
            style={{
              resizeMode: 'contain',
              style: styles.arrowback,
            }}
          />
          <TextComponent
            text={saveReset}
            styles={{...styles.backBtn, ...saveResetStyle}}
          />
        </Touchable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TopHeader: {
    flexDirection: 'row',
    marginTop: Platform.OS == 'ios' ? hp('6') : hp('3'),
    paddingHorizontal: wp('5'),
    paddingBottom: hp('3'),
  },

  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  backBtn: {
    marginLeft: wp('3'),
    color: Colors.gray2,
    fontSize: hp('2'),
  },
  HeaderTitle: {
    fontSize: hp('2'),
    color: Colors.black,
    fontWeight: 500,
    justifyContent: 'center',
  },
  HeaderLeft: {
    flex: 0.5,
    justifyContent: 'center',
  },
  arrowback: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  HeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  HeaderRight: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
export default CustomHeader;
