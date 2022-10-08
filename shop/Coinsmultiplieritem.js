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
export const Coinsmultiplieritem: () => Node = (props) => {
    const { colors } = useTheme();
    const styles = CoinsmultiplieritemStyle(colors,props);
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
    async function setbuy(value: Number) {
        try {
            await AsyncStorage.setItem(props.itemid, JSON.stringify(value));
        } catch(e) {
    
        }
    }
    useEffect(() => {
        readbuy();
    }, []);
    return (
            (() => {
                switch(BuyState){
                    case 0:{
                        return <View style={styles.container}>
                            <Text style={styles.title}>{strings.shopitems.coinsmultiplieritem.doublecoins}</Text>
                            <Text style={styles.price}>{numberformatter.format(props.price[0])} {strings.shop.coins}</Text>
                            <StopTapButton
                                bgcolor={colors.background}
                                btcolor={colors.text}
                                onPress={()=> {
                                    if(Coins < props.price[0]){
                                        Toast.show({
                                            text1: strings.shop.noenoughcoins,
                                            topOffset: 50,
                                            props:{
                                                bgcolor: colors.text,
                                                textcolor: colors.background
                                            }
                                        });
                                    }else{
                                        setCoins(Coins - props.price[0]);
                                        setbuy(1);
                                        setBuyState(1);
                                    }
                                }}
                                title={strings.shop.buy}
                                style={styles.buyselectbutton}
                            />
                        </View>;
                        break;
                    }
                    case 1:{
                        return <View style={styles.container}>
                            <Text style={styles.title}>{strings.shopitems.coinsmultiplieritem.triplecoins}</Text>
                            <Text style={styles.price}>{numberformatter.format(props.price[1])} {strings.shop.coins}</Text>
                            <StopTapButton
                                bgcolor={colors.background}
                                btcolor={colors.text}
                                onPress={()=> {
                                    if(Coins < props.price[1]){
                                        Toast.show({
                                            text1: strings.shop.noenoughcoins,
                                            topOffset: 50,
                                            props:{
                                                bgcolor: colors.text,
                                                textcolor: colors.background
                                            }
                                        });
                                    }else{
                                        setCoins(Coins - props.price[1]);
                                        setbuy(2);
                                        setBuyState(2);
                                    }
                                }}
                                title={strings.shop.buy}
                                style={styles.buyselectbutton}
                            />
                        </View>;
                        break;
                    }
                    case 2: {
                        return <View style={styles.container}>
                            <Text style={styles.title}>{strings.shopitems.coinsmultiplieritem.triplecoins}</Text>
                        </View>;
                        break;
                    }
                    default:{
                        return <View></View>;
                        break;
                    }
                }
            })()
    );
  }

const CoinsmultiplieritemStyle = (colors:any,props:any) => StyleSheet.create({
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