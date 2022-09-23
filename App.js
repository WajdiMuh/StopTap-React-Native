/**
 * @format
 * @flow
 */

import React from 'react';
import type {Node} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DarkTheme,DefaultTheme,NavigationContainer } from '@react-navigation/native'; 
import { MainMenu } from './screens/MainMenu';
import { Dev } from './screens/Dev';
import { strings } from './translations/languages';
import { Settings } from './screens/Settings';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const scheme = useColorScheme();
  strings.setLanguage("en");
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="MainMenu">
          <Stack.Screen name="MainMenu" component={MainMenu} options={{headerShown:false}}/>
          <Stack.Screen name="Dev" component={Dev} options={{headerShown:false}}/>
          <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
