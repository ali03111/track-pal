import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {TextComponent} from './TextComponent';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';
import {CircleImage} from './CircleImage';
import {Touchable} from './Touchable';
import ThemeButton from './ThemeButton';
import TransparentBtn from './TransparentBtn';
import {checked, uncheck} from '../Assets';
import GradientText from './GradientText';

const InvitationComp = ({
  image,
  name,
  description,
  time,
  groupName,
  messages,
  status,
  onPress,
}) => {
  return (
    <View style={styles.invitationStyle}>
      <Touchable style={styles.notificationMian} onPress={onPress}>
        <View style={styles.mainBannerImg}>
          <CircleImage image={image} />
          {/* <CircleImageComp styles={styles.bannerImg}  image={image} /> */}
        </View>
        <View style={styles.nameDescriptionMain}>
          <View style={styles.namestyle}>
            <TextComponent text={name} styles={styles.username} />
            <TextComponent text={time} styles={styles.timing} />
          </View>
          <View style={styles.descmain}>
            <TextComponent text={description} styles={styles.description} />
            <TextComponent text={' '} />
            <TextComponent text={groupName} styles={styles.groupName} />
          </View>
        </View>
      </Touchable>
      {status == 'pending' && (
        <View style={styles.invitationBtn}>
          <TransparentBtn
            title={'Decline'}
            btnStyle={styles.whiteBtn}
            textStyle={styles.whiteBtnText}
          />
          <ThemeButton
            title={'Accept'}
            btnStyle={styles.acceptBtn}
            textStyle={styles.btnText}
          />
        </View>
      )}
      {status == 'accepted' && (
        <View style={styles.status}>
          <Image source={checked} style={styles.statusImg} />
          <GradientText style={styles.acceptText} GradientAlignment={0.7}>
            Invitation Accepted
          </GradientText>
        </View>
      )}

      {status == 'rejected' && (
        <View style={styles.status}>
          <Image source={uncheck} style={styles.statusImg} />
          <TextComponent
            text={'Invitation Rejected.'}
            styles={styles.statusRejectText}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBannerImg: {
    flex: 0.2,
  },
  nameDescriptionMain: {
    flex: 1,
    marginLeft: hp('1'),
  },
  invitationStyle: {
    borderBottomWidth: 1,
    borderColor: Colors.grayBorder,
    marginBottom: hp('1'),
  },
  notificationMian: {
    flexDirection: 'row',
    paddingVertical: hp('2'),
    alignItems: 'center',
  },
  bannerImg: {
    borderRadius: 50,
    width: wp('15'),
    height: hp('7.5'),
  },
  namestyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  username: {
    fontWeight: 'bold',
    fontSize: hp('2'),
    flex: 1,
  },
  description: {
    fontSize: Platform.OS == 'ios' ? hp('1.5') : hp('1.8'),
    color: Colors.gray,
  },

  timing: {
    flex: 1,
    fontSize: hp('1.7'),
    textAlign: 'right',
    color: 'rgba(41, 45, 50, 0.5)',
  },
  groupName: {
    fontSize: Platform.OS == 'ios' ? hp('1.5') : hp('1.8'),
    color: Colors.black,
    fontWeight: '500',
  },
  descmain: {
    flexDirection: 'row',
    width: wp('77'),
    flexWrap: 'wrap',
  },
  invitationBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1'),
  },
  acceptBtn: {
    width: wp('44'),
    borderRadius: 13,
    marginBottom: hp('2.5'),
    height: hp('5'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: '400',
    marginLeft: wp('0'),
  },
  whiteBtn: {
    marginTop: hp('2'),
  },
  whiteBtnText: {
    marginLeft: wp('0'),
  },
  acceptText: {
    fontSize: hp('2'),
    fontWeight: '500',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusImg: {
    resizeMode: 'contain',
    width: wp('6'),
    marginRight: wp('2'),
  },
  statusRejectText: {
    fontSize: hp('2.1'),
    fontWeight: '500',
  },
});

export default InvitationComp;
