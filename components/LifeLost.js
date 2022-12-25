import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export const LifeLost: () => Node = (props) => {
    const sizeanimref = useRef(new Animated.Value(0)).current;
    const rotateanimref = useRef(new Animated.Value(0)).current;
    const onanim = Animated.parallel([
        Animated.timing(sizeanimref, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }),
        Animated.timing(rotateanimref, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        })
    ]);
    useEffect(() => {
        if(props.on){
            sizeanimref.setValue(1);
            rotateanimref.setValue(0);
            onanim.start();
        }
    }, [props.on]);
    return (
        <Animated.View 
            style={[{...props.style},{
                transform: [
                    {
                        translateX: props.x
                    },
                    {
                        scale: sizeanimref
                    },
                    {
                        rotate: rotateanimref.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "180deg"]
                        })
                    },
                ]
            }]}
        >
            <Icon name={"close"} size={props.size} color={'red'}></Icon> 
        </Animated.View>
    );
}
const styles = StyleSheet.create({
});
