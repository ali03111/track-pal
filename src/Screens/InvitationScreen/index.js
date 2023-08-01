import React, {memo, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './styles';

import useNotificationScreen from './useNotificationScreen';
import {hp, wp} from '../../Config/responsive';
import InvitationComp from '../../Components/InvitationComp';
import {EmptyViewComp} from '../../Components/EmptyViewComp';
import CustomHeader from '../../Components/Header';

const InvitationTab = ({route, navigation}) => {
  const {Invitation, tripNotification, tripStatus, getUserTrips} =
    useNotificationScreen(route, navigation);
  const renderItem = useCallback(({item, index}) => {
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
        />
      </View>
    );
  });
  const noData = Boolean(tripNotification.length == 0)
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
        {tripNotification.length > 0 ? (
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
          <EmptyViewComp
            onRefresh={getUserTrips}
            refreshStyle={styles.refStyle}
          />
        )}
      </View>
    </>
  );
};

export default memo(InvitationTab);
