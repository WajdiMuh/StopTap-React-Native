import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
export const Devimg: () => Node = (props) => {
    const anim = useRef(new Animated.Value(0)).current 
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    anim,
                    {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    anim,
                    {
                        toValue: 0,
                        duration: 1000,
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
                scaleX: anim.interpolate(
                {
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.1, 1]  
                })
            },
            {
                scaleY: anim.interpolate(
                {
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.1 , 1]  
                })
            },
        ]
        }}>
        {props.children}
      </Animated.View>
    );
  }
