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
import { coinscontext,selectedcolorcontext } from '../screens/Shop';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Colorshopitem: () => Node = (props) => {
    const { colors } = useTheme();
    const styles = ColorshopitemStyle(colors,props);
    const {Coins, setCoins} = useContext(coinscontext);
    const {ColorSelected, setColorSelected} = useContext(selectedcolorcontext);
    const [BuyState, setBuyState] = useState(0);
    const numberformatter = new Intl.NumberFormat(strings.getLanguage(),{useGrouping: false});
    async function readbuy() {
        try {
            const value = await AsyncStorage.getItem('item' + props.itemid);
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
            await AsyncStorage.setItem('item' + props.itemid, JSON.stringify(1));
        } catch(e) {
    
        }
    }
    useEffect(() => {
        if(ColorSelected === props.itemid){
            setBuyState(2);
        }else if (ColorSelected != -1){
            if(props.price == undefined){
                setBuyState(1);
            }else{
                readbuy();
            }
        }
    }, [props.itemid,ColorSelected]);
    return (
        <View style={styles.container}>
            <Box btcolor={colors.text} style={styles.bigbox} color={props.bigcolor}></Box>
            <Box btcolor={colors.text} style={styles.smallbox} color={props.smallcolor}></Box>
            <Text style={styles.title}>{strings.getString("shopitems.colorshopitem." + props.title)}</Text>
            {props.price && (BuyState == 0) &&
             <Text style={styles.price}>{numberformatter.format(props.price)} {strings.shop.coins}</Text>}
            {(() => {
                switch(BuyState){
                    default:
                    case 0:{
                        return <StopTapButton
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
                        />;
                        break;
                    }
                    case 1:{
                        return <StopTapButton
                        bgcolor={colors.background}
                        btcolor={colors.text}
                        onPress={()=> {
                            setColorSelected(props.itemid);
                            setBuyState(2);
                        }}
                        title={strings.shop.select}
                        style={styles.buyselectbutton}
                        />;
                        break;
                    }
                    case 2:{
                        return <StopTapButton
                        bgcolor={colors.background}
                        btcolor={colors.text}
                        onPress={()=> {}}
                        title={strings.shop.selected}
                        style={styles.buyselectbutton}
                        />;
                        break;
                    }
                }
            })()}
        </View>
    );
  }

const ColorshopitemStyle = (colors:any,props:any) => StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigbox:{
        position: 'absolute',
        width: 60,
        height: 60,
        transform: [{translateY: -30}]
    },
    smallbox:{
        position: 'absolute',
        width: 40,
        height: 40,
        transform: [{translateY: -10},{translateX: -20}]
    },
    title:{
        position:'absolute',
        color: colors.text,
        fontFamily: 'DotsAllForNowJL',
        fontSize: 20,
        transform: [{translateY: 35}]
    },
    price:{
        position:'absolute',
        color: colors.text,
        fontFamily: 'DotsAllForNowJL',
        fontSize: 20,
        color: '#FFD700',
        textShadowColor: 'black',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 4,
        transform: [{translateY: 65}]
    },
    buyselectbutton:{
        position:'absolute',
        bottom: 10
    }
});