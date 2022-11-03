// @flow
import React from 'react';
import {Node, useState,useContext} from 'react';
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
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { MainMenuTitle } from '../components/MainMenuTitle';
import { strings,langcontext   } from '../translations/languages';
import { StopTapButton } from '../components/StopTapButton';

export const MainMenu: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = MainMenuStyle(colors);
  const {AppLang,SetAppLang} = useContext(langcontext);
  return (
    <View style={styles.container}>
      <MainMenuTitle style={styles.title}>
        <Text style={styles.titletext}>StopTap</Text>
      </MainMenuTitle>
      <TouchableOpacity style={styles.devbutton} onPress={()=>{navigation.navigate('Dev')}}>
        <Image
          style={styles.devbuttonimg}
          source={require('../assets/imgs/wajdi.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsbutton} onPress={()=>{navigation.navigate('Settings')}}>
        <Image
          style={styles.settingsbuttonimg}
          source={require('../assets/imgs/settings.png')}
        />
      </TouchableOpacity>
      <StopTapButton
          bgcolor={colors.background}
          btcolor={colors.text}
          onPress={()=> {navigation.navigate('Game')}}
          title={strings.mainmenu.play}
          style={styles.gap}
      />
      <StopTapButton
        bgcolor={colors.background}
        btcolor={colors.text}
        onPress={()=> {navigation.pop()}}
        title={strings.mainmenu.howtoplay}
        style={styles.gap}
      />
      <StopTapButton
        bgcolor={colors.background}
        btcolor={colors.text}
        onPress={()=> {navigation.navigate('Shop')}}
        title={strings.mainmenu.shop}
        style={styles.gap}
      />
      <StopTapButton
        bgcolor={colors.background}
        btcolor={colors.text}
        onPress={()=> {navigation.pop()}}
        title={strings.mainmenu.account}
      />
    </View>
  );
};

const MainMenuStyle = (colors:any) => StyleSheet.create({
  container:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title:{
    position:'absolute',
    top: 40
  },
  titletext:{
    fontSize: 40,
    color: colors.text,
    fontFamily: 'DotsAllForNowJL'
  },
  gap:{
    marginBottom: 10
  },
  settingsbutton:{
    position: 'absolute',
    left: 10,
    top: 10
  },
  settingsbuttonimg:{
    width: 40,
    height: 40
  },
  devbutton:{
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  devbuttonimg:{
    width: 50,
    height: 50
  }
});