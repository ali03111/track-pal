import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  syncMain: {
    paddingHorizontal: wp('3.5'),
    flex: 1,
    justifyContent: 'center',
  },
  syncImg: {
    alignSelf: 'center',
  },
  syncHeading: {
    fontSize: hp('3'),
    fontWeight: 500,
    textAlign: 'center',
    marginTop: hp('3'),
  },
  syncText: {
    textAlign: 'center',
    marginTop: hp('1'),
  },
});
