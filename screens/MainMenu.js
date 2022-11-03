// @flow
import React, { useEffect } from 'react';
import {Node, useState,useContext} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useTheme} from '@react-navigation/native'; 
import { MainMenuTitle } from '../components/MainMenuTitle';
import { strings,langcontext   } from '../translations/languages';
import { StopTapButton } from '../components/StopTapButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import API from '../API/API';
import { UsernameModal,UserNameModalVisiblity } from '../components/UsernameModal';

export const MainMenu: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = MainMenuStyle(colors);
  const {AppLang,SetAppLang} = useContext(langcontext);
  const [UserNameModalVisible, setUserNameModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <UserNameModalVisiblity.Provider value={{UserNameModalVisible, setUserNameModalVisible}}>
        <UsernameModal colors={colors} 
          callback={(username) => {
            API.setusername(username);
          }}
        />
      </UserNameModalVisiblity.Provider>
      <View style={styles.uppercontainer}>
        <MainMenuTitle style={styles.title}>
          <Text style={styles.titletext}>StopTap</Text>
        </MainMenuTitle>
        <TouchableOpacity style={styles.settingsbutton} onPress={()=>{
          navigation.navigate('Settings');
          Toast.hide();
          }}>
          <Image
            style={styles.settingsbuttonimg}
            source={require('../assets/imgs/settings.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.midcontainer}>
        <StopTapButton
            bgcolor={colors.background}
            btcolor={colors.text}
            onPress={()=> {
              Toast.hide();
              navigation.pop();
            }}
            title={strings.mainmenu.play}
            style={styles.gap}
        />
        <StopTapButton
          bgcolor={colors.background}
          btcolor={colors.text}
          onPress={()=> {
            Toast.hide();
            navigation.pop();
          }}
          title={strings.mainmenu.howtoplay}
          style={styles.gap}
        />
        <StopTapButton
          bgcolor={colors.background}
          btcolor={colors.text}
          onPress={()=> {
            Toast.hide();
            navigation.navigate('Shop');
          }}
          title={strings.mainmenu.shop}
          style={styles.gap}
        />
        <StopTapButton
          bgcolor={colors.background}
          btcolor={colors.text}
          onPress={()=> {
            if(API.checkuserid()){
              Toast.hide();
              navigation.navigate('Leaderboard');
            }else if(!API.checkusername()){
              setUserNameModalVisible(true);
            }else{
              Toast.show({
                text1: "You need to set a highscore\nto be able to access the leaderboard",
                topOffset: 50,
                position: 'bottom',
                visibilityTime: 2500,
                props:{
                    bgcolor: colors.text,
                    textcolor: colors.background
                }
              });
            }
          }}
          title={strings.mainmenu.leaderboard}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.devbutton} onPress={()=>{
          Toast.hide();
          navigation.navigate('Dev');
        }}>
          <Image
            style={styles.devbuttonimg}
            source={require('../assets/imgs/wajdi.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const MainMenuStyle = (colors:any) => StyleSheet.create({
  container:{
    flex: 1
  },
  uppercontainer:{
    alignItems:'center'
  },
  midcontainer:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title:{
    top: 40,
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