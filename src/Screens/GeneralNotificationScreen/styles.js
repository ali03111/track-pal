import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  tabStyle: {},
  bg: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refStyle: {
    marginTop: hp('3'),
  },
  headerStyle: {
    paddingHorizontal: wp('3.5'),
    marginBottom: hp('0'),
  },
  hdTitle: {
    fontWeight: '600',
    color: Colors.black,
  },
  back: {
    color: Colors.black,
  },
});
