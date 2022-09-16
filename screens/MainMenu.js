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


const colors = useTheme().colors;

export const MainMenu: () => Node = () => {  
    return (
        <Text style={MainMenuStyle.title}>StopTap</Text>
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