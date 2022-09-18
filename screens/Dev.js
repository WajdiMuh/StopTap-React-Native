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

export const Dev: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = DevStyle(colors)
  return (
    <View style={styles.container}>
        <Text>hello</Text>
    </View>
  );
};

const DevStyle = (colors:any) => StyleSheet.create({
  container:{
    alignItems: 'center',
    flex: 1
  }
  ,
  title:{
    marginTop: 20,
    fontSize: 40,
    color: colors.text
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