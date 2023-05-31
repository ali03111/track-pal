import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';
import CustomHeader from '../../Components/Header';
import {SwipeListView} from 'react-native-swipe-list-view';

const EditTripScreen = () => {
  this.state.listViewData = Array(20)
    .fill('')
    .map((_, i) => ({key: `${i}`, text: `item #${i}`}));
  return (
    <View style={styles.tips}>
      <CustomHeader
        headerTitle={'Trips'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
      />

      <SwipeListView
        data={this.state.listViewData}
        renderItem={(data, rowMap) => (
          <View style={styles.rowFront}>
            <Text>I am {data.item.text} in a SwipeListView</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <Text>Left</Text>
            <Text>Right</Text>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </View>
  );
};
export default memo(EditTripScreen);
