import React, {memo, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './styles';

import useNotificationScreen from './useNotificationScreen';
import {wp} from '../../Config/responsive';
import GeneralNotification from '../../Components/GeneralNotification';

const GeneralNotificationTab = () => {
  const {ChatData} = useNotificationScreen();
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.notification}>
        <GeneralNotification
          image={item?.image}
          name={item?.name}
          description={item?.description}
          time={item?.time}
          groupName={item?.groupName}
          messages={item?.messages}
        />
      </View>
    );
  });
  return (
    <View>
      <FlatList
        refreshing={false}
        data={ChatData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp('4'),
        }}
      />
    </View>
  );
};

export default memo(GeneralNotificationTab);
