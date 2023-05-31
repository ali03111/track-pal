import React, {memo, useCallback} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import MessagesComp from './MessagesComp';
import {styles} from './styles';
import useChatScreen from './useChatScreen';
import {wp} from '../../Config/responsive';
// import {
//   arrowback,
//   moredots,
//   search,
//   smsedit,
//   arrowbackwhite,
//   whitedots,
//   send,
// } from '../../Assests';
import {Colors} from '../../Theme/Variables';
import {Touchable} from '../../Components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import {TextComponent} from '../../Components/TextComponent';
import {send} from '../../Assets';

const ChatScreen = () => {
  const {msgs, getStart} = useChatScreen();
  const [text, onChangeText] = React.useState('');
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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: wp('4'),
        }}
      />
      <View style={styles.searchBar}>
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
    </View>
  );
};

export default memo(ChatScreen);
