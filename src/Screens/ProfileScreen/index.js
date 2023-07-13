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
import {AlertDesign} from '../../Components/AlertDesign';
import {hp} from '../../Config/responsive';
import {imageUrl} from '../../Utils/Urls';

const ProfileScreen = ({navigation}) => {
  const {dynamicNav, alert, onCancel, onConfirm, userData} =
    useProfileScreen(navigation);
  return (
    <ScrollView
      style={styles.profileMain}
      contentContainerStyle={{paddingBottom: hp('5')}}
      showsVerticalScrollIndicator={false}>
      <CustomHeader headerTitle={'Settings'} />
      <View style={styles.profileArea}>
        <CircleImage
          uri={true}
          image={imageUrl(userData?.profile_image)}
          styles={styles.profileImg}
        />
        <GradientText style={styles.userName} GradientAlignment={1}>
          Jhon Doe
        </GradientText>
      </View>
      <ProfileBtn
        onPress={() => dynamicNav('EditProfileScreen')}
        title={'Edit Profile'}
        icon={userProfileIcon}
      />
      <ProfileBtn title={'About TrackPal'} icon={aboutTrackpal} />
      <ProfileBtn title={'Privacy Policy'} icon={privacyPolicy} />
      <ProfileBtn title={'Terms and Conditions'} icon={TermsCondition} />
      <ProfileBtn
        onPress={() => dynamicNav('ResetPasswordScreen')}
        title={'Reset Password'}
        icon={lock}
      />
      <ProfileBtn onPress={onCancel} title={'Log Out'} icon={logout} />
      <AlertDesign
        isVisible={alert}
        onCancel={onCancel}
        onConfirm={onConfirm}
        title={'Log Out?'}
        message={'Are you sure, you want to log out ?'}
        confirmText={'Log Out'}
      />
    </ScrollView>
  );
};
export default memo(ProfileScreen);
