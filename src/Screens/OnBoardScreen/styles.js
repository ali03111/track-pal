import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  appHeadingView: {
    flexDirection: 'row',
    width: wp('55'),
    justifyContent: 'space-between',
  },
  redColorText: {color: Colors.red, fontSize: hp('4'), fontWeight: 'bold'},
  // dotList: {
  //   flexDirection: 'row',
  //   width: wp('18'),
  //   height: hp('3'),
  //   justifyContent: 'space-between',

  //   // marginTop: hp('/2'),
  // },
  getStart: {
    width: wp('15'),
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: hp('6.5'),
    // borderRadius: 60,
    // marginTop: hp('3'),
    // marginBottom: hp('5'),
    alignSelf: 'center',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  centerMainView: {
    width: wp('100'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  centerHeading: {
    fontSize: hp('4'),
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    marginTop: hp('58.5'),
    paddingHorizontal: wp('13'),
  },
  descStyle: {
    textAlign: 'center',
    marginTop: hp('1'),
    fontSize: hp('2.1'),
    paddingHorizontal: wp('16'),
    marginTop: hp('2'),
    marginBottom: hp('5'),
  },
  // centerDes: {
  //   fontSize: hp('2'),
  //   color: Colors.gray,
  //   width: wp('93'),
  //   textAlign: 'center',
  // },
  // dot: (currentIndex, index) => ({
  //   borderRadius: Math.round(
  //     Dimensions.get('window').width + Dimensions.get('window').height,
  //   ),
  //   height: Dimensions.get('window').width * 0.03,
  //   width:
  //     currentIndex == index
  //       ? Dimensions.get('window').width * 0.06
  //       : Dimensions.get('window').width * 0.03,
  //   backgroundColor: currentIndex == index ? '#212759' : Colors.white,
  //   borderWidth: currentIndex == index ? 0 : 1,
  // }),
  bannerImg: {
    height: hp('90'),
    width: wp('100'),
    // backgroundColor: 'red',
  },
  arrStyle: {
    width: wp('100'),
    height: hp('6'),
  },
});
