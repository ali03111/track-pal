import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  staticMapImg: {
    flex: 1,
  },
  groupInfoMain: {
    marginTop: hp('0'),
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    marginHorizontal: wp('4'),
    paddingVertical: hp('1.5'),
    position: 'absolute',
    bottom: hp('8'),
    width: wp('85'),
    height: hp('10'),
    borderRadius: 10,
    overflow: 'hidden',
    border: 1,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: wp('100'),
    height: hp('100'),
    // opacity: 0.67,
  },
  groupLogo: {
    // flex: 0.17,
    resizeMode: 'contain',
    // left: wp('10'),
    marginRight: wp('2'),
  },
  groupDesc: {
    flex: 1,
    marginLeft: wp('3'),
  },
  groupDesc: {
    flex: 1,
    marginLeft: wp('3'),
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
  externalLinks: {
    width: wp('10'),
    height: hp('10'),
    resizeMode: 'contain',
  },
  kiloMeterText: {
    position: 'absolute',
    left: wp('2'),
    top: hp('1'),
    padding: 5,
    backgroundColor: Colors.gray,
    color: Colors.white,
    borderRadius: 10,
    paddingHorizontal: wp('3'),
  },
  firstCharStyle: {
    zIndex: 999,
    position: 'relative',
    poition: 'absolute',
    bottom: hp('-4.7'),
    width: Dimensions.get('window').width * 0.08,
    height: Dimensions.get('window').width * 0.08,
    left: wp('4.7'),
    backgroundColor: Colors.white,
  },
  firstTextStyle: {
    fontSize: hp('1.9'),
    color: Colors.primaryColor,
  },
  pImage: {
    zIndex: 999,
    position: 'relative',
    poition: 'absolute',
    bottom: hp('-4.7'),
    width: Dimensions.get('window').width * 0.08,
    height: Dimensions.get('window').width * 0.08,
    left: wp('4.7'),
  },
});
