import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import {globalHeading} from '../../Config/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import GradientText from '../../Components/GradientText';
import ThemeButton from '../../Components/ThemeButton';
import ButtonWithIcon from '../../Components/ButtonWithIcon';
import {
  apple,
  email,
  facebook,
  google,
  lock,
  rememberImg,
  rememberEmpty,
} from '../../Assets';
import {InputComponent} from '../../Components/InputComponent';
import {Controller} from 'react-hook-form';
import useLogin from './useLoginScreen';
import {Touchable} from '../../Components/Touchable';

const LoginScreen = ({navigation}) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    setRemember,
    rememberValue,
    remember,
    onPress,
    loginUser,
    socialLogin,
  } = useLogin(navigation);
  return (
    <View style={styles.logInMain}>
      <GradientText style={styles.heading} GradientAlignment={0.6}>
        Log In To Your Account
      </GradientText>

      <TextComponent
        text={'Please enter info to Log In account'}
        styles={styles.createAcc}
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
      <View style={styles.rememberSec}>
        <Touchable style={styles.rememberInner} onPress={rememberValue}>
          <Image
            source={remember ? rememberImg : rememberEmpty}
            style={styles.tickIcon}
          />
          <Text style={styles.tickText}>Remember me</Text>
        </Touchable>
        <TextComponent text={'Forgot Password'} styles={styles.forgetText} />
      </View>
      <ThemeButton onPress={loginUser} title={'Log In'} />
      <View style={styles.logInWith}>
        <Text style={styles.logInBorder}></Text>
        <Text style={styles.logInText}>or Log In With</Text>
        <Text style={styles.logInBorder}></Text>
      </View>
      <ButtonWithIcon
        title={'Continue with Google'}
        style={styles.googleBtn}
        textStyle={styles.googleBtnText}
        image={google}
        onPress={socialLogin}
      />
      <ButtonWithIcon
        title={'Continue with Apple'}
        style={styles.appleBtn}
        textStyle={styles.appleBtnText}
        image={apple}
      />
      <ButtonWithIcon
        title={'Continue with Facebook'}
        style={styles.facebookBtn}
        textStyle={styles.facebookBtnText}
        image={facebook}
      />
      <View style={styles.signUpTextMain}>
        <TextComponent text={'Don’t have an account? '} />
        <Touchable onPress={onPress}>
          <GradientText style={styles.signUpText} GradientAlignment={0.8}>
            Sign Up
          </GradientText>
        </Touchable>
      </View>
    </View>
  );
};
export default memo(LoginScreen);
