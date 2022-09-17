import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
export const MainMenuTitle: () => Node = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current 
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true
                    }
                )
            ])
        ).start();
    }, [fadeAnim])
    return (
      <Animated.View
        style={{
          ...props.style,
          transform: [{ 
            rotateZ: fadeAnim.interpolate(
            {
                inputRange: [0, 1],
                outputRange: ["-15deg", "15deg"]  
            }),
            scaleX: fadeAnim.interpolate(
            {
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.5, 1]  
            }),
            scaleY: fadeAnim.interpolate(
            {
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.5 , 1]  
            }),
        }]
        }}>
        {props.children}
      </Animated.View>
    );
  }