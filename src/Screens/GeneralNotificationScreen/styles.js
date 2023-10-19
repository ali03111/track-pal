import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  tabStyle: {},
  bg: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refStyle: {
    marginTop: hp('3'),
  },
  headerStyle: {
    paddingHorizontal: wp('3.5'),
    marginBottom: hp('0'),
  },
  hdTitle: {
    fontWeight: '600',
    color: Colors.black,
  },
  back: {
    color: Colors.black,
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
    marginRight: wp('0'),
  },
  loaderName: {
    width: wp('40'),
    height: hp('2'),
    marginTop: hp('1'),
  },
  loaderDes: {
    width: wp('50'),
    height: hp('1'),
    marginTop: hp('2'),
  },
  // loaderBtn: {
  //   width: wp('30'),
  //   height: hp('4'),
  //   marginTop: hp('4'),
  //   marginLeft: wp('1'),
  // },
  loaderBar: {
    width: wp('20'),
    height: hp('2'),
    borderRadius: 5,
    marginTop: hp('1'),
  },
});
