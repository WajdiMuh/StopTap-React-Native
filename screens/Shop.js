// @flow
import React from 'react';
import type {Node} from 'react';
import { useState, useEffect,useContext,createContext,useRef } from 'react';
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
  AppState
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { StopTapButton } from '../components/StopTapButton';
import { strings } from '../translations/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Octicons';
import { shopitems } from '../shop/shopitems';
import Toast from 'react-native-toast-message';
import Sound from 'react-native-sound';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Coinshud } from '../components/Coinshud';
export const coinscontext = createContext(0);
export const selectedcolorcontext = createContext();
export const Shop: () => Node = ({ navigation }) => {  
    const { colors } = useTheme();
    const styles = ShopStyle(colors);
    const [Page, setPage] = useState(-1);
    const [Coins, setCoins] = useState(5000);
    const [ColorSelected, setColorSelected] = useState(-1);
    const numberformatter = new Intl.NumberFormat(strings.getLanguage(),{useGrouping: false});
    async function readselectedcolor() {
        try {
            const value = await AsyncStorage.getItem("selected");
            if(value !== null) {
                if(JSON.parse(value) === "colorselector"){
                    setPage(shopitems.findIndex(e => e.props.itemid == "colorselector"));
                }else{
                    setPage(JSON.parse(value));
                }
                setColorSelected(JSON.parse(value));
            }else{
                setPage(0);
                setColorSelected(0);
            }
        } catch(e) {

        }
    }
    async function setselectedcolor() {
        try {
            await AsyncStorage.setItem("selected",JSON.stringify(ColorSelected));
        } catch(e) {
    
        }
    }
    useEffect(() => {
        var shopbackgroundmusic = new Sound(require("../assets/music/shop-background.wav"), (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            shopbackgroundmusic.setVolume(1);
            shopbackgroundmusic.setNumberOfLoops(-1);
            shopbackgroundmusic.play();
            readselectedcolor();
        });
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (nextAppState === "active" && !shopbackgroundmusic.isPlaying()) {
                shopbackgroundmusic.play();
            }else if (nextAppState === "background"){
                shopbackgroundmusic.pause();
            }
        });      
        return () => {
            shopbackgroundmusic.release();
            subscription.remove();
        };
      }, []);
      useEffect(() => {
        if(ColorSelected !== -1){
            setselectedcolor();
        }
      },[ColorSelected]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.uppercontainer}>
                <Text style={styles.shoptitle}>{strings.shop.title}</Text>
                <Coinshud style={styles.coinscontainer} coins={Coins} textcolor={colors.text}/>
            </View>
            <View style={styles.midcontainer}>
                <StopTapButton
                    bgcolor={colors.background}
                    btcolor={colors.text} 
                    style={styles.switchitembutton} 
                    disabled={Page === 0}
                    onPress={
                        ()=>{
                            Toast.hide();
                            setPage(Page - 1);
                        }
                    }
                >
                    <Icon name="chevron-left" color={colors.text} size={40} style={styles.switchitembuttonicon}/>
                </StopTapButton>
                <coinscontext.Provider value={{Coins,setCoins}}>
                    <selectedcolorcontext.Provider value={{ColorSelected,setColorSelected}}>
                        <View style={styles.item}>
                            {(Page !== -1) && shopitems[Page]}
                        </View>
                    </selectedcolorcontext.Provider>
                </coinscontext.Provider>
                <StopTapButton 
                    bgcolor={colors.background}
                    btcolor={colors.text} 
                    style={styles.switchitembutton} 
                    disabled={Page === (shopitems.length - 1)}
                    onPress={
                        ()=>{
                            Toast.hide();
                            setPage(Page + 1);
                        }
                    }
                >
                    <Icon name="chevron-right" color={colors.text} size={40} style={styles.switchitembuttonicon}/>
                </StopTapButton>
            </View>
            <View style={styles.bottomcontainer}>
                <StopTapButton
                    bgcolor={colors.background}
                    btcolor={colors.text}
                    onPress={()=> {
                        Toast.hide();
                        navigation.pop();
                    }}
                    title={strings.general.back}
                    style={styles.backbtn}
                />
            </View>
        </SafeAreaView>
    );
};

const ShopStyle = (colors:any) => StyleSheet.create({
    container:{
        flex: 1
    },
    uppercontainer:{
        alignItems: 'center',
    },
    midcontainer:{
        flex: 1,
        alignItems:'center',   
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    bottomcontainer:{
        alignItems: 'center'
    },
    shoptitle:{
        color: colors.text,
        fontFamily: 'DotsAllForNowJL',
        fontSize: 30,
        position: 'absolute',
        top: 10
    },
    switchitembutton:{
        height: 100,
        justifyContent: 'center'
    },
    switchitembuttonicon:{
        paddingHorizontal: 6,
    },
    item:{
        flex: 1,
        alignSelf: 'stretch',
        marginVertical: 45,
        marginHorizontal: 10,
    },
    coinscontainer:{
        position: 'absolute',
        top: 10,
        left: 10
    },
    backbtn:{
        position: 'absolute',
        bottom: 10,
    }
});