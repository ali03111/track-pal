import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  FlatList,
  Text,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  DemoProfileImage1,
  editIcon,
  addProfileImage,
  bgBlur,
  rememberImg,
  rememberEmpty,
} from '../../Assets';
import {styles} from './styles';

import useHomeScreen from './useHomeScreen';
import {BlurView} from '@react-native-community/blur';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
import {RadioButton} from 'react-native-paper';
import {frequentTrips} from '../../Utils/localDB';
import {wp} from '../../Config/responsive';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';
import {Colors} from '../../Theme/Variables';
import {errorMessage} from '../../Config/NotificationMessage';

const GroupMemberSelectModal = ({
  isGroupMemberSelectModal,
  toggleNextModal,
  onBackPress,
  extraData,
}) => {
  const {
    keyboardStatus,
    allUser,
    addMembersToGroup,
    groupMembers,
    message,
    ErrorMessageHandler,
  } = extraData;
  const [text, setText] = useState('');
  const [filterData, setFilterData] = useState([]);
  function searchFun(e) {
    var text = e;
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = allUser.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setText(text);
    } else {
      setFilterData(allUser);
      setText(text);
    }
  }
  // useCallback(() => {
  //   errorMessage(message);
  // }, [message]);

  // errorMessageHandler
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.radioMain}>
        <Touchable
          style={styles.rememberInner}
          onPress={() => addMembersToGroup(item.id)}>
          <View style={styles.radio}>
            <View style={styles.groupMembers}>
              <CircleImage
                image={frequentTrips[0].image}
                styles={styles.memberPic}
              />
              <TextComponent text={item?.email} styles={styles.groupTitle} />
              <Image
                source={
                  groupMembers.includes(item.id) ? rememberImg : rememberEmpty
                }
                style={styles.tickIcon}
              />
            </View>
          </View>
        </Touchable>
      </View>
    );
  });
  return (
    <View
      key={isGroupMemberSelectModal}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        isVisible={isGroupMemberSelectModal}
        // hasBackdrop={false}
        animationInTiming={100}
        animationOutTiming={100}
        avoidKeyboard
        animationType="fade"
        hideModalContentWhileAnimating
        useNativeDriver
        onBackButtonPress={onBackPress}
        style={styles.bottomModal}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Image style={styles.absolute} source={bgBlur} />
          <View style={styles.modalData(true)}>
            <View style={styles.SelectTripModal}>
              <GradientText GradientAlignment={0.8} style={styles.selectTrip}>
                {'Select Group Members'}
              </GradientText>
              <View style={styles.searchMain}>
                <TextInput
                  style={styles.searchinput}
                  onChangeText={e => searchFun(e)}
                  value={text}
                  placeholder={'Search Members'}
                  placeholderTextColor={Colors.gray}
                />
              </View>
              <ScrollView
                style={styles.modalScroll(keyboardStatus)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <FlatList
                  refreshing={false}
                  data={
                    // filterData
                    filterData.length >= 0 && text != '' ? filterData : allUser
                  }
                  renderItem={renderItem}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  contentContainerStyle={{
                    paddingRight: wp('2'),
                    paddingLeft: wp('0'),
                  }}
                />
              </ScrollView>
              <ThemeButton
                title={'Next'}
                onPress={toggleNextModal}
                btnStyle={styles.groupBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(GroupMemberSelectModal);
