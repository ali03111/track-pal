import React, {memo, useRef} from 'react';
import {Keyboard, View} from 'react-native';
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
import {Touchable} from '../../Components/Touchable';
import {AlertDesign} from '../../Components/AlertDesign';
import {Colors} from '../../Theme/Variables';

const EditPhoneNumberScreen = ({navigation}) => {
  const {
    goBack,
    number,
    sendVerficationCode,
    updateState,
    edit,
    phoneNumber,
    skipVerification,
    alert,
  } = useEditPhoneNumber(navigation);
  const phoneInput = useRef(null);
  return (
    <View style={styles.logInMain}>
      <CustomHeader
        arrowBackIcon={arrowBack}
        backText={'Back'}
        headerTitle={'Number Confirmation'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
        goBack={skipVerification}
      />
      <GradientText style={styles.heading} GradientAlignment={0.6}>
        {edit ? 'Edit Your' : 'Confirm Your'} Number
      </GradientText>
      <TextComponent
        text={`Please ${edit ? 'enter' : 'confirm'} your number to verify you.`}
        styles={styles.createAcc}
      />
      {!edit && (
        <View style={styles.numberView}>
          <TextComponent
            text={phoneNumber}
            styles={{fontSize: hp('2'), fontWeight: 'bold'}}
          />
          <TextComponent
            text={'Edit'}
            styles={{fontSize: hp('2'), color: 'gray'}}
            onPress={() => updateState({edit: true})}
          />
        </View>
      )}
      {edit && (
        <PhoneInput
          ref={phoneInput}
          defaultValue={number}
          defaultCode="US"
          layout="first"
          onChangeText={text => {
            // updateState({number: text});
          }}
          onChangeFormattedText={text => {
            updateState({number: text});
          }}
          onChangeCountry={test => {
            console.log('onChangeCountry', test);
          }}
          value={number}
          autoFocus={false}
          containerStyle={styles.inputView}
          textInputStyle={{
            textAlignVertical: 'center',
            verticalAlign: 'middle',
          }}
          textInputProps={{
            placeholderTextColor: 'gray',
            // onBlur: Keyboard.dismiss(),
            // onPointerCancel: Keyboard.dismiss(),
            keyboardType: 'number-pad',
            // onPressOut: Keyboard.dismiss(),
            blurOnSubmit: true,
            padding: 0,
          }}
          textContainerStyle={{backgroundColor: 'transparent'}}
        />
      )}
      <View
        style={{
          // flexDirection: 'row',
          width: wp('90'),
          justifyContent: 'space-between',
          bottom: hp('5'),
          position: 'absolute',
          left: wp('5'),
          height: hp('12'),
        }}>
        <ThemeButton
          // onPress={goBack}
          onPress={sendVerficationCode}
          title={'Send'}
        />
        {edit && (
          <Touchable onPress={skipVerification}>
            <GradientText style={styles.bottomText} GradientAlignment={0.6}>
              Skip Verification
            </GradientText>
          </Touchable>
        )}
      </View>
      <AlertDesign
        isVisible={alert}
        cancelText={'Skip'}
        confirmText={'Verify'}
        message={
          "If you want to skip this step, you won't be able to create any trip and other members won't be able to invite you to their trips."
        }
        title={'Warning Alert'}
        onCancel={() => {
          goBack();
          skipVerification();
        }}
        onConfirm={skipVerification}
        msgStyle={{textAlign: 'center', lineHeight: hp('2.5')}}
        confirmButtonColor={Colors.primaryColor}
      />
    </View>
  );
};

export default memo(EditPhoneNumberScreen);
