import React, {memo, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './styles';

import useNotificationScreen from './useNotificationScreen';
import {hp, wp} from '../../Config/responsive';
import InvitationComp from '../../Components/InvitationComp';

const InvitationTab = () => {
  const {Invitation, tripNotification} = useNotificationScreen();
  const renderItem = useCallback(({item, index}) => {
    let text = item?.trip_owner.name;
    let letter = text?.charAt(0).toUpperCase();

    return (
      <View style={styles.notification}>
        <InvitationComp
          image={item?.image}
          firstLetter={letter}
          name={item?.trip_owner.name}
          description={item?.description}
          time={item?.created_at}
          groupName={item?.name}
          messages={item?.messages}
          status={item?.pivot.trip_status}
          letterStyles={styles.bg}
        />
      </View>
    );
  });
  return (
    <View>
      <FlatList
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
