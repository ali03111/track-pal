import React from 'react';
import * as Screens from '../Screens/index';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MybottomTabs from './bottomNavigation';

const Stack = createNativeStackNavigator();
const StackNavigatior = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }}>
        <Stack.Screen name="OnBoardScreen" component={Screens.OnBoardScreen} />
        <Stack.Screen
          name="MapAndChatScreen"
          component={Screens.MapAndChatScreen}
        />
        <Stack.Screen name="ChatScreen" component={Screens.ChatScreen} />
        <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={Screens.RegisterScreen}
        />
        <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
        <Stack.Screen
          name="NotificationTabsScreen"
          component={Screens.NotificationTabsScreen}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={Screens.EditProfileScreen}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={Screens.ResetPasswordScreen}
        />
        <Stack.Screen name="ProfileScreen" component={Screens.ProfileScreen} />
        <Stack.Screen name="SyncingScreen" component={Screens.SyncingScreen} />
        <Stack.Screen name="SyncScreen" component={Screens.SyncScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigatior;
