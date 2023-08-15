import React, {memo, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './styles';

import useInvitaionScreen from './useInvitaionScreen';
import {hp, wp} from '../../Config/responsive';
import InvitationComp from '../../Components/InvitationComp';
import {EmptyViewComp} from '../../Components/EmptyViewComp';
import CustomHeader from '../../Components/Header';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {loaderView} from '../GeneralNotificationScreen';

const InvitationTab = ({route, navigation}) => {
  const {Invitation, tripNotification, tripStatus, getUserTrips} =
    useInvitaionScreen(route, navigation);
  const renderItem = useCallback(({item, index}) => {
    var color =
      index.toString().length === 1 ? index : index.toString().split('').pop();
    return (
      <View style={styles.notification}>
        <InvitationComp
          image={item?.image}
          name={item?.trip_owner.name}
          description={item?.description}
          time={item?.created_at}
          groupName={item?.name}
          messages={item?.messages}
          status={item?.pivot.trip_status}
          tripId={item?.pivot.trip_id}
          letterStyles={styles.bg}
          onPress={tripStatus}
          tripOwner={item?.trip_owner}
          index={color}
        />
      </View>
    );
  });
  const noData = Boolean(
    tripNotification != null && tripNotification.length == 0,
  )
    ? {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {
        flex: 1,
      };
  return (
    <>
      <CustomHeader
        headerTitle={'Invitaions'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
        backTextStyle={styles.back}
      />
      <View style={{...noData}}>
        {tripNotification == null && (
          <SkeletonPlaceholder borderRadius={4}>
            {loaderView()}
            {loaderView()}
            {loaderView()}
            {loaderView()}
            {loaderView()}
            {loaderView()}
            {loaderView()}
          </SkeletonPlaceholder>
        )}
        {tripNotification != null && tripNotification.length > 0 ? (
          <FlatList
            onRefresh={getUserTrips}
            refreshing={false}
            data={tripNotification}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: wp('4'),
              paddingBottom: hp('5'),
            }}
          />
        ) : (
          tripNotification != null &&
          tripNotification.length == 0 && (
            <EmptyViewComp
              onRefresh={getUserTrips}
              refreshStyle={styles.refStyle}
            />
          )
        )}
      </View>
    </>
  );
};

export default memo(InvitationTab);
