import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity, Touchable} from 'react-native';
import {styles} from './styles';
import CustomHeader from '../../Components/Header';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DemoProfileImage1, cardediticon, leftArrow, trash} from '../../Assets';
import {CircleImage} from '../../Components/CircleImage';
import {Colors} from '../../Theme/Variables';
import {TextComponent} from '../../Components/TextComponent';
import LinearGradient from 'react-native-linear-gradient';
import ThemeButton from '../../Components/ThemeButton';

const renderItem = () => {
  return (
    <View style={styles.activeCardMain}>
      <View style={styles.activeCardStyle}>
        <View style={styles.cardLeft}>
          <CircleImage image={DemoProfileImage1} style={styles.groupLogo} />
          <View style={styles.groupDesc}>
            <Text style={styles.groupName}>Business Meets</Text>
            <Text style={styles.groupMember}>15 members</Text>
            <Text style={styles.groupActive}>Active</Text>
          </View>
        </View>
        <ThemeButton
          title={'Start Trip'}
          textStyle={styles.TripBtnText}
          btnStyle={styles.TripBtn}
        />
      </View>
      <Image source={leftArrow} />
    </View>
  );
};
const renderHiddenItem = (data, rowMap) => (
  <View style={styles.rowBack}>
    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
      <Image source={trash} />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
      <Image source={cardediticon} />
    </TouchableOpacity>
  </View>
);
const onRowOpen = (rowKey, rowMap) => {
  setTimeout(() => {
    rowMap[rowKey]?.closeRow();
  }, 2000);
};
const EditTripScreen = () => {
  return (
    <View style={styles.tips}>
      <CustomHeader
        headerTitle={'Trips'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
      />

      <SwipeListView
        useFlatList={true}
        data={[1, 2, 3]}
        // disableRightSwipe={true}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={70}
        rightOpenValue={-70}
        previewRowKey={'0'}
        previewOpenValue={0}
        previewOpenDelay={3000}
        onRowOpen={onRowOpen}
        // keyExtractor={keyExtractor}
        refreshing={false}
        // onRefresh={onRefresh}
        // ListEmptyComponent={
        //   <EmptyComponent
        //     title="Ooopss!"
        //     description="Reminders"
        //     onRefresh={onRefresh}
        //   />
        // }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default memo(EditTripScreen);
