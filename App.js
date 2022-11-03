/**
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
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
import { createStackNavigator } from '@react-navigation/stack';
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
import { Game } from './screens/Game';
import { shopanim,leaderboardanim,miscellaneousanim } from './screens/ScreenTransitions';
import SplashScreen from 'react-native-splash-screen';
import { GameOver } from './screens/GameOver';
import API from './API/API';
import { Leaderboard } from './screens/Leaderboard';
export const themecontext = createContext();
const App: () => Node = () => {
  const Stack = createStackNavigator();
  const scheme = useColorScheme();
  const [AppLang,SetAppLang] = useState("en");
  const [AppTheme,SetAppTheme] = useState('light');
  useEffect(() => {
    API.requestaccesstoken();
    API.loaduserid();
    API.loadusername();
    SplashScreen.hide();
  },[]);
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
      <SafeAreaProvider style={{backgroundColor: AppTheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background}}>
        <themecontext.Provider value={{AppTheme,SetAppTheme}}>
          <langcontext.Provider value={{AppLang,SetAppLang}}>
            <StatusBar hidden={true} />
              <NavigationContainer theme={AppTheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack.Navigator initialRouteName="MainMenu" screenOptions={{headerShown:false,cardStyleInterpolator: miscellaneousanim}} >
                  <Stack.Screen name="MainMenu" component={MainMenu}/>
                  <Stack.Screen name="Dev" component={Dev}/>
                  <Stack.Screen name="Settings" component={Settings}/>
                  <Stack.Screen name="Languages" component={Languages}/>
                  <Stack.Screen name="Shop" component={Shop}
                    options={{
                      cardStyleInterpolator: shopanim
                    }}/>
                  <Stack.Screen name="Leaderboard" component={Leaderboard}
                    options={{
                      cardStyleInterpolator: leaderboardanim
                    }}/>
                  <Stack.Screen name="GameOver" component={GameOver}/>
                </Stack.Navigator>
              </NavigationContainer>
          </langcontext.Provider>
        </themecontext.Provider>
        <Toast config={toastConfig} visibilityTime={1500} type={"stoptaptoast"} />
      </SafeAreaProvider> 
    );
};

export default App;
