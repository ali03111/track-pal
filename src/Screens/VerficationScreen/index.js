import React, {memo} from 'react';
import {View, Text} from 'react-native';
import CustomHeader from '../../Components/Header';
import {arrowBack} from '../../Assets';
import {goBack} from '../../Utils';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import useVerificationScreen from './useVerficationScreen';
import ThemeButton from '../../Components/ThemeButton';
import {hp, wp} from '../../Config/responsive';

const VerficationScreen = ({route, navigation}) => {
  const {
    props,
    getCellOnLayoutHandler,
    value,
    setValue,
    ref,
    CELL_COUNT,
    VerifyCode,
    goBack,
  } = useVerificationScreen(navigation, route);
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        arrowBackIcon={arrowBack}
        backText={'Back'}
        headerTitle={'Verification'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
        goBack={goBack}
      />
      <GradientText style={styles.heading} GradientAlignment={0.6}>
        Verification
      </GradientText>
      <TextComponent
        text={` Please enter verification code.`}
        styles={styles.createAcc}
      />
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />

      <View style={styles.verificationBtn}>
        <ThemeButton onPress={VerifyCode} title={'Verify'} />
      </View>
    </View>
  );
};

export default memo(VerficationScreen);
