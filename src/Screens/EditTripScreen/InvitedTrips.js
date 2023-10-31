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
import {cardediticon, greenCircle, leftArrow, trash} from '../../Assets';
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
import {requestPermission} from '../../Services/FireBaseRealTImeServices';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {loaderView} from './MyTrips';
import {keyExtractor} from '../../Utils';

const InvitedTrip = ({navigation, route}) => {
  const {
    updateState,
    isTripCreated,
    tripCardData,
    tripsCard,
    changeMemberStatus,
    invitedTrips,
    checkLenght,
  } = useEditTripScreen(navigation, route);

  const renderItem = ({item, index}) => {
    var color =
      index.toString().length === 1 ? index : index.toString().split('').pop();
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
              <FirstCharacterComponent indexNumber={color} text={item?.name} />
            )}
            <View style={styles.groupDesc}>
              <TextComponent
                numberOfLines={1}
                text={item?.name}
                styles={styles.groupName}
              />
              <View style={styles.circleView}>
                {item?.status == 'Active' && (
                  <Image
                    source={greenCircle}
                    style={{width: wp('2')}}
                    resizeMode="contain"
                  />
                )}
                <TextComponent
                  text={item?.status}
                  styles={styles.groupActive(item?.status)}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TextComponent
                  text={item?.total_members + ' members'}
                  styles={styles.groupMember}
                />
                {checkLenght(item.id) > 0 && (
                  <TextComponent
                    text={` ( ${checkLenght(item.id)} messages )`}
                    // text={'Total members ' + item?.total_members}
                    styles={styles.messageNumber}
                  />
                )}
              </View>
            </View>
          </View>
          {item?.owner_running_status == 0 ||
          item?.owner_running_status == 2 ? (
            <InactiveBtn style={{width: wp('36')}} title={'Trip on Pending'} />
          ) : item?.pivot.member_running_status == 0 ||
            item?.pivot.member_running_status == 2 ? (
            <ThemeButton
              title={'Start Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={async () => {
                const result = await requestPermission();
                if (result)
                  changeMemberStatus(1, item.id, item?.trip_owner?.id, index);
              }}
            />
          ) : (
            <ThemeButton
              title={'End Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={() => {
                changeMemberStatus(2, item.id, item?.trip_owner?.id, index);
              }}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            item?.owner_running_status == 0 || item?.owner_running_status == 2
              ? 0
              : item?.pivot.member_running_status == 1
              ? navigation.navigate('MapAndChatScreen', {
                  item: invitedTrips[index],
                })
              : 0;
          }}>
          <Image
            style={{
              height: Platform.OS == 'ios' ? hp('18.2') : hp('22.1'),
              width: wp('14'),
              opacity:
                item?.owner_running_status == 0 ||
                item?.owner_running_status == 2
                  ? 0
                  : item?.pivot.member_running_status == 1
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
  const noData = Boolean(invitedTrips != null && invitedTrips.length == 0)
    ? {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('0'),
      }
    : {};
  return (
    <View
      style={{
        marginTop: hp('3'),
        flex: 1,
        height: '100%',
        ...noData,
      }}>
      {invitedTrips == null && (
        <SkeletonPlaceholder borderRadius={4}>
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
        </SkeletonPlaceholder>
      )}
      {invitedTrips != null && invitedTrips.length > 0 ? (
        <FlatList
          data={invitedTrips}
          renderItem={renderItem}
          scrollEnabled
          refreshing={false}
          onRefresh={tripsCard}
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}
          extraData={keyExtractor}
        />
      ) : (
        invitedTrips != null &&
        invitedTrips.length == 0 && (
          <EmptyViewComp onRefresh={tripsCard} refreshStyle={styles.refresh} />
        )
      )}

      {/* <TripCreatedModal title={'Trip started'} isTripCreated={isTripCreated} /> */}
    </View>
  );
};
export default memo(InvitedTrip);
