import React, {memo} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import {globalHeading} from '../../Config/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import GradientText from '../../Components/GradientText';
import ThemeButton from '../../Components/ThemeButton';
import ButtonWithIcon from '../../Components/ButtonWithIcon';
import {email, lock, userIcon, phone, arrowBack} from '../../Assets';
import {InputComponent} from '../../Components/InputComponent';
import {Controller} from 'react-hook-form';
import {Touchable} from '../../Components/Touchable';
import useRegister from './useRegisterScreen';

const RegisterScreen = ({navigation}) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    setRemember,
    rememberValue,
    remember,
    goBack,
    loginNav,
  } = useRegister(navigation);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.logInMain}>
      <Touchable style={styles.backMain} onPress={goBack}>
        <Image
          source={arrowBack}
          style={{
            resizeMode: 'contain',
            style: styles.arrowBack,
          }}
        />
        <TextComponent text={'Back'} styles={styles.backBtn} />
      </Touchable>
      <GradientText style={styles.heading} GradientAlignment={0.6}>
        Create Your Account
      </GradientText>

      <TextComponent
        text={'Please enter info to create account'}
        styles={styles.createAcc}
      />
      <InputComponent
        {...{
          name: 'name',
          handleSubmit,
          errors,
          reset,
          control,
          getValues,
          placeholder: 'Name',
          isImage: userIcon,
          defaultValue: '',
        }}
      />
      <InputComponent
        {...{
          name: 'email',
          handleSubmit,
          errors,
          reset,
          control,
          getValues,
          placeholder: 'Email',
          isImage: email,
          defaultValue: '',
        }}
      />
      <InputComponent
        {...{
          name: 'number',
          handleSubmit,
          errors,
          reset,
          control,
          getValues,
          placeholder: 'Contact Number',
          isImage: phone,
          defaultValue: '',
        }}
      />
      <InputComponent
        {...{
          name: 'password',
          handleSubmit,
          errors,
          reset,
          control,
          getValues,
          placeholder: 'Password',
          isImage: lock,
          defaultValue: '',
          isSecure: true,
          inputIconStyle: styles.lockstyle,
        }}
      />
      <InputComponent
        {...{
          name: 'confirm password',
          handleSubmit,
          errors,
          reset,
          control,
          getValues,
          placeholder: 'Password',
          isImage: lock,
          defaultValue: '',
          isSecure: true,
          inputIconStyle: styles.lockstyle,
        }}
      />
      <ThemeButton title={'Sign up'} btnStyle={styles.buttonStyle} />
      <View style={styles.signUpTextMain}>
        <TextComponent text={'Already have an account?  '} />
        <Touchable onPress={loginNav}>
          <GradientText style={styles.signUpText} GradientAlignment={0.8}>
            Log In
          </GradientText>
        </Touchable>
      </View>
    </ScrollView>
  );
};
export default memo(RegisterScreen);
