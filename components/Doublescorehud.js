import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
export const Doublescorehud: () => Node = (props) => {
    const sizeanimref = useRef(new Animated.Value(1)).current;
    const opacityanimref = useRef(new Animated.Value(0.27)).current;
    const onanim = Animated.parallel([
        Animated.spring(sizeanimref, {
            toValue: 1.5,
            damping: 4,
            velocity: 1,
            stiffness: 100,
            mass: 1,
            useNativeDriver: true
        }),
        Animated.timing(opacityanimref, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        })
    ]);
    const offanim = Animated.parallel([
        Animated.spring(sizeanimref, {
            toValue: 1,
            damping: 4,
            velocity: 1,
            stiffness: 100,
            mass: 1,
            useNativeDriver: true
        }),
        Animated.timing(opacityanimref, {
            toValue: 0.27,
            duration: 250,
            useNativeDriver: true
        })
    ]);
    useEffect(() => {
        if(props.on){
            onanim.start();
        }else{
            offanim.start();
        }
    }, [props.on]);
    return (
        <View style={styles.container}>
            <Animated.View 
                style={[styles.circle,{
                    transform: [
                        {
                            scaleX: sizeanimref
                        },
                        {
                            scaleY: sizeanimref
                        },
                    ],
                    opacity: opacityanimref
                }]}
            >
                <Text style={styles.doublescoretext}>x2</Text>
            </Animated.View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle:{
        backgroundColor: 'red',
        width: 25,
        height: 25,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    doublescoretext:{
        fontFamily: 'DotsAllForNowJL',
        fontSize: 10,
        textAlign: 'center',
    }
});
