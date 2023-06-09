import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  homeScreenStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  logo: {
    resizeMode: 'contain',
    width: wp('37'),
    alignSelf: 'center',
    paddingVertical: hp('5'),
  },
  heading: {
    fontSize: hp('1.8'),
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    marginTop: hp('1'),
  },
  trips: {
    paddingRight: wp('4'),
  },
  TripsHeading: {
    fontSize: hp('3'),
    fontWeight: '600',
    marginTop: hp('5'),
    marginBottom: hp('3'),
    paddingHorizontal: wp('4'),
  },

  groupInfoMain: {
    marginTop: hp('0'),
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1.5'),
    position: 'relative',
    overflow: 'hidden',
  },

  mapArea: {
    borderRadius: 20,
    marginHorizontal: wp('4'),
    overflow: 'hidden',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
  },
  groupLogo: {
    // flex: 0.17,
    resizeMode: 'contain',
    marginRight: wp('4'),
  },
  groupDesc: {
    flex: 1,
    marginLeft: wp('3'),
  },

  // groupLink: {
  //   flex: 0.1,
  // },
  TripHeadBorder: {
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.grayBorder,
    width: wp('92'),
    alignSelf: 'center',
    marginVertical: hp('1'),
  },
  groupName: {
    fontSize: hp('2.3'),
    color: Colors.black,
    fontWeight: '600',
  },
  groupMember: {
    fontSize: hp('1.8'),
    marginTop: hp('-.4'),
    color: Colors.gray,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  staticMapImg: {
    marginTop: hp('-10'),
    zIndex: -2,
    height: hp('37'),
  },
  btn: {
    marginHorizontal: wp('4'),
    marginBottom: hp('7'),
  },
  popupTitle: {
    fontSize: hp('1.8'),
    fontWeight: '600',
    marginTop: hp('10'),
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  tripBtn: {
    zIndex: 99,
    position: 'relative',
  },
  modalData: {
    height: hp('40'),
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 3,
    shadowRadius: 7.68,
    elevation: 20,
  },
  checkedMain: {
    height: hp('100'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripText: {
    fontWeight: '600',
    fontSize: hp('3'),
    color: Colors.primaryColor,
    marginTop: hp('3'),
  },
  tripModalData: {
    height: hp('50'),
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 3,
    shadowRadius: 7.68,
    elevation: 20,
    paddingTop: hp('4'),
  },
  modalInput: {
    paddingHorizontal: wp('4'),
    marginTop: hp('4'),
  },
  mainInput: {
    paddingHorizontal: wp('4'),
  },
  input: {
    borderColor: Colors.grayBorder,
    border: 1,
    height: hp('6'),
    marginVertical: hp('2'),
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: wp('3'),
    flex: 1,
    marginHorizontal: wp('3'),
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLeftImg: {
    width: wp('10'),
    height: hp('5'),
    resizeMode: 'contain',
  },
  inputRightImg: {
    width: wp('8'),
    height: hp('4'),
    resizeMode: 'contain',
  },
  dotbar: {
    width: wp('10'),
    height: hp('5'),
    resizeMode: 'contain',
    marginVertical: hp('-2.5'),
  },
  locationBtn: {
    marginTop: hp('3'),
  },
  tripModalBtn: {
    marginTop: hp('2'),
  },
  // externalLinks: {
  //   shadowColor: '#000000',
  //   shadowOffset: {
  //     width: 2,
  //     height: 10,
  //   },
  //   shadowOpacity: 3,
  //   shadowRadius: 7.68,
  //   elevation: 20,
  // },
  editIcon: {
    width: wp('6'),
    height: hp('3'),
    resizeMode: 'contain',
  },
  editInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.grayBorder,
    border: 1,
    height: hp('6'),
    marginVertical: hp('3.5'),
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: wp('3'),
  },
  eInput: {
    height: hp('6'),
    paddingHorizontal: wp('3'),
  },
  profileEditImg: {
    alignSelf: 'center',
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
  },
  userProfileImg: {
    backgroundColor: Colors.white,
    position: 'relative',
  },
  addImageIcon: {
    alignSelf: 'center',
    position: 'absolute',
    left: wp('50%'),
    bottom: hp('5'),
    zIndex: 999,
    width: wp('12'),
    height: hp('6'),
    resizeMode: 'contain',
  },
});
