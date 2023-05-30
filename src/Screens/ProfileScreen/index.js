import React, {memo} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import {
  TermsCondition,
  aboutTrackpal,
  lock,
  logout,
  privacyPolicy,
  profleImg,
  userProfileIcon,
} from '../../Assets';
import useProfileScreen from './useProfileScreen';
import CustomHeader from '../../Components/Header';
import GradientText from '../../Components/GradientText';
import ProfileBtn from '../../Components/ProfileBtn';
import {CircleImage} from '../../Components/CircleImage';

const ProfileScreen = ({navigation}) => {
  const {} = useProfileScreen(navigation);
  return (
    <ScrollView style={styles.profileMain} showsVerticalScrollIndicator={false}>
      <CustomHeader
        // arrowBackIcon={arrowBack}
        // backText={'Back'}
        headerTitle={'Settings'}
      />
      <View style={styles.profileArea}>
        <CircleImage image={profleImg} styles={styles.profileImg} />
        <GradientText style={styles.userName} GradientAlignment={1}>
          Jhon Doe
        </GradientText>
      </View>
      <ProfileBtn title={'Edit Profile'} icon={userProfileIcon} />
      <ProfileBtn title={'About TrackPal'} icon={aboutTrackpal} />
      <ProfileBtn title={'Privacy Policy'} icon={privacyPolicy} />
      <ProfileBtn title={'Terms and Conditions'} icon={TermsCondition} />
      <ProfileBtn title={'Reset Password'} icon={lock} />
      <ProfileBtn title={'Log Out'} icon={logout} />
    </ScrollView>
  );
};
export default memo(ProfileScreen);
