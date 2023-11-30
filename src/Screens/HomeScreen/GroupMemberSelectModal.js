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
import {hp, wp} from '../../Config/responsive';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';
import {Colors} from '../../Theme/Variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {errorMessage} from '../../Config/NotificationMessage';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {imageUrl} from '../../Utils/Urls';
import {EmptyViewComp} from '../../Components/EmptyViewComp';

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
    getUser,
  } = extraData;
  const [text, setText] = useState('');
  const [filterData, setFilterData] = useState([]);
  const cloneUser = [...allUser];
  function searchFun(e) {
    var text = e;
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = cloneUser.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = (item.name || '').toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('newDatanewDatanewDatanewData', newData);
      setFilterData(newData);
      setText(text);
    } else {
      setFilterData(cloneUser);
      setText(text);
    }
  }
  // useCallback(() => {
  //   errorMessage(message);
  // }, [message]);

  // errorMessageHandler
  const renderItem = useCallback(
    ({item, index}) => {
      var color =
        index.toString().length === 1
          ? index
          : index.toString().split('').pop();
      return (
        <View style={styles.radioMain}>
          <Touchable
            style={styles.rememberInner}
            onPress={() => addMembersToGroup(item.id)}>
            <View style={styles.radio}>
              <View style={styles.groupMembers}>
                {item.profile_image ? (
                  <CircleImage
                    uri={true}
                    image={imageUrl(item?.profile_image)}
                    styles={styles.memberPic}
                  />
                ) : (
                  <FirstCharacterComponent
                    extraStyle={styles.firstLetterStyle}
                    indexNumber={color}
                    text={item?.name}
                  />
                )}

                <TextComponent text={item?.name} styles={styles.groupTitle} />
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
    },
    [filterData, cloneUser],
  );
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
              <Ionicons
                name="close-outline"
                size={hp('3.5')}
                style={styles.closeIcon}
                onPress={onBackPress}
                color={Colors.gray}
              />
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
              <View
                style={styles.modalScroll(keyboardStatus)}
                // scrollEnabled={false}
              >
                <FlatList
                  refreshing={false}
                  data={
                    // filterData
                    filterData.length >= 0 && text != ''
                      ? filterData
                      : cloneUser
                  }
                  renderItem={renderItem}
                  onRefresh={() => {
                    getUser();
                    setTimeout(() => {
                      getUser();
                    }, 2000);
                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingRight: wp('2'),
                    paddingLeft: wp('0'),
                  }}
                  ListEmptyComponent={
                    <EmptyViewComp
                      onRefresh={() => {
                        getUser();
                        setTimeout(() => {
                          getUser();
                        }, 2000);
                      }}
                      refreshStyle={styles.refresh}
                    />
                  }
                />
              </View>
              <ThemeButton
                title={'Next'}
                onPress={() => {
                  toggleNextModal();
                  setText('');
                }}
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
