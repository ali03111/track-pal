import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  tabsMain: {
    paddingHorizontal: wp('3.5'),
    flex: 1,
    marginTop: hp('2'),
    marginBottom: hp('3'),
  },
  mainTabStyle: {
    flexDirection: 'row',
    height: hp('6'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    borderWidth: 1,
    borderColor: '#606060',
    marginTop: Platform.OS == 'ios' ? hp('3') : 0,
    marginBottom: hp('1'),
  },
  headerStyle: {
    paddingHorizontal: wp('0'),
    paddingBottom: Platform.OS == 'ios' ? hp('-2') : hp('2'),
    marginTop: Platform.OS == 'ios' ? hp('4') : hp('0'),
  },
  hdTitle: {
    fontWeight: '600',
  },
  Gradientbtn: {
    width: wp('44'),
    textAlign: 'center',
    height: hp('5'),
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    color: Colors.white,
    fontWeight: '600',
    alignSelf: 'center',
  },
  TabStyle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('1'),
  },
});
