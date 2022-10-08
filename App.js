/**
 * @format
 * @flow
 */

import React, { useEffect, useState, createContext } from 'react';
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
import { strings,langcontext } from './translations/languages';
import { Settings } from './screens/Settings';
import { Languages } from './screens/Languages';
import { Shop } from './screens/Shop';
import Toast from 'react-native-toast-message';
import { toastConfig } from './components/Stoptaptoast'
export const themecontext = createContext();
const App: () => Node = () => {
  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  const [AppLang,SetAppLang] = useState("en");
  const [AppTheme,SetAppTheme] = useState('light');
  return (
      <SafeAreaProvider style={{backgroundColor: AppTheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background}}>
        <themecontext.Provider value={{AppTheme,SetAppTheme}}>
          <langcontext.Provider value={{AppLang,SetAppLang}}>
            <StatusBar hidden={true} />
              <NavigationContainer theme={AppTheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator initialRouteName="MainMenu">
                  <Stack.Screen name="MainMenu" component={MainMenu} options={{headerShown:false}}/>
                  <Stack.Screen name="Dev" component={Dev} options={{headerShown:false}}/>
                  <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
                  <Stack.Screen name="Languages" component={Languages} options={{headerShown:false}}/>
                  <Stack.Screen name="Shop" component={Shop} options={{headerShown:false}}/>
                </Stack.Navigator>
              </NavigationContainer>
          </langcontext.Provider>
        </themecontext.Provider>
        <Toast config={toastConfig} visibilityTime={1500} type={"stoptaptoast"} />
      </SafeAreaProvider> 
    );
};

export default App;
