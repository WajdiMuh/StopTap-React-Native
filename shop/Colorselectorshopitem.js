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
    useWindowDimensions
  } from 'react-native';
import { Box } from '../components/Box';
import { strings } from '../translations/languages';
import { StopTapButton } from '../components/StopTapButton';
import Toast from 'react-native-toast-message';
import { coinscontext,selectedcolorcontext } from '../screens/Shop';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorPicker from "@bayramitto/react-native-colorpicker";
export const Colorselectorshopitem: () => Node = (props) => {
    const { colors } = useTheme();
    const styles = ColorselectorshopitemStyle(colors,props);
    const {Coins, setCoins} = useContext(coinscontext);
    const [BuyState, setBuyState] = useState(-1);
    const [SelectedBox, setSelectedBox] = useState(0);
    const SelectedBoxRef = useRef(0);
    const [LeftBoxColor, setLeftBoxColor] = useState('#0048ff');
    const [RightBoxColor, setRightBoxColor] = useState('#ff0000');
    const {ColorSelected, setColorSelected} = useContext(selectedcolorcontext);
    const window = useWindowDimensions();
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
    async function readcolors() {
        try {
            const smallcolor = await AsyncStorage.getItem("colorselectorsmallcolor");
            const bigcolor = await AsyncStorage.getItem("colorselectorbigcolor");
            if(smallcolor !== null) {
                setLeftBoxColor(JSON.parse(smallcolor));
            }
            if(bigcolor !== null) {
                setRightBoxColor(JSON.parse(bigcolor));
            }
            if(ColorSelected === props.itemid){
                setBuyState(2);
            }else if (ColorSelected != -1){
                if(props.price == undefined){
                    setBuyState(1);
                }else{
                    readbuy();
                }
            }
        } catch(e) {

        }
    }
    async function setcolors() {
        try {
            await AsyncStorage.setItem("colorselectorsmallcolor", JSON.stringify(LeftBoxColor));
            await AsyncStorage.setItem("colorselectorbigcolor", JSON.stringify(RightBoxColor));
        } catch(e) {
    
        }
    }
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
      }
    function colorcompare(color1,color2,tolerance:Number){
        var color1rgb = hexToRgb(color1);
        var color2rgb = hexToRgb(color2);
        color1rgb = color1rgb.map(x => x/255.0);
        color2rgb = color2rgb.map(x => x/255.0);
        return (Math.abs(color1rgb[0] - color2rgb[0]) <= tolerance) &&
        (Math.abs(color1rgb[1] - color2rgb[1]) <= tolerance) &&
        (Math.abs(color1rgb[2] - color2rgb[2]) <= tolerance);
    }
    useEffect(() => {
        readcolors();
    }, [props.itemid,ColorSelected]);
    useEffect(() => {
        SelectedBoxRef.current = SelectedBox;
      }, [SelectedBox]);
    return (
        (() => {
            switch(BuyState){
                case 0: {
                    return <View style={styles.container}>
                        <Text style={styles.title}>{strings.shopitems.colorselectorshopitem.colorpicker}</Text>
                        <Text style={styles.price}>{numberformatter.format(props.price)} {strings.shop.coins}</Text>
                        <StopTapButton
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
                        />
                    </View>;
                    break;
                }
                case 1:
                case 2: {
                    return <View style={styles.container}>
                        <View style={styles.boxbuttonscontainer}>
                            <View style={styles.boxbuttoncontainer}>
                                <Box style={styles.box} btcolor={(SelectedBox === 0) ? colors.text : LeftBoxColor} color={LeftBoxColor}>
                                </Box>
                                <StopTapButton
                                    style={styles.boxbutton}
                                    bgcolor={colors.background}
                                    btcolor={colors.text}
                                    onPress={()=> {
                                        setSelectedBox(0);
                                    }}
                                    title={strings.shopitems.colorselectorshopitem.smallboxcolor}
                                />
                            </View>
                            <View style={styles.boxbuttoncontainer}>
                                <Box style={styles.box} btcolor={(SelectedBox === 1) ? colors.text : RightBoxColor} color={RightBoxColor}>
                                </Box>
                                <StopTapButton
                                    style={styles.boxbutton}
                                    bgcolor={colors.background}
                                    btcolor={colors.text}
                                    onPress={()=> {
                                        setSelectedBox(1);
                                    }}
                                    title={strings.shopitems.colorselectorshopitem.bigboxcolor}
                                />
                            </View>
                        </View>
                        <ColorPicker
                            styles={{
                            width: window.width * 0.6,
                            height: 40,
                            }}
                            cicrleSize={20}
                            colors={
                                ["#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ff0000"]
                            }
                            onColorChanged={color => {
                                switch(SelectedBoxRef.current){
                                    default:
                                    case 0:{
                                        setLeftBoxColor(color);
                                        break;
                                    }
                                    case 1:{
                                        setRightBoxColor(color);
                                        break;
                                    }
                                }
                                setBuyState(1);
                            }}
                        />
                        {(BuyState == 2) ?  
                        <StopTapButton
                            bgcolor={colors.background}
                            btcolor={colors.text}
                            onPress={()=> {}}
                            title={strings.shop.selected}
                            style={styles.buyselectbutton}
                        />
                        :
                        <StopTapButton
                            bgcolor={colors.background}
                            btcolor={colors.text}
                            onPress={()=> {
                                if(
                                    colorcompare(LeftBoxColor,RightBoxColor,0.5) ||
                                    colorcompare(LeftBoxColor,"#ffffff",0.2) ||
                                    colorcompare(LeftBoxColor,"#000000",0.2) ||
                                    colorcompare(RightBoxColor,"#000000",0.2) ||
                                    colorcompare(RightBoxColor,"#000000",0.2)
                                ){
                                    Toast.show({
                                        text1: strings.shopitems.colorselectorshopitem.samecolorwhiteblack,
                                        topOffset: 50,
                                        props:{
                                            bgcolor: colors.text,
                                            textcolor: colors.background
                                        }
                                    });
                                }else{
                                    setColorSelected(props.itemid);
                                    setcolors();
                                    setBuyState(2);
                                }
                            }}
                            title={strings.shop.select}
                            style={styles.buyselectbutton}
                        />}
                    </View>;
                    break;
                }
                default:{
                    return <View></View>
                    break;
                }
            }
        })()
    );
  }

const ColorselectorshopitemStyle = (colors:any,props:any) => StyleSheet.create({
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
    box:{
        width: 50,
        height:50,
        marginBottom: 10
    },
    boxbutton:{
        width: 160
    },
    boxbuttoncontainer:{
        alignItems:'center',
        marginHorizontal: 20
    },
    boxbuttonscontainer:{
        flexDirection: 'row',
        marginTop: -40,
        marginBottom: 10
    },
    buyselectbutton:{
        position:'absolute',
        bottom: 10
    }
});