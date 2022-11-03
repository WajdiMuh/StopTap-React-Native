import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, StyleSheet,Image } from 'react-native';
export const Coinshud: () => Node = (props) => {
    return (
        <View style={[styles.coincontainer,{...props.style}]}>            
            <Image
                style={styles.coinimg}
                source={require('../assets/imgs/coin.png')}
            />
            <Text style={[styles.coinstext,{color: props.textcolor}]}>{props.coins}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    coincontainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    coinimg:{
        width:40,
        height: 40
    },
    coinstext:{
        fontFamily: 'DotsAllForNowJL',
        fontSize: 22,
    },
});