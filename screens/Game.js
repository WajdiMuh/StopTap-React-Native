// @flow
import React from 'react';
import type {Node} from 'react';
import { useState, useEffect,useContext,createContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Button,
  Vibration,
  BackHandler
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { StopTapButton } from '../components/StopTapButton';
import { strings,langcontext } from '../translations/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pausescene } from '../game/Pausescene';
import { Gamescene } from '../game/Gamescene';
export const pausecontext = createContext();
export const Game: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = GameStyle(colors);
  const [Pause, setPause] = useState(false);
  useEffect(() => {
    const backsubscription = BackHandler.addEventListener('hardwareBackPress', function () {
      setPause(!Pause);
      return true;
    });
    return () => {
      backsubscription.remove();
    };
  }, [Pause]);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pausebutton} 
        onPress={()=>{
          setPause(!Pause);
        }}>
        {Pause ? 
        <Icon name={"play-circle-outline"} size={40} color={colors.text}></Icon> 
        :
        <Icon name={"pause-circle-outline"} size={40} color={colors.text}></Icon>}
      </TouchableOpacity>
      <pausecontext.Provider value={{Pause, setPause}}>
        <Pausescene navigation={navigation}></Pausescene>
        <Gamescene></Gamescene>
      </pausecontext.Provider>
    </View>
  );
};

const GameStyle = (colors:any) => StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  pausebutton:{
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1
  }
});