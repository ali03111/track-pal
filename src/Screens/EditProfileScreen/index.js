import React, {memo} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {styles} from './styles';
import ThemeButton from '../../Components/ThemeButton';
import {
  addProfileImage,
  arrowBack,
  arrowRight,
  arrowRightIcon,
  editProfileBg,
  editProfileBgNew,
  profleImg,
  verify,
  whiteArrowBack,
} from '../../Assets';
import {InputComponent} from '../../Components/InputComponent';
import useResetPassword from './useEditProfile';
import CustomHeader from '../../Components/Header';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
import {CircleImage} from '../../Components/CircleImage';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import {imageUrl} from '../../Utils/Urls';
import BlurImage from '../../Components/BlurImage';
import {hp, wp} from '../../Config/responsive';

const EditProfileScreen = ({navigation}) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    navigateToReset,
    updateProfileFunction,
    uploadFromGalary,
    profileData,
    userData,
    navigateToEdit,
    isVerified,
  } = useResetPassword(navigation);
  return (
    <KeyBoardWrapper>
      <ImageBackground source={editProfileBgNew} resizeMode="cover">
        <CustomHeader
          arrowBackIcon={whiteArrowBack}
          backText={'Back'}
          headerTitle={'Edit Profile'}
          style={styles.headerStyle}
          titleStyle={styles.hdTitle}
          backTextStyle={styles.back}
          goBack={goBack}
        />
      </ImageBackground>
      <View style={styles.userProfileImg}>
        {/* <CircleImage
          uri={profileData ? false : true}
          image={profileData || imageUrl(userData?.profile_image)}
          styles={styles.profileEditImg}
        /> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -65,
          }}>
          <BlurImage
            blurhash={'LKK1wP_3yYIU4.jsWrt7_NRjMdt7'}
            radius={75}
            styles={styles.ProfileImage}
            isURI={true}
            uri={profileData?.uri || imageUrl(userData?.profile_image)}
          />
        </View>
        <Touchable
          onPress={uploadFromGalary}
          style={{
            position: 'absolute',
            left: wp('55%'),
            bottom: hp('0'),
          }}
          Opacity={0.8}>
          <Image source={addProfileImage} style={styles.addImageIcon} />
        </Touchable>
      </View>
      <View style={styles.logInMain}>
        <TextComponent text={'Full Name'} styles={styles.inputTitle} />
        <InputComponent
          {...{
            name: 'name',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Full Name',
            // defaultValue: 'Jhon Doe',
            defaultValue: userData?.name,

            textStyle: styles.inputStyle,
            viewStyle: styles.mainStyle,
          }}
        />
        <TextComponent text={'Change Password'} styles={styles.inputTitle} />
        <Touchable onPress={navigateToReset} style={styles.passBtn}>
          <Text style={styles.passText}>************</Text>
          <Image style={styles.passIcon} source={arrowRightIcon} />
        </Touchable>
        <TextComponent text={'Email'} styles={styles.inputTitle} />
        <InputComponent
          {...{
            name: 'email',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Email',
            // defaultValue: 'jhondoe@gmail.com',
            defaultValue: userData?.email,
            textStyle: styles.inputStyle,
            viewStyle: styles.mainStyle,
            editable: false,
          }}
        />
        <TextComponent text={'Phone Number'} styles={styles.inputTitle} />
        <Touchable onPress={navigateToEdit} style={styles.passBtn}>
          <Text
            style={{
              ...styles.passText,
              fontSize: hp('1.7'),
              fontWeight: 'bold',
            }}>
            {userData?.phone ?? 'Please enter your number'}
          </Text>
          {isVerified && <Image style={styles.passIcon} source={verify} />}
        </Touchable>
        {console.log('userData?.phone ', userData?.phone)}
        <ThemeButton
          onPress={handleSubmit(updateProfileFunction)}
          title={'Save'}
          btnStyle={styles.buttonStyle}
        />
      </View>
    </KeyBoardWrapper>
  );
};
export default memo(EditProfileScreen);
