import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
export const MainMenuTitle: () => Node = (props) => {
    const anim = useRef(new Animated.Value(0)).current 
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    anim,
                    {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    anim,
                    {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true
                    }
                )
            ])
        ).start();
    }, [anim])
    return (
      <Animated.View
        style={{
          ...props.style,
          transform: [
            { 
                rotateZ: anim.interpolate(
                {
                    inputRange: [0, 1],
                    outputRange: ["-15deg", "15deg"]  
                })
            },
            {
                scaleX: anim.interpolate(
                {
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.5, 1]  
                })
            },
            {
                scaleY: anim.interpolate(
                {
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.5 , 1]  
                })
            },
        ]
        }}>
        {props.children}
      </Animated.View>
    );
  }