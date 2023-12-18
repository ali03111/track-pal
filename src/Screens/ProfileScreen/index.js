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
  profileDelete,
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
import {aboutUrl, imageUrl, privacyUrl, termsUrl} from '../../Utils/Urls';
import BlurImage from '../../Components/BlurImage';
import InAppBrowser from '../../Components/InAppBrowser';

const ProfileScreen = ({navigation}) => {
  const {dynamicNav, alert, onCancel, onConfirm, userData, deleteAccount} =
    useProfileScreen(navigation);
  return (
    <ScrollView
      style={styles.profileMain}
      contentContainerStyle={{paddingBottom: hp('5')}}
      showsVerticalScrollIndicator={false}>
      <CustomHeader headerTitle={'Settings'} />
      <View style={styles.profileArea}>
        {/* <CircleImage
          uri={true}
          image={imageUrl(userData?.profile_image)}
          styles={styles.profileImg}
        /> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BlurImage
            blurhash={'LKK1wP_3yYIU4.jsWrt7_NRjMdt7'}
            radius={75}
            isURI={true}
            styles={styles.ProfileImage}
            uri={imageUrl(userData?.profile_image)}
          />
        </View>
        <GradientText style={styles.userName} GradientAlignment={1}>
          {userData?.name}
        </GradientText>
      </View>
      <ProfileBtn
        onPress={() => dynamicNav('EditProfileScreen')}
        title={'Edit Profile'}
        icon={userProfileIcon}
      />
      <ProfileBtn
        onPress={() => InAppBrowser.open(aboutUrl)}
        title={'About TrackPal'}
        icon={aboutTrackpal}
      />
      <ProfileBtn
        onPress={() => InAppBrowser.open(privacyUrl)}
        title={'Privacy Policy'}
        icon={privacyPolicy}
      />
      <ProfileBtn
        onPress={() => InAppBrowser.open(termsUrl)}
        title={'Terms and Conditions'}
        icon={TermsCondition}
      />
      <ProfileBtn
        title={'Delete Account'}
        icon={profileDelete}
        onPress={deleteAccount}
      />
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
