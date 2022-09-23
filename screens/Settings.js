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
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { StopTapButton } from '../components/StopTapButton';
import { strings } from '../translations/languages';

export const Settings: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = SettingsStyle(colors);
  return (
    <View style={styles.container}>
        <Text style={styles.settingstitle}>Settings</Text>
        <TouchableOpacity style={styles.languagebutton} onPress={()=>{navigation.navigate('Dev')}}>
        <Image
          style={styles.languagebuttonimg}
          source={require('../assets/imgs/language.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.vibratebutton} onPress={()=>{navigation.navigate('Dev')}}>
        <Image
          style={styles.vibratebuttonimg}
          source={require('../assets/imgs/vibrate.png')}
        />
      </TouchableOpacity>
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
    height: 40
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
});