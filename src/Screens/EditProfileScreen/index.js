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
  whiteArrowBack,
} from '../../Assets';
import {InputComponent} from '../../Components/InputComponent';
import useResetPassword from './useEditProfile';
import CustomHeader from '../../Components/Header';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
import {CircleImage} from '../../Components/CircleImage';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';

const EditProfileScreen = ({navigation}) => {
  const {handleSubmit, errors, reset, control, getValues, goBack} =
    useResetPassword(navigation);
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
        <CircleImage image={profleImg} styles={styles.profileEditImg} />
        <Touchable Opacity={0.8}>
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
            defaultValue: 'Jhon Doe',
            textStyle: styles.inputStyle,
            viewStyle: styles.mainStyle,
          }}
        />
        <TextComponent text={'Change Password'} styles={styles.inputTitle} />
        <Touchable style={styles.passBtn}>
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
            defaultValue: 'jhondoe@gmail.com',
            textStyle: styles.inputStyle,
            viewStyle: styles.mainStyle,
          }}
        />
        <TextComponent text={'Phone Number'} styles={styles.inputTitle} />
        <InputComponent
          {...{
            name: 'number',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Phone Number',
            defaultValue: '+12 3456 789',
            textStyle: styles.inputStyle,
            viewStyle: styles.mainStyle,
          }}
        />
        <ThemeButton title={'Save'} btnStyle={styles.buttonStyle} />
      </View>
    </KeyBoardWrapper>
  );
};
export default memo(EditProfileScreen);
