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
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { StopTapButton } from '../components/StopTapButton';
import { strings,langcontext } from '../translations/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export const Languages: () => Node = ({ navigation }) => {  
    const { colors } = useTheme();
    const styles = LanguagesStyle(colors);
    const {AppLang,SetAppLang} = useContext(langcontext);
    return (
        <SafeAreaView style={styles.container}>
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
                            <View style={styles.languageitemcontainer}>
                                <Text style={styles.languageitem}>{item.value}</Text>
                            </View>
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
        </SafeAreaView>
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
    languageitemcontainer:{
        borderBottomColor: colors.text,
        borderBottomWidth:2,
    },
    languageitem:{
        textAlign:'center',
        paddingVertical:10,
        color: colors.text,
        fontFamily: 'DotsAllForNowJL',
        fontSize: 20
    },
    backbtn:{
        marginBottom: 10
    }
});