import {Dimensions, Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  tips: {
    // paddingHorizontal: wp('3.5'),
    // backgroundColor: Colors.white,
    // paddingTop: hp('3'),
    flex: 1,
  },
  headerStyle: {
    paddingHorizontal: wp('0'),
  },
  hdTitle: {
    fontWeight: '600',
  },
  rowBack: {
    // width: '100%',
    // marginBottom: 10,
    // flex: 1,
    borderRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: wp('3.5'),
  },
  backRightBtn: {
    // textAlign: 'left',
    // alignItems: 'center',
  },
  backRightBtnLeft: {
    backgroundColor: '#EA4335',
    flex: 1,
    height: Platform.OS == 'ios' ? hp('19.2') : hp('23.1'),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingTop: hp('9.5'),
    paddingLeft: wp('6'),
  },
  backRightBtnRight: {
    backgroundColor: '#1877F2',
    flex: 1,
    height: Platform.OS == 'ios' ? hp('19.2') : hp('23.1'),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'flex-end',
    paddingTop: hp('9.5'),
    paddingRight: wp('6'),
  },
  groupName: {
    fontSize: hp('2.3'),
    color: Colors.black,
    fontWeight: '600',
    marginBottom: hp('1'),
  },
  groupMember: {
    fontSize: hp('1.8'),
    color: Colors.gray,
  },
  groupActive: status => ({
    fontSize: hp('1.8'),
    color: status == 'Active' ? Colors.fadeGreen : Colors.primaryColor,
    // marginTop: hp('-.4'),
  }),
  groupDesc: {
    flex: 1,
    marginLeft: wp('3'),
  },
  activeCardStyle: {
    // flexDirection: 'row',
    // backgroundColor: Colors.avtiveCard,
    paddingHorizontal: wp('1'),
    paddingVertical: hp('.6'),
    marginBottom: hp('3'),
    borderRadius: 10,
    flex: 1,
  },
  activeCardMain: status => ({
    flex: 1,
    backgroundColor:
      status == 'Active' ? Colors.avtiveCard : Colors.inavtiveCard,
    paddingHorizontal: wp('1.5'),
    paddingVertical: hp('.6'),
    marginBottom: hp('3'),
    borderRadius: 8,
    // height: hp('22'),
    flexDirection: 'row',
    marginHorizontal: wp('3.5'),
  }),
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: wp('3'),
    paddingTop: hp('1.5'),
  },
  TripBtn: {
    width: wp('27'),
    textAlign: 'center',
    height: hp('5'),
    justifyContent: 'center',
    marginHorizontal: wp('3'),
    marginBottom: hp('-1.5'),
    marginTop: hp('-1.2'),
  },
  TripBtnText: {
    fontWeight: '400',
  },
  letterSt: {
    color: Colors.white,
    fontSize: hp('3'),
    fontWeight: '700',
  },
  letterStyle: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trachIcon: {
    width: wp('6'),
    resizeMode: 'contain',
  },
  editIcon: {
    width: wp('6'),
    resizeMode: 'contain',
  },
  loaderMain: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: hp('1.5'),
  },
  LoaderImage: {
    width: wp('15'),
    height: hp('7.5'),
    borderRadius: 50,
  },
  loaderInner: {
    marginLeft: wp('5'),
    marginRight: wp('18'),
  },
  loaderName: {
    width: wp('40'),
    height: hp('2'),
    marginTop: hp('1'),
  },
  loaderDes: {
    width: wp('30'),
    height: hp('1'),
    marginTop: hp('1'),
  },
  loaderBtn: {
    width: wp('30'),
    height: hp('4'),
    marginTop: hp('4'),
    marginLeft: wp('1'),
  },
  loaderBar: {
    width: wp('10'),
    height: hp('16'),
    borderRadius: 5,
  },
  refresh: {
    marginTop: hp('6'),
  },
  tabarTitle: {
    fontSize: hp('1.1'),
  },
  circleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('14'),
    marginTop: hp('-0.6'),
  },
  messageNumber: {
    color: Colors.primaryColor,
    fontSize: hp('1.5'),
  },
  groupLogo: {
    backgroundColor: 'red',
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
  },
});
