import {View, Text, Image} from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/Header';
import {dataBaseIMG} from '../../Assets';
import GradientText from '../../Components/GradientText';
import ThemeButton from '../../Components/ThemeButton';
import {hp, wp} from '../../Config/responsive';
import {AlertDesign} from '../../Components/AlertDesign';
import useAllowContactPerScreen from './useAllowContactPerScreen';
import {TextComponent} from '../../Components/TextComponent';

const AllowContactPerScreen = ({navigation}) => {
  const {
    alertState,
    onConfirm,
    toggleAlert,
    viewState,
    onConfirmUpload,
    toggleUpload,
    uploadState,
  } = useAllowContactPerScreen(navigation);
  // Track Pal can sync your contacts to show friends who are already using the app
  const ViewA = () => {
    return (
      <>
        <Image
          source={dataBaseIMG}
          resizeMode="contain"
          style={{width: wp('50'), height: hp('25')}}
        />
        <GradientText
          GradientAlignment={0.6}
          style={{
            marginVertical: hp('3'),
            width: wp('90'),
            textAlign: 'center',
            fontSize: hp('2'),
          }}>
          Track Pal can sync your contacts to display friends who are already
          using the app. Granting access to your contacts will enable you to
          share trips with your family, friends, and other connections.
        </GradientText>
        <ThemeButton
          textStyle={{
            textAlign: 'center',
          }}
          btnStyle={{
            width: wp('70'),
          }}
          onPress={toggleAlert}
          title={'Next'}
        />
      </>
    );
  };
  const ViewB = () => {
    return (
      <>
        <Image
          source={dataBaseIMG}
          resizeMode="contain"
          style={{width: wp('50'), height: hp('25')}}
        />
        <TextComponent
          text={'One moment, please'}
          styles={{marginVertical: hp('1'), fontWeight: 'bold'}}
        />
        <TextComponent
          text={'We’re syncing your contacts for use.'}
          styles={{marginVertical: hp('1'), fontWeight: 'bold'}}
        />
      </>
    );
  };

  return (
    <View style={{flexGrow: 1}}>
      <CustomHeader headerTitle={'Ask Permission'} isBack />
      <View style={{flex: 1, alignItems: 'center', marginTop: hp('13')}}>
        {viewState == 0 ? <ViewA /> : <ViewB />}
      </View>
      <AlertDesign
        isVisible={alertState}
        title={'Track Pal needs access to your contacts'}
        message={
          'We use your contact list to help you find and connect with friends who already use Track Pal. Your contact information may be uploaded securely to our servers for this purpose.\nThis data is never shared with third parties and you can manage or disable contact access anytime in Settings'
        }
        cancelText={'Don’t Allow '}
        confirmText={'Allow Access'}
        onCancel={toggleAlert}
        onConfirm={onConfirm}
        // msgStyle={{textAlign: 'center'}}
      />
      <AlertDesign
        isVisible={uploadState}
        title={'Sync Your Contacts?'}
        message={
          "Track Pal can upload your contact list to help you find friends who are already using the app. This data is stored securely and never shared with anyone.\nYou can skip this and still use the app but won't be able to create trips. You can also turn contact syncing on or off anytime from Settings."
        }
        cancelText={'Maybe Later'}
        confirmText={'Sync Now'}
        onCancel={toggleUpload}
        onConfirm={onConfirmUpload}
        // msgStyle={{textAlign: 'center'}}
      />
    </View>
  );
};

export default AllowContactPerScreen;
