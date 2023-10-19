import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  searchBar: {},
  searchMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    minHeight: hp('7'),
    maxHeight: hp('14'),
    // height: 'auto',
    borderRadius: 10,
    borderColor: Colors.grayBorder,
    paddingHorizontal: wp('1.8'),
    // marginHorizontal: wp('4'),
    // marginVertical: hp('2'),
    overflow: 'hidden',
    marginBottom: Platform.OS == 'ios' ? hp('1') : hp('0'), // justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  searchinput: {
    // paddingHorizontal: wp(''),
    // width: wp('65'),
    paddingRight: wp('3'),
    fontSize: hp('2'),
    flex: 1,
    color: 'black',
  },
  sendBtnStyle: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  sendTextStyle: {
    color: 'white',
    marginLeft: wp('1.5'),
    paddingVertical: hp('1.3'),
    // paddingHorizontal: wp('3'),
  },
  msgsRecieve: {
    paddingHorizontal: wp('4'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendIcon: {
    width: wp('7'),
    height: hp('3.5'),
    resizeMode: 'contain',
    marginLeft: wp('-1'),
  },
  searchinput: {
    // paddingHorizontal: wp(''),
    // width: wp('65'),
    paddingRight: wp('3'),
    fontSize: hp('2'),
    // flex: 1,
    color: 'black',
    minHeight: hp('5'),
    maxHeight: hp('13'),
    width: wp('63'),
    justifyContent: 'center',
    // paddingVertical: hp('2'),
    // backgroundColor: 'rsed',
    textAlignVertical: 'center',
    paddingTop: hp('1.5'),
    // height: 'auto',
  },
});
