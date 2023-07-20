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
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';

import {EmptyViewComp} from '../../Components/EmptyViewComp';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const MyTrips = ({navigation}) => {
  const {updateState, tripCardData, tripsCard} = useEditTripScreen(navigation);

  const renderOwnerItem = ({item, index}) => {
    const generateColor = () => {
      profileBgColor = tripProfileColors[Math.floor(Math.random() * 10)];
      return profileBgColor;
    };
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
              <TextComponent
                numberOfLines={1}
                text={item?.name}
                styles={styles.groupName}
              />
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
            <ThemeButton
              title={'Start Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={() => updateState(1, item.id, index)}
            />
          ) : (
            <ThemeButton
              title={'End Trip'}
              textStyle={styles.TripBtnText}
              btnStyle={styles.TripBtn}
              onPress={() => updateState(2, item.id, index)}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MapAndChatScreen', {
              item: {...tripCardData[index], owner: true},
            })
          }>
          <Image
            style={{
              height: Platform.OS == 'ios' ? hp('18.2') : hp('22.1'),
              width: wp('14'),
              opacity: item?.owner_running_status != 0 ? 1 : 0,
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
    <View style={{marginTop: hp('3'), height: '100%', flex: 1}}>
      {tripCardData.length > 0 ? (
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
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}
        />
      ) : (
        <EmptyViewComp onRefresh={tripsCard} />
      )}
    </View>
  );
};
export default memo(MyTrips);
