// @flow
import React from 'react';
import type {Node} from 'react';
import { useState, useEffect,useContext } from 'react';
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
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { StopTapButton } from '../components/StopTapButton';
import { strings,langcontext } from '../translations/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Sliderwithvalue } from '../components/Sliderwithvalue';
import Icon from 'react-native-vector-icons/Ionicons';
import { themecontext } from '../App';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export const Settings: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = SettingsStyle(colors);
  const [isVibrateOn, setIsVibrateOn] = useState(true);
  const [MusicValue, setMusicValue] = useState(10);
  const [SFXValue, setSFXValue] = useState(10);
  const {AppLang,SetAppLang} = useContext(langcontext);
  const {AppTheme,SetAppTheme} = useContext(themecontext);
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
  async function readmusic() {
    try {
        const value = await AsyncStorage.getItem('music');
        if(value !== null) {
            setMusicValue(JSON.parse(value))
        }
    } catch(e) {

    }
  }
  async function setmusic(musicvalue:Number) {
    try {
        await AsyncStorage.setItem('music', JSON.stringify(musicvalue));
    } catch(e) {

    }
  }
  async function readsfx() {
    try {
        const value = await AsyncStorage.getItem('sfx');
        if(value !== null) {
            setSFXValue(JSON.parse(value))
        }
    } catch(e) {

    }
  }
  async function setsfx(sfxvalue:Number) {
    try {
        await AsyncStorage.setItem('sfx', JSON.stringify(sfxvalue));
    } catch(e) {

    }
  }
  useEffect(() => {
        readvibrate();
        readmusic();
        readsfx();
    }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.uppercontainer}>
        <Text style={styles.settingstitle}>{strings.settings.title}</Text>
        <TouchableOpacity style={styles.languagebutton} onPress={()=>{navigation.navigate('Languages')}}>
          <Image
            style={styles.languagebuttonimg}
            source={require('../assets/imgs/language.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.vibratebutton} 
          onPress={()=> {
              setvibrate();
              if(!isVibrateOn){
                  Vibration.vibrate();
              }
              setIsVibrateOn(!isVibrateOn);
          }}
        >
          <Image
            style={[styles.vibratebuttonimg, isVibrateOn && styles.vibrateon]}
            source={require('../assets/imgs/vibrate.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.midcontainer}>
        <Text style={[styles.musicsfxtitle,styles.gap]}>{strings.settings.music}</Text>
        <Sliderwithvalue
          step={1}
          minimumValue={0}
          maximumValue={10}
          valueset={(value)=>{
              setmusic(value);
          }}
          progresscolor={colors.text}
          remainingcolor={'#999999'}
          textcolor={colors.text}
          defaultvalue={MusicValue}
          style={[styles.slidervaluecontainer,styles.gap]}
        />
        <Text style={[styles.musicsfxtitle,styles.gap]}>{strings.settings.sfx}</Text>
        <Sliderwithvalue
          step={1}
          minimumValue={0}
          maximumValue={10}
          valueset={(value)=>{
              setsfx(value);
          }}
          progresscolor={colors.text}
          remainingcolor={'#999999'}
          textcolor={colors.text}
          defaultvalue={SFXValue}
          style={styles.slidervaluecontainer}
        />
      </View>
      <View>
        <StopTapButton
              bgcolor={colors.background}
              btcolor={colors.text}
              onPress={()=> {navigation.pop()}}
              title={strings.general.back}
              style={styles.backbtn}
          />
        <TouchableOpacity style={styles.nightmodebutton} onPress={()=>{
          SetAppTheme(AppTheme === 'light' ? 'dark' : 'light');
        }}>
          {AppTheme === 'light' ? 
          <Icon name={"moon"} size={40} color={"#727272"}></Icon> 
          : 
          <Icon name={"sunny"} size={40} color={"#727272"}></Icon>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SettingsStyle = (colors:any) => StyleSheet.create({
  container:{
    flex: 1
  },
  uppercontainer:{
    alignItems:'center'
  },
  midcontainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  settingstitle:{
    color: colors.text,
    fontFamily: 'DotsAllForNowJL',
    fontSize: 30,
    marginTop: 10
  },
  backbtn:{
    alignSelf: 'center',
    marginBottom: 10
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
  nightmodebutton:{
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  slidervaluecontainer:{
    width: '100%',
  },
  musicsfxtitle:{
    color: colors.text,
    fontFamily: 'DotsAllForNowJL',
    fontSize: 16
  },
  gap:{
    marginBottom: 10
  }
});