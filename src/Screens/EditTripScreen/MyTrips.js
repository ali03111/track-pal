import React, {memo, useCallback} from 'react';
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
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {EmptyViewComp} from '../../Components/EmptyViewComp';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {requestPermission} from '../../Services/FireBaseRealTImeServices';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {imageUrl} from '../../Utils/Urls';

export const loaderView = () => {
  return (
    <View style={styles.loaderMain}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.LoaderImage} />
          <View style={styles.loaderInner}>
            <View style={styles.loaderName} />
            <View style={styles.loaderDes} />
            <View style={styles.loaderDes} />
          </View>
        </View>
        <View style={styles.loaderBtn} />
      </View>
      <View style={styles.loaderBar} />
    </View>
  );
};

const MyTrips = ({navigation, route}) => {
  const {updateState, tripCardData, tripsCard, isTripCreated, checkLenght} =
    useEditTripScreen(navigation, route);

  const renderOwnerItem = useCallback(
    ({item, index}) => {
      var color =
        index.toString().length === 1
          ? index
          : index.toString().split('').pop();
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
                <View>
                  <CircleImage image={imageUrl(item?.image)} uri={true} />
                </View>
              ) : (
                <FirstCharacterComponent
                  indexNumber={color}
                  text={item?.name}
                />
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
              <ThemeButton
                title={'Start Trip'}
                textStyle={styles.TripBtnText}
                btnStyle={styles.TripBtn}
                onPress={async () => {
                  const result = await requestPermission();
                  if (result) updateState(1, item.id, index);
                }}
              />
            ) : (
              <ThemeButton
                title={'End Trip'}
                textStyle={styles.TripBtnText}
                btnStyle={styles.TripBtn}
                onPress={() => {
                  updateState(2, item.id, index);
                }}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() =>
              item?.owner_running_status == 1 &&
              navigation.navigate('MapAndChatScreen', {
                item: {...tripCardData[index], owner: true},
              })
            }>
            <Image
              style={{
                height: Platform.OS == 'ios' ? hp('18.2') : hp('22.1'),
                width: wp('14'),
                opacity: item?.owner_running_status == 1 ? 1 : 0,
              }}
              resizeMode="contain"
              source={leftArrow}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [tripCardData],
  );

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
  const noData = Boolean(tripCardData != null && tripCardData.length == 0)
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
        height: '100%',
        flex: 1,
        ...noData,
      }}>
      {tripCardData == null && (
        <SkeletonPlaceholder borderRadius={4}>
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
        </SkeletonPlaceholder>
      )}
      {tripCardData != null && tripCardData.length > 0 ? (
        <>
          <SwipeListView
            useFlatList={true}
            data={tripCardData}
            // disableRightSwipe={true}
            renderItem={renderOwnerItem}
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
            ListEmptyComponent={<EmptyViewComp onRefresh={tripsCard} />}
            showsVerticalScrollIndicator={false}
            style={{height: '100%'}}
          />
          <TripCreatedModal
            title={'Trip started'}
            isTripCreated={isTripCreated}
          />
        </>
      ) : (
        tripCardData != null &&
        tripCardData.length == 0 && (
          <View>
            <EmptyViewComp
              onRefresh={tripsCard}
              refreshStyle={styles.refresh}
            />
          </View>
        )
      )}
    </View>
  );
};
export default memo(MyTrips);
