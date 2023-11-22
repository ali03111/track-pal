import React, {memo} from 'react';
import {View, Text} from 'react-native';
import CustomHeader from '../../Components/Header';
import {styles} from './styles';
import {arrowBack, email} from '../../Assets';
import useForgotPassword from './useForgotPasswordScreen';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';
import {InputComponent} from '../../Components/InputComponent';
import {hp} from '../../Config/responsive';
import ThemeButton from '../../Components/ThemeButton';

const ForgotPasswordScreen = ({navigation}) => {
  const {
    goBack,
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    forgotPassword,
  } = useForgotPassword(navigation);

  return (
    <View style={styles.logInMain}>
      <CustomHeader
        arrowBackIcon={arrowBack}
        backText={'Back'}
        headerTitle={'Forgot Password'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
        goBack={goBack}
      />
      <GradientText style={styles.heading} GradientAlignment={0.6}>
        Forgot Password
      </GradientText>
      <TextComponent
        text={
          "Provide your account's email for which you want to reset your password."
        }
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
          viewStyle: styles.inputStyle,
        }}
      />
      <ThemeButton
        onPress={handleSubmit(forgotPassword)}
        title={'Send'}
        btnStyle={styles.buttonStyle}
      />
    </View>
  );
};

export default memo(ForgotPasswordScreen);
