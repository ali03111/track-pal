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
import {email, lock, userIcon, phone, arrowBack} from '../../Assets';
import {InputComponent} from '../../Components/InputComponent';
import {Controller} from 'react-hook-form';
import {Touchable} from '../../Components/Touchable';
import useResetPassword from './useResetPassword';
import CustomHeader from '../../Components/Header';

const ResetPasswordScreen = ({navigation}) => {
  const {handleSubmit, errors, reset, control, getValues, goBack} =
    useResetPassword(navigation);
  return (
    <View style={styles.logInMain}>
      <CustomHeader
        arrowBackIcon={arrowBack}
        backText={'Back'}
        headerTitle={'Change Password'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
      />
      <InputComponent
        {...{
          name: 'password',
          handleSubmit,
          errors,
          reset,
          control,
          getValues,
          placeholder: 'Old Password',
          defaultValue: '',
          isSecure: true,
          inputIconStyle: styles.lockstyle,
        }}
      />
      <InputComponent
        {...{
          name: 'new_password',
          handleSubmit,
          errors,
          reset,
          control,
          getValues,
          placeholder: 'New Password',
          defaultValue: '',
          isSecure: true,
          inputIconStyle: styles.lockstyle,
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
          placeholder: 'Re - Enter New Password',
          defaultValue: '',
          isSecure: true,
          inputIconStyle: styles.lockstyle,
        }}
      />
      <ThemeButton title={'Save'} btnStyle={styles.buttonStyle} />
    </View>
  );
};
export default memo(ResetPasswordScreen);
