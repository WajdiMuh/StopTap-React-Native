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
  TouchableOpacity
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { MainMenuTitle } from '../components/MainMenuTitle';
import { strings } from '../translations/languages';

export const MainMenu: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = MainMenuStyle(colors)
  return (
    <View style={styles.container}>
      <MainMenuTitle>
        <Text style={styles.title}>StopTap</Text>
      </MainMenuTitle>
      <TouchableOpacity style={styles.devbutton} onPress={()=>{navigation.navigate('Dev')}}>
        <Image
          style={styles.devbuttonimg}
          source={require('../assets/imgs/wajdi.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const MainMenuStyle = (colors:any) => StyleSheet.create({
  container:{
    alignItems: 'center',
    flex: 1
  }
  ,
  title:{
    marginTop: 20,
    fontSize: 40,
    color: colors.text,
    fontFamily: 'DotsAllForNowJL'
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