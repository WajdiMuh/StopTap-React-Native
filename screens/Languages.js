// @flow
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
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { StopTapButton } from '../components/StopTapButton';
import { strings,langcontext } from '../translations/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Languages: () => Node = ({ navigation }) => {  
    const { colors } = useTheme();
    const styles = LanguagesStyle(colors);
    const {AppLang,SetAppLang} = useContext(langcontext);
    return (
        <View style={styles.container}>
            <Text style={styles.languagestitle}>{strings.Languages.title}</Text>
            <FlatList
                style={styles.langlist}
                data={Object.entries(strings.languages).map(x => { return {"lang": x[0], "value": x[1]}})}
                renderItem={
                    ({item}) => (
                        <TouchableOpacity onPress={()=>{
                            strings.setLanguage(item.lang);
                            SetAppLang(item.lang);
                        }}>
                            <Text style={styles.languageitem}>{item.value}</Text>
                        </TouchableOpacity>
                    )}
                keyExtractor={item => item.lang}
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

const LanguagesStyle = (colors:any) => StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center'
    },
    langlist:{
        alignSelf: 'stretch',
        paddingHorizontal: 10,
        marginTop: 10
    },
    languagestitle:{
        color: colors.text,
        fontFamily: 'DotsAllForNowJL',
        fontSize: 30,
        marginTop: 10,
    },
    backbtn:{
        marginBottom: 20,
    },
    languageitem:{
        textAlign:'center',
        borderBottomColor: colors.text,
        borderBottomWidth:2,
        paddingVertical:10,
        color: colors.text,
        fontFamily: 'DotsAllForNowJL',
        fontSize: 20
    }
});