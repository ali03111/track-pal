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
import {FirstCharacterComponent} from './FirstCharacterComponent';
import {imageURL, imageUrl} from '../Utils/Urls';
import moment from 'moment';

const GeneralNotification = ({
  image,
  name,
  description,
  time,
  groupName,
  messages,
  onPress,
  index,
}) => {
  return (
    <Touchable style={styles.notificationMian} onPress={onPress}>
      <View style={styles.mainBannerImg}>
        {image ? (
          <CircleImage image={imageUrl(image)} uri={true} />
        ) : (
          <FirstCharacterComponent indexNumber={index} text={name} />
        )}
        {/* <CircleImageComp styles={styles.bannerImg}  image={image} /> */}
      </View>
      <View style={styles.nameDescriptionMain}>
        <View style={styles.namestyle}>
          <TextComponent
            text={name}
            styles={styles.username}
            numberOfLines={1}
          />
          <TextComponent
            text={moment(time).calendar()}
            styles={styles.timing}
          />
        </View>
        <View style={styles.descmain}>
          <TextComponent text={messages} styles={styles.description} />
          {/* <TextComponent text={' '} />
          <TextComponent text={groupName} styles={styles.groupName} /> */}
        </View>
      </View>
      <View style={styles.mainTime}></View>
      {/* <TextComponent text={item?.description} styles={styles.centerDes} /> */}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  mainBannerImg: {
    flex: 0.2,
  },
  nameDescriptionMain: {
    flex: 1,
    marginLeft: hp('1'),
    // width: wp('40'),
  },
  // mainTime: {
  //   flex: 1,
  // },
  notificationMian: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.grayBorder,
    paddingVertical: hp('2'),
    // paddingHorizontal: wp('3'),
    alignItems: 'center',
    marginBottom: hp('1'),
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
    flex: 1.2,
    fontSize: hp('1.3'),
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
});

export default GeneralNotification;
