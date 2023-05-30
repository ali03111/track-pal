import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';
import {Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  profileMain: {
    paddingHorizontal: wp('3.5'),
    flex: 1,
  },
  profileImg: {
    alignSelf: 'center',
    marginTop: hp('2'),
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
  },
  profileArea: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(45, 45, 45, 0.1)',
    marginBottom: hp('2.5'),
  },
  userName: {
    textAlign: 'center',
    marginTop: hp('2'),
    fontSize: hp('3'),
    color: Colors.primaryColor,
    fontWeight: '600',
    marginBottom: hp('.5'),
  },
});
