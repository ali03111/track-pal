import {StyleSheet, Dimensions} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  logInMain: {
    paddingHorizontal: wp('3.5'),
    backgroundColor: Colors.white,
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
  lockstyle: {
    // flex: 0.3,
  },
  headerStyle: {
    paddingHorizontal: wp('3.5'),
    marginBottom: hp('15'),
  },
  hdTitle: {
    fontWeight: '600',
    color: Colors.white,
  },
  back: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  buttonStyle: {
    marginTop: hp('5'),
  },
  mainStyle: {
    marginTop: hp('0'),
  },
  inputStyle: {
    paddingLeft: hp('0'),
  },
  inputTitle: {
    fontSize: hp('1.7'),
    color: Colors.gray,
    marginTop: hp('2.5'),
  },
  passBtn: {
    flexDirection: 'row',
    marginTop: hp('2.5'),
    borderBottomWidth: 1,
    borderColor: 'rgb(118, 118, 118)',
    marginBottom: hp('1'),
    height: hp('4'),
  },
  passText: {
    flex: 1,
    color: '#2D2D2D',
  },
  passIcon: {
    flex: 0.06,
    resizeMode: 'contain',
  },
  profileEditImg: {
    alignSelf: 'center',
    marginTop: hp('-9'),
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
  },
  userProfileImg: {
    backgroundColor: Colors.white,
    position: 'relative',
  },
  addImageIcon: {
    alignSelf: 'center',
    position: 'absolute',
    left: wp('55%'),
    bottom: hp('0'),
  },
});
