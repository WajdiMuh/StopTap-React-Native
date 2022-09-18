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
import { Devimg } from '../components/Devimg';
import { StopTapButton } from '../components/StopTapButton';

export const Dev: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = DevStyle(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.textabove}>Developed By</Text>
      <Text style={styles.textabove}>Wajdi ELMuhtadi</Text>
      <Devimg>  
        <Image style={styles.devimg}
          source={require('../assets/imgs/wajdi.png')}
        />
      </Devimg>
      <Text style={styles.textbelow}>Thanks for playing</Text>
      <View style={styles.backbtn}>
        <StopTapButton
          bgcolor={colors.background}
          btcolor={colors.text}
          onPress={()=> {navigation.pop()}}
          title="Back"
        />
      </View>
    </View>
  );
};

const DevStyle = (colors:any) => StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textabove:{
    marginBottom: 20,
    fontFamily: 'DotsAllForNowJL',
  },
  textbelow:{
    marginTop: 20,
    fontFamily: 'DotsAllForNowJL'
  },
  backbtn:{
    position: 'absolute',
    bottom: 20,
  }
});