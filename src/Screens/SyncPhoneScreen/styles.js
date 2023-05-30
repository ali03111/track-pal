import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  heading: {
    fontSize: hp('4'),
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    marginTop: hp('2'),
    marginBottom: hp('5'),
  },
  syncMain: {
    paddingHorizontal: wp('3.5'),
    flex: 1,
    justifyContent: 'center',
  },
  syncImg: {
    alignSelf: 'center',
  },
});
