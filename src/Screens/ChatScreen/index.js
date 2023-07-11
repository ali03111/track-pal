import React, {memo, useCallback, useState} from 'react';
import {View, FlatList, Image, TextInput} from 'react-native';
import MessagesComp from './MessagesComp';
import {styles} from './styles';
import useChatScreen from './useChatScreen';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';
import {Touchable} from '../../Components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import {TextComponent} from '../../Components/TextComponent';
import {send} from '../../Assets';

const ChatScreen = () => {
  const {msgs, getStart} = useChatScreen();
  const [text, onChangeText] = useState('');
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.notification}>
        <MessagesComp user={item?.user} time={item?.time} msg={item?.msg} />
      </View>
    );
  });
  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshing={false}
        data={msgs}
        scrollEnabled
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp('2'),
          paddingHorizontal: wp('1'),
        }}
      />
      <View style={styles.searchMain}>
        <TextInput
          style={styles.searchinput}
          onChangeText={onChangeText}
          value={text}
          placeholder={'Type a message'}
          placeholderTextColor={Colors.gray}
        />

        <Touchable style={styles.sendBtnStyle}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[Colors.themeColorDark, Colors.themeColorLight]}>
            <View style={styles.msgsRecieve}>
              <Image source={send} style={styles.sendIcon} />
              <TextComponent text={'Send'} styles={styles.sendTextStyle} />
            </View>
          </LinearGradient>
        </Touchable>
      </View>
    </View>
  );
};

export default memo(ChatScreen);
