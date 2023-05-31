import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  tabsMain: {
    paddingHorizontal: wp('3.5'),
    flex: 1,
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
  },
  headerStyle: {
    paddingHorizontal: wp('0'),
    paddingBottom: hp('2'),
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
  inActiveItem: {
    width: wp('42'),
    textAlign: 'center',
    height: hp('5'),
    justifyContent: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
