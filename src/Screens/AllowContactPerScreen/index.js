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
  const {alertState, onConfirm, toggleAlert, viewState} =
    useAllowContactPerScreen(navigation);

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
          This app needs access to your contacts. This will allow you to share
          trips with your family, friends, and other contacts.
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
      <CustomHeader headerTitle={'Ask Permission'} />
      <View style={{flex: 1, alignItems: 'center', marginTop: hp('13')}}>
        {viewState == 0 ? <ViewA /> : <ViewB />}
      </View>
      <AlertDesign
        isVisible={alertState}
        title={'Enable Location'}
        cancelText={'Not Now'}
        confirmText={'Enable'}
        onCancel={toggleAlert}
        onConfirm={onConfirm}
      />
    </View>
  );
};

export default AllowContactPerScreen;
