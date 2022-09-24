// @flow
import React from 'react';
import type {Node} from 'react';
import { useState, useEffect } from 'react';
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
  Vibration
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { StopTapButton } from '../components/StopTapButton';
import { strings } from '../translations/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Sliderwithvalue } from '../components/Sliderwithvalue';

export const Settings: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = SettingsStyle(colors);
  const [isVibrateOn, setIsVibrateOn] = useState(true);
  async function readvibrate() {
    try {
        const value = await AsyncStorage.getItem('vibrate');
        if(value !== null) {
            setIsVibrateOn(JSON.parse(value))
        }
    } catch(e) {

    }
  }
  async function setvibrate() {
    try {
        await AsyncStorage.setItem('vibrate', JSON.stringify(!isVibrateOn));
    } catch(e) {

    }
  }
  useEffect(() => {
        readvibrate();
    }, []);
  return (
    <View style={styles.container}>
        <Text style={styles.settingstitle}>Settings</Text>
        <TouchableOpacity style={styles.languagebutton} onPress={()=>{navigation.navigate('Dev')}}>
        <Image
          style={styles.languagebuttonimg}
          source={require('../assets/imgs/language.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.vibratebutton} 
        onPress={()=> {
            setvibrate();
            setIsVibrateOn(!isVibrateOn);
        }}
      >
        <Image
          style={[styles.vibratebuttonimg, isVibrateOn && styles.vibrateon]}
          source={require('../assets/imgs/vibrate.png')}
        />
      </TouchableOpacity>
      <Text style={styles.gap}>Music</Text>
      <Sliderwithvalue
        step={1}
        minimumValue={0}
        maximumValue={10}
        valueset={(value)=>{
            console.log(value);
        }}
        progresscolor={'black'}
        remainingcolor={'#999999'}
        defaultvalue={10}
        style={[styles.slidervaluecontainer,styles.gap]}
      />
      <Text style={styles.gap}>SFX</Text>
      <Sliderwithvalue
        step={1}
        minimumValue={0}
        maximumValue={10}
        valueset={(value)=>{
            console.log(value);
        }}
        progresscolor={'black'}
        remainingcolor={'#999999'}
        defaultvalue={10}
        style={styles.slidervaluecontainer}
      />
      <StopTapButton
            bgcolor={colors.background}
            btcolor={colors.text}
            onPress={()=> {navigation.pop()}}
            title={strings.general.back}
            style={styles.backbtn}
        />
    </View>
  );
};

const SettingsStyle = (colors:any) => StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  settingstitle:{
    color: colors.text,
    fontFamily: 'DotsAllForNowJL',
    fontSize: 30,
    position: 'absolute',
    top: 10
  },
  backbtn:{
    position: 'absolute',
    bottom: 20,
  },
  vibratebutton:{
    position: 'absolute',
    right: 10,
    top: 10
  },
  vibratebuttonimg:{
    width: 40,
    height: 40,
  },
  vibrateon:{
    tintColor: 'red'
  },
  languagebutton:{
    position: 'absolute',
    left: 10,
    top: 10
  },
  languagebuttonimg:{
    width: 40,
    height: 40
  },
  slidervaluecontainer:{
    width: '100%',
  },
  gap:{
    marginBottom: 10
  }
});