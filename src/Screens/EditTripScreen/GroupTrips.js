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
import {loaderView} from './MyTrips';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {imageUrl} from '../../Utils/Urls';
import EditTripModal from './editTripModal';
import GroupMemberSelectModal from './GroupMemberSelectModal';

const GroupTrips = ({navigation, route}) => {
  const {
    updateState,
    isTripCreated,
    tripCardData,
    tripsCard,
    changeMemberStatus,
    invitedTrips,
    groupTrips,
    changeMemberStatusGroup,
    checkLenght,
    deleteTrip,
    openInfoModal,
    infoModal,
    editTripData,
    updateModalsState,
    userData,
    keyboardType,
    tripMemebers,
    tripName,
    tripPicture,
    uploadFromGalary,
    onCloseModal,
    allUser,
    userModal,
    addMembersToGroup,
    getUser,
    filterIDSfromArry,
    updateTripData,
    updateError,
  } = useEditTripScreen(navigation, route);

  const renderItem = ({item, index}) => {
    var color =
      index.toString().length === 1 ? index : index.toString().split('').pop();
    return (
      <View style={styles.activeCardMain(item?.status)}>
        <View style={styles.activeCardStyle}>
          <View style={styles.cardLeft}>
            {item?.image ? (
              <View>
                <CircleImage image={imageUrl(item?.image)} uri={true} />
              </View>
            ) : (
              <FirstCharacterComponent indexNumber={color} text={item?.name} />
            )}
            <View style={styles.groupDesc}>
              <TextComponent text={item?.name} styles={styles.groupName} />
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
            item?.pivot?.member_running_status == 2 ? (
            <ThemeButton
              title={'Start Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={async () => {
                const result = await requestPermission();
                if (result)
                  changeMemberStatusGroup(
                    1,
                    item.id,
                    item?.trip_owner?.id,
                    index,
                  );
              }}
            />
          ) : (
            <ThemeButton
              title={'End Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={() => {
                changeMemberStatusGroup(
                  2,
                  item.id,
                  item?.trip_owner?.id,
                  index,
                );
              }}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MapAndChatScreen', {
              item: groupTrips[index],
            });
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
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          console.log('datadatadata', data);
          deleteTrip(data?.item?.trip_owner?.id, data?.item?.id);
        }}>
        <Image source={trash} style={styles.trachIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => openInfoModal(data.item)}>
        <Image source={cardediticon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
  const onRowOpen = (rowKey, rowMap) => {
    setTimeout(() => {
      rowMap[rowKey]?.closeRow();
    }, 2000);
  };
  const noData = Boolean(groupTrips != null && groupTrips.length == 0)
    ? {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('0'),

        // backgroundColor: 'red',
      }
    : {};
  return (
    <View
      style={{
        marginTop: hp('3'),
        height: '100%',
        flex: 1,
        ...noData,
      }}>
      {infoModal && (
        <EditTripModal
          isModalVisible={infoModal}
          toggleModal={onCloseModal}
          tripData={editTripData}
          userData={userData}
          keyboardType={keyboardType}
          uploadFromGalary={uploadFromGalary}
          tripPicture={tripPicture}
          tripMemebers={tripMemebers}
          tripName={tripName}
          changeName={e => updateModalsState({tripName: e})}
          updateTripData={updateTripData}
          updateError={updateError}
          openMembersModal={() => {
            console.log(
              'editTripData.userseditTripData.users',
              editTripData.users,
            );
            updateModalsState({
              tripMemebers: editTripData.users,
              infoModal: false,
            });
            setTimeout(() => {
              updateModalsState({userModal: true});
            }, 100);
          }}
        />
      )}
      {userModal && (
        <GroupMemberSelectModal
          {...{
            isGroupMemberSelectModal: userModal,
            toggleNextModal: () => {
              updateModalsState({
                editTripData: {...editTripData, users: tripMemebers},
              });
              // openNextModal('isGroupMemberSelectModal', 'isModalVisible');
            },
            onBackPress: () => {
              updateModalsState({userModal: false});
              setTimeout(() => {
                updateModalsState({infoModal: true});
              }, 100);
            },
            extraData: {
              keyboardStatus: keyboardType,
              allUser,
              addMembersToGroup,
              groupMembers: tripMemebers,
              message: 'updateError',
              getUser,
            },
          }}
        />
      )}
      {groupTrips == null && (
        <SkeletonPlaceholder borderRadius={4}>
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
        </SkeletonPlaceholder>
      )}
      {groupTrips != null && groupTrips.length > 0 ? (
        <SwipeListView
          useFlatList={true}
          data={groupTrips}
          // disableRightSwipe={true}
          // disableLeftSwipe={true}
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
        groupTrips != null &&
        groupTrips.length == 0 && (
          <EmptyViewComp onRefresh={tripsCard} refreshStyle={styles.refresh} />
        )
      )}

      {/* <TripCreatedModal title={'Trip started'} isTripCreated={isTripCreated} /> */}
    </View>
  );
};
export default memo(GroupTrips);
