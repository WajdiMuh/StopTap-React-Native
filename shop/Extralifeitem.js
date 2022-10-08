import React, { useRef, useEffect, useState,useContext } from 'react';
import {useTheme} from '@react-navigation/native'; 
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
import { Box } from '../components/Box';
import { strings } from '../translations/languages';
import { StopTapButton } from '../components/StopTapButton';
import Toast from 'react-native-toast-message';
import { coinscontext } from '../screens/Shop';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Extralifeitem: () => Node = (props) => {
    const { colors } = useTheme();
    const styles = ExtralifeitemStyle(colors,props);
    const {Coins, setCoins} = useContext(coinscontext);
    const [BuyState, setBuyState] = useState(-1);
    const numberformatter = new Intl.NumberFormat(strings.getLanguage(),{useGrouping: false});
    async function readbuy() {
        try {
            const value = await AsyncStorage.getItem(props.itemid);
            if(value !== null) {
                setBuyState(JSON.parse(value));
            }else{
                setBuyState(0);
            }
        } catch(e) {

        }
    }
    async function setbuy() {
        try {
            await AsyncStorage.setItem(props.itemid, JSON.stringify(1));
        } catch(e) {
    
        }
    }
    useEffect(() => {
        readbuy();
    }, []);
    return (
        (BuyState == -1) ? <View></View> : <View style={styles.container}>
            <Text style={styles.title}>{strings.shopitems.extralifeitem.extralife}</Text>
            {props.price && (BuyState == 0) &&
             <Text style={styles.price}>{numberformatter.format(props.price)} {strings.shop.coins}</Text>}
            {(BuyState == 0) && <StopTapButton
                bgcolor={colors.background}
                btcolor={colors.text}
                onPress={()=> {
                    if(Coins < props.price){
                        Toast.show({
                            text1: strings.shop.noenoughcoins,
                            topOffset: 50,
                            props:{
                                bgcolor: colors.text,
                                textcolor: colors.background
                            }
                        });
                    }else{
                        setCoins(Coins - props.price);
                        setbuy();
                        setBuyState(1);
                    }
                }}
                title={strings.shop.buy}
                style={styles.buyselectbutton}
                />}
        </View>
    );
  }

const ExtralifeitemStyle = (colors:any,props:any) => StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color: colors.text,
        fontFamily: 'DotsAllForNowJL',
        fontSize: 20,
        textAlign: 'center'
    },
    price:{
        color: colors.text,
        fontFamily: 'DotsAllForNowJL',
        fontSize: 20,
        color: '#FFD700',
        textShadowColor: 'black',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 4,
    },
    buyselectbutton:{
        position:'absolute',
        bottom: 10
    }
});