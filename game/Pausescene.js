import React from 'react';
import type {Node} from 'react';
import { useState, useEffect,useContext } from 'react';
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
import { pausecontext } from '../screens/Game';
export const Pausescene: () => Node = (props) => {  
  const { colors } = useTheme();
  const styles = PausesceneStyle(colors);
  const {Pause,setPause} = useContext(pausecontext);
  return (
    Pause && <View style={styles.container}>
        <StopTapButton
            bgcolor={colors.background}
            btcolor={colors.text}
            onPress={()=> {
                setPause(false);
            }}
            title={strings.game.pause.resume}
            style={styles.gap}
        />
        <StopTapButton
            bgcolor={colors.background}
            btcolor={colors.text}
            onPress={()=> {}}
            title={strings.game.pause.retry}
            style={styles.gap}
        />        
        <StopTapButton
            bgcolor={colors.background}
            btcolor={colors.text}
            onPress={()=> {
                props.navigation.pop();
            }}
            title={strings.game.pause.mainmenu}
        />
    </View>
  );
};

const PausesceneStyle = (colors:any) => StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  gap:{
    marginBottom: 10
  }
});