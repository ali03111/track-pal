import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Touchable,
  Platform,
  FlatList,
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
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {EmptyViewComp} from '../../Components/EmptyViewComp';

const GroupTrips = ({navigation, letterStyles}) => {
  const {
    updateState,
    isTripCreated,
    tripCardData,
    tripsCard,
    changeMemberStatus,
    invitedTrips,
    groupTrips,
  } = useEditTripScreen(navigation);

  const renderItem = ({item, index}) => {
    const status = {
      0: 'Pendding',
      1: 'Active',
      2: 'Inactive',
    };
    return (
      <View style={styles.activeCardMain(item?.status)}>
        <View style={styles.activeCardStyle}>
          <View style={styles.cardLeft}>
            {item?.image ? (
              <CircleImage image={item?.image} style={styles.groupLogo} />
            ) : (
              <FirstCharacterComponent text={item?.name} />
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
          {item?.owner_running_status == 0 ? (
            <InactiveBtn style={{width: wp('36')}} title={'Trip on Pending'} />
          ) : item?.pivot.member_running_status == 0 ? (
            <ThemeButton
              title={'Start Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={() =>
                changeMemberStatus(1, item.id, item?.trip_owner?.id, index)
              }
            />
          ) : (
            <ThemeButton
              title={'End Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={() =>
                changeMemberStatus(2, item.id, item?.trip_owner?.id, index)
              }
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MapAndChatScreen', {
              item: invitedTrips[index],
            });
          }}>
          <Image
            style={{
              height: Platform.OS == 'ios' ? hp('18.2') : hp('22.1'),
              width: wp('14'),
              opacity:
                item?.owner_running_status == 0
                  ? 0
                  : item?.pivot.member_running_status != 0
                  ? 1
                  : 0,
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
        <Image source={trash} style={styles.trachIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Image source={cardediticon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
  const onRowOpen = (rowKey, rowMap) => {
    setTimeout(() => {
      rowMap[rowKey]?.closeRow();
    }, 2000);
  };

  return (
    <View style={{marginTop: hp('3')}}>
      {groupTrips.length > 0 ? (
        <SwipeListView
          useFlatList={true}
          data={groupTrips}
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
          onRefresh={tripsCard}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyViewComp onRefresh={tripsCard} />
      )}

      <TripCreatedModal title={'Trip started'} isTripCreated={isTripCreated} />
    </View>
  );
};
export default memo(GroupTrips);
