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
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import PhoneInput from 'react-native-phone-number-input';
import {hp, wp} from '../../Config/responsive';

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
    signUpButton,
    error,
    number,
    setNumber,
  } = useRegister(navigation);
  return (
    <KeyBoardWrapper
      showsVerticalScrollIndicator={false}
      styles={styles.logInMain}>
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
          defaultValue: __DEV__ ? 'userHund' : '',
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
          defaultValue: __DEV__ ? 'user100@gmail.com' : '',
        }}
      />
      <PhoneInput
        defaultCode="US"
        layout="first"
        onChangeText={text => {
          console.log('onChangeText', text);
        }}
        onChangeFormattedText={text => {
          setNumber(text);
          console.log('onChangeFormattedText', text);
        }}
        onChangeCountry={test => {
          console.log('onChangeCountry', test);
        }}
        value={number}
        autoFocus={false}
        containerStyle={styles.numberViewStyle}
        textInputProps={{
          placeholderTextColor: 'gray',
          padding: 0,
        }}
        textInputStyle={{
          textAlignVertical: 'center',
          verticalAlign: 'middle',
        }}
        textContainerStyle={{backgroundColor: 'transparent'}}
      />
      {error != null && (
        <TextComponent
          text={error ?? 'sdfsddf'}
          styles={{
            color: 'red',
            fontSize: hp('1.5'),
            marginTop: hp('1'),
            marginLeft: wp('1'),
          }}
        />
      )}
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
          defaultValue: __DEV__ ? 'Test@123' : '',
        }}
      />
      <InputComponent
        {...{
          name: 'confirm_password',
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
          defaultValue: __DEV__ ? 'Test@123' : '',
        }}
      />
      <ThemeButton
        title={'Sign up'}
        onPress={handleSubmit(signUpButton)}
        btnStyle={styles.buttonStyle}
      />
      <View style={styles.signUpTextMain}>
        <TextComponent text={'Already have an account?  '} />
        <Touchable onPress={loginNav}>
          <GradientText style={styles.signUpText} GradientAlignment={0.8}>
            Log In
          </GradientText>
        </Touchable>
      </View>
    </KeyBoardWrapper>
  );
};
export default memo(RegisterScreen);
