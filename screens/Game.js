// @flow
import React from 'react';
import type {Node} from 'react';
import { useState, useEffect,useContext,createContext } from 'react';
import {
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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export const pausecontext = createContext();
export const Game: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = GameStyle(colors);
  const [Pause, setPause] = useState(false);
  const [Restart, setRestart] = useState(false);
  useEffect(() => {
    const backsubscription = BackHandler.addEventListener('hardwareBackPress', function () {
      setPause(!Pause);
      return true;
    });
    return () => {
      backsubscription.remove();
    };
  }, [Pause]);
  useEffect(() => {
    setRestart(false);
  }, [Restart]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.uppercontainer}>
        <TouchableOpacity style={styles.pausebutton} 
          onPress={()=>{
            setPause(!Pause);
          }}>
          {Pause ? 
          <Icon name={"play-circle-outline"} size={40} color={colors.text}></Icon> 
          :
          <Icon name={"pause-circle-outline"} size={40} color={colors.text}></Icon>}
        </TouchableOpacity>
      </View>
      <pausecontext.Provider value={{ pause: [Pause, setPause], restart:[Restart, setRestart]}}>
        <Pausescene navigation={navigation}></Pausescene>
        { (!Restart) && <Gamescene navigation={navigation}></Gamescene> }
      </pausecontext.Provider>
    </SafeAreaView>
  );
};

const GameStyle = (colors:any) => StyleSheet.create({
  container:{
    flex: 1
  },
  pausebutton:{
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1
  },
  uppercontainer:{
    zIndex: 1
  },
});