import React, {memo, useCallback, useState} from 'react';
import {View, Image, TextInput, FlatList, Alert} from 'react-native';
import {bgBlur, rememberImg, rememberEmpty} from '../../Assets';
import {styles} from './styles';
import ThemeButton from '../../Components/ThemeButton';
import Modal from 'react-native-modal';
import {CircleImage} from '../../Components/CircleImage';
import {Touchable} from '../../Components/Touchable';
import {hp, wp} from '../../Config/responsive';
import GradientText from '../../Components/GradientText';
import {TextComponent} from '../../Components/TextComponent';
import {Colors} from '../../Theme/Variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {imageUrl} from '../../Utils/Urls';
import {EmptyViewComp} from '../../Components/EmptyViewComp';

const GroupMemberSelectModal = ({
  isGroupMemberSelectModal,
  toggleNextModal,
  onBackPress,
  extraData,
}) => {
  const {keyboardStatus, allUser, addMembersToGroup, groupMembers, getUser} =
    extraData;

  console.log('tripMemeberstripMemeberstripMemebers', groupMembers);

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
  const renderItem = useCallback(({item, index}) => {
    var color =
      index.toString().length === 1 ? index : index.toString().split('').pop();
    let disabled = Boolean(
      groupMembers.find(res => res.id == item.id)?.pivot
        ?.member_running_status == 1,
    );
    return (
      <View style={styles.radioMain}>
        <Touchable
          // disabled
          style={styles.rememberInner}
          onPress={() => {
            if (disabled) {
              Alert.alert(
                'User cannot be removed as the trip is currently running!',
              );
            } else {
              addMembersToGroup(item);
            }
          }}>
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
              {/* {disabled && (
                <TextComponent
                  text={'Cannot remove this user'}
                  styles={{color: 'red', fontSize: hp('1')}}
                />
              )} */}
              {console.log(
                'mdsbjkfbsdjkbfjksdbfkjbsdjfbsjdbf',
                groupMembers.find(res => res.id == item.id),
              )}
              <Image
                source={
                  Boolean(groupMembers.find(res => res.id == item.id))
                    ? rememberImg
                    : rememberEmpty
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
                    filterData.length >= 0 && text != '' ? filterData : allUser
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
              {groupMembers.length > 1 && (
                <ThemeButton
                  title={'Add'}
                  onPress={() => {
                    toggleNextModal();
                    onBackPress();
                    setText('');
                  }}
                  btnStyle={styles.groupBtn}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(GroupMemberSelectModal);
