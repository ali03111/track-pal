import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  logInMain: {
    paddingHorizontal: wp('3.5'),
    flex: 1,
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
    marginTop: hp('6'),
  },
  createAcc: {
    textAlign: 'center',
    marginTop: hp('1'),
    fontSize: hp('2.1'),
  },
  lockstyle: {
    flex: 0.3,
  },
  headerStyle: {
    paddingHorizontal: wp('0'),
  },
  hdTitle: {
    fontWeight: '600',
  },
  buttonStyle: {
    width: wp('43'),
    // marginTop: hp('5'),
  },
  inputStyle: {
    marginTop: hp('10'),
  },
  numberView: {
    width: wp('89'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('2'),
    paddingHorizontal: wp('2'),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: hp('5'),
  },
  bottomText: {
    textAlign: 'center',
    fontSize: hp('2'),
    fontWeight: 'bold',
  },
  inputView: {
    backgroundColor: 'transparent',
    marginTop: hp('6'),
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: 'hidden',
    width: wp('90'),
  },
});
