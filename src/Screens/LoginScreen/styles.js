import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  logInMain: {
    paddingHorizontal: wp('3.5'),
  },
  heading: {
    fontSize: hp('4'),
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    marginTop: hp('8'),
  },
  createAcc: {
    textAlign: 'center',
    marginTop: hp('1'),
    fontSize: hp('2.1'),
  },
  logInWith: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('2.5'),
    textAlign: 'center',
    alignItems: 'center',
  },
  logInBorder: {
    borderBottomWidth: 1,
    height: 0,
    flex: 1,
  },
  logInText: {
    flex: 1,
    fontSize: hp('2.1'),
    color: Colors.black,
    paddingHorizontal: wp('4'),
    justifyContent: 'center',
    textAlign: 'center',
  },
  googleBtn: {
    borderColor: Colors.themeRed,
    marginBottom: hp('2'),
  },
  googleBtnText: {
    color: Colors.themeRed,
  },
  appleBtn: {
    marginBottom: hp('2'),
    borderColor: Colors.themeBlack,
  },
  appleBtnText: {
    color: Colors.themeBlack,
  },
  facebookBtn: {
    marginBottom: hp('2'),
    borderColor: Colors.faceBookColor,
  },
  facebookBtnText: {
    color: Colors.faceBookColor,
  },
  signUpTextMain: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    marginLeft: wp('3'),
    fontSize: hp('2'),
    fontWeight: '600',
    color: 'red',
    textDecorationLine: 'underline',
  },
  rememberSec: {
    marginBottom: hp('5'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2'),
  },
  rememberInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tickIcon: {
    marginRight: wp('4'),
    // flex: 0.4,
    resizeMode: 'contain',
    height: hp('3'),
    width: wp('6'),
  },
  tickText: {
    color: 'black',
    fontSize: hp('1.9'),
  },
  forgetText: {
    flex: 1,
    textAlign: 'right',
    fontSize: hp('1.9'),
    color: 'rgba(45, 45, 45, 0.5)',
  },
  lockstyle: {
    flex: 0.3,
  },
});
