import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  logInMain: {
    // flexGrow: 1,
    paddingHorizontal: wp('3.5'),
    paddingTop: hp('3'),
    paddingBottom: hp('6'),
  },
  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp('2.5'),
  },
  backBtn: {
    marginLeft: wp('3'),
    color: 'rgba(45, 45, 45, 0.5)',
  },
  heading: {
    fontSize: hp('4'),
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    marginTop: hp('3'),
  },
  createAcc: {
    textAlign: 'center',
    marginTop: hp('1'),
    fontSize: hp('2.1'),
  },

  signUpTextMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('3'),
  },
  signUpText: {
    marginLeft: wp('3'),
    fontSize: hp('2'),
    fontWeight: '600',
    color: 'red',
    textDecorationLine: 'underline',
  },
  buttonStyle: {
    marginTop: hp('5'),
  },
  lockstyle: {
    flex: 0.3,
  },
});
