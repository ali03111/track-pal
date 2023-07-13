import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Touchable,
  Platform,
} from 'react-native';
import {styles} from './styles';
import CustomHeader from '../../Components/Header';
import {SwipeListView} from 'react-native-swipe-list-view';
import {cardediticon, leftArrow, trash} from '../../Assets';
import {CircleImage} from '../../Components/CircleImage';
import {TextComponent} from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import {tripProfileColors, trips} from '../../Utils/localDB';
import InactiveBtn from '../../Components/InactiveBtn';
import TripCreatedModal from '../HomeScreen/TripCreatedModal';
import useEditTripScreen from './useEditTripScreen';
import {hp, wp} from '../../Config/responsive';
import {getSingleCharacter} from '../../Utils/globalFunctions';

const EditTripScreen = ({navigation, letterStyles}) => {
  const {updateState, isTripCreated, tripCardData} = useEditTripScreen();

  const renderItem = ({item}) => {
    const generateColor = () => {
      profileBgColor = tripProfileColors[Math.floor(Math.random() * 10)];
      return profileBgColor;
    };
    return (
      <View style={styles.activeCardMain(item?.status)}>
        <View style={styles.activeCardStyle}>
          <View style={styles.cardLeft}>
            {item?.image ? (
              <CircleImage image={item?.image} style={styles.groupLogo} />
            ) : (
              <View
                style={{
                  backgroundColor: generateColor(),
                  ...styles.letterStyle,
                }}>
                <Text style={styles.letterSt}>
                  {getSingleCharacter(item?.name)}
                </Text>
              </View>
            )}
            <View style={styles.groupDesc}>
              <TextComponent text={item?.name} styles={styles.groupName} />
              <TextComponent
                text={item?.total_members + ' members'}
                styles={styles.groupMember}
              />
              <TextComponent
                text={item?.status}
                styles={styles.groupActive(item?.status)}
              />
            </View>
          </View>
          {item?.status == 'Active' ? (
            <ThemeButton
              title={'Start Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={updateState}
            />
          ) : (
            <InactiveBtn title={'Start Trip'} />
          )}
        </View>
        <TouchableOpacity>
          <Image
            style={{
              height: Platform.OS == 'ios' ? hp('18.2') : hp('22.1'),
              width: wp('14'),
            }}
            resizeMode="contain"
            source={leftArrow}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Image source={trash} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Image source={cardediticon} />
      </TouchableOpacity>
    </View>
  );
  const onRowOpen = (rowKey, rowMap) => {
    setTimeout(() => {
      rowMap[rowKey]?.closeRow();
    }, 2000);
  };
  return (
    <View style={styles.tips}>
      <CustomHeader
        headerTitle={'Trips'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
      />

      <SwipeListView
        useFlatList={true}
        data={tripCardData}
        // disableRightSwipe={true}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={70}
        rightOpenValue={-70}
        previewRowKey={'0'}
        previewOpenValue={0}
        previewOpenDelay={3000}
        onRowOpen={onRowOpen}
        scrollEnabled
        refreshing={false}
        showsVerticalScrollIndicator={false}
      />

      <TripCreatedModal
        title={'Trip started'}
        isTripCreated={isTripCreated}
        TripCreatedToggle={() => {
          updateState();
          navigation.navigate('MapAndChatScreen');
        }}
      />
    </View>
  );
};
export default memo(EditTripScreen);
