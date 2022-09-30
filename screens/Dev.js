// @flow
import React from 'react';
import type {Node} from 'react';
import { useContext } from 'react';
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
import { Devname } from '../components/Devname';
import { strings } from '../translations/languages';

export const Dev: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = DevStyle(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.textabove}>{strings.dev.developedby}</Text>
      <Devname style={styles.textabove} color={colors.text} interval={500}>
        {strings.dev.name}
      </Devname>
      <Devimg>  
        <Image style={styles.devimg}
          source={require('../assets/imgs/wajdi.png')}
        />
      </Devimg>
      <Text style={styles.textbelow}>{strings.dev.thxforplaying}</Text>
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

const DevStyle = (colors:any) => StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textabove:{
    marginBottom: 20,
    fontFamily: 'DotsAllForNowJL',
    color: colors.text
  },
  textbelow:{
    marginTop: 20,
    fontFamily: 'DotsAllForNowJL',
    color: colors.text
  },
  backbtn:{
    position: 'absolute',
    bottom: 20,
  }
});