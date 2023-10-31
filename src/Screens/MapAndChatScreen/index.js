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
import useReduxStore from '../../Hooks/UseReduxStore';
import useMapAndChatScreen from './useMapAndChatScreen';

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

const MapAndChatScreen = ({navigation, route}) => {
  console.log(
    '{route?.params?.asdasdasdasdasdasdasdasitem?',
    route?.params?.item,
  );
  const {checkLenght} = useMapAndChatScreen(route?.params?.item);

  return (
    <View style={styles.tabsMain}>
      <CustomHeader
        arrowBackIcon={arrowBack}
        backText={'Back'}
        style={styles.headerStyle}
        titleStyle={styles.hdTitle}
        headerTitle={route?.params?.item?.name}
        goBack={navigation.goBack}
        numberOfLines={1}
      />

      <Tab.Navigator
        tabBarOptions={{
          headerShown: false,
        }}
        tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Map"
          component={Screens.MapScreen}
          options={{headerShown: false}}
          initialParams={route}
        />
        <Tab.Screen
          name={`Chat ( ${checkLenght} )`}
          component={Screens.ChatScreen}
          options={{headerShown: false}}
          initialParams={route}
        />
      </Tab.Navigator>
    </View>
  );
};
export default memo(MapAndChatScreen);
