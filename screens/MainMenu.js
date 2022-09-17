// @flow
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { MainMenuTitle } from '../components/MainMenuTitle';

const colors = useTheme().colors;

export const MainMenu: () => Node = () => {  
    return (
      <View>
        <MainMenuTitle>
          <Text style={MainMenuStyle.title}>StopTap</Text>
        </MainMenuTitle>
      </View>
    );
};

const MainMenuStyle = StyleSheet.create({
  title:{
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 40,
    color: colors.text
  }
});