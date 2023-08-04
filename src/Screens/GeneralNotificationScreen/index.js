import React, {memo, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './styles';

import useNotificationScreen from './useNotificationScreen';
import {hp, wp} from '../../Config/responsive';
import GeneralNotification from '../../Components/GeneralNotification';
import {EmptyViewComp} from '../../Components/EmptyViewComp';
import CustomHeader from '../../Components/Header';
import {arrowBack, whiteArrowBack} from '../../Assets';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const loaderView = () => {
  return (
    <View style={styles.loaderMain}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.LoaderImage} />
          <View style={styles.loaderInner}>
            <View style={styles.loaderName} />
            <View style={styles.loaderDes} />
          </View>
        </View>
        <View style={styles.loaderBtn} />
      </View>
      <View style={styles.loaderBar} />
    </View>
  );
};

const GeneralNotificationTab = ({route, navigation, goBack}) => {
  const {ChatData, notifications, getUserNotification} = useNotificationScreen(
    route,
    navigation,
  );
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.notification}>
        <GeneralNotification
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
  const noData = Boolean(notifications != null && notifications.length == 0)
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
        headerTitle={'Notifications'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
        backTextStyle={styles.back}
      />
      <View style={{...noData}}>
        {notifications == null && (
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
        {notifications != null && notifications.length > 0 ? (
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
          notifications != null &&
          notifications.length == 0 && (
            <EmptyViewComp
              onRefresh={getUserNotification}
              refreshStyle={styles.refStyle}
            />
          )
        )}
      </View>
    </>
  );
};

export default memo(GeneralNotificationTab);
