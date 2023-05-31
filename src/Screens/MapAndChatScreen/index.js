import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import {styles} from './styles';
import CustomHeader from '../../Components/Header';
import {arrowBack} from '../../Assets';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GradientText from '../../Components/GradientText';
import {Colors} from '../../Theme/Variables';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../../Config/responsive';
import * as Screens from '../index';

function test() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.mainTabStyle}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.TabStyle}>
            {isFocused == false && (
              <Text style={{...styles.text, color: 'black'}}>{label}</Text>
            )}
            {isFocused == true && (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[Colors.themeColorDark, Colors.themeColorLight]}
                style={styles.Gradientbtn}>
                <Text style={styles.text}>{label}</Text>
              </LinearGradient>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();

const MapAndChatScreen = () => {
  return (
    <View style={styles.tabsMain}>
      {/* <CustomHeader
        arrowBackIcon={arrowBack}
        backText={'Back'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
      /> */}

      <Tab.Navigator
        tabBarOptions={{
          headerShown: false,
        }}
        tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="MapScreen"
          component={Screens.MapScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="ChatScreen"
          component={Screens.ChatScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </View>
  );
};
export default memo(MapAndChatScreen);
