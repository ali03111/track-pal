import React, {memo, useRef} from 'react';
import {View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import useForgotPassword from '../ForgotPasswordScreen/useForgotPasswordScreen';
import CustomHeader from '../../Components/Header';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';
import {InputComponent} from '../../Components/InputComponent';
import ThemeButton from '../../Components/ThemeButton';
import {styles} from './styles';
import {arrowBack, email} from '../../Assets';
import {hp, wp} from '../../Config/responsive';
import useEditPhoneNumber from './useEditPhoneNumberScreen';

const EditPhoneNumberScreen = ({navigation}) => {
  const {goBack, number, sendVerficationCode, updateState} =
    useEditPhoneNumber(navigation);
  const phoneInput = useRef(null);
  return (
    <View style={styles.logInMain}>
      <CustomHeader
        arrowBackIcon={arrowBack}
        backText={'Back'}
        headerTitle={'Number Verfication'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
        goBack={goBack}
      />
      <GradientText style={styles.heading} GradientAlignment={0.6}>
        Number Verfication
      </GradientText>
      <TextComponent
        text={'Please confirm your number to verify you.'}
        styles={styles.createAcc}
      />
      <PhoneInput
        ref={phoneInput}
        defaultValue={number}
        // defaultCode="PK"
        layout="first"
        onChangeText={text => {
          updateState({number: text});
        }}
        onChangeFormattedText={text => {
          updateState({countryCode: text});
        }}
        onChangeCountry={test => {
          console.log('onChangeCountry', test);
        }}
        // value={number}
        autoFocus={false}
        containerStyle={{
          backgroundColor: 'transparent',
          marginTop: hp('6'),
          alignSelf: 'center',
          borderColor: 'black',
          borderWidth: 0.5,
          borderRadius: 10,
          overflow: 'hidden',
        }}
        textInputProps={{
          placeholderTextColor: 'gray',
        }}
        textContainerStyle={{backgroundColor: 'transparent'}}
        // textInputStyle={{backgroundColor: 'blue'}}
        // codeTextStyle={{backgroundColor: 'green'}}
        // flagButtonStyle={{backgroundColor: 'pink'}}
      />
      <View
        style={{
          flexDirection: 'row',
          width: wp('90'),
          justifyContent: 'space-between',
          bottom: hp('10'),
          position: 'absolute',
          left: wp('5'),
        }}>
        <ThemeButton
          onPress={goBack}
          //   onPress={handleSubmit(forgotPassword)}
          title={'Skip'}
          btnStyle={styles.buttonStyle}
        />
        <ThemeButton
          onPress={sendVerficationCode}
          //   onPress={handleSubmit(forgotPassword)}
          title={'Send'}
          btnStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

export default memo(EditPhoneNumberScreen);
