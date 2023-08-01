import React from 'react';
import {View, Text, FlatList} from 'react-native';

const GeneralNotification = () => {
  const {ChatData, notifications, getUserNotification} = useNotificationScreen(
    route,
    navigation,
  );
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.notification}>
        <GeneralNotificationComp
          image={item?.profile_image}
          name={item?.sender?.name}
          // description={item?.description}
          time={item?.created_at}
          // groupName={item?.groupName}
          messages={item?.body}
        />
      </View>
    );
  });
  const noData = Boolean(notifications.length == 0)
    ? {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {
        flex: 1,
      };
  return (
    <View style={{...noData}}>
      {notifications.length > 0 ? (
        <FlatList
          refreshing={false}
          data={notifications}
          renderItem={renderItem}
          onRefresh={getUserNotification}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('4'),
            paddingBottom: hp('5'),
          }}
        />
      ) : (
        <EmptyViewComp
          onRefresh={getUserNotification}
          refreshStyle={styles.refStyle}
        />
      )}
    </View>
  );
};

export default React.memo(GeneralNotification);
