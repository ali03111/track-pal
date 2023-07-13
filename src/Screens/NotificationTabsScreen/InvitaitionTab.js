import React, {memo, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './styles';

import useNotificationScreen from './useNotificationScreen';
import {hp, wp} from '../../Config/responsive';
import InvitationComp from '../../Components/InvitationComp';

const InvitationTab = () => {
  const {Invitation, tripNotification, tripStatus, getUserTrips} =
    useNotificationScreen();
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
        />
      </View>
    );
  });
  return (
    <View>
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
    </View>
  );
};

export default memo(InvitationTab);
