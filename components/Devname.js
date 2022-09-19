import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
export const Devname: () => Node = (props) => {
    console.log(props);
    const [isBlue, setIsBlue] = useState(props.color);
    useEffect(() => {
        const toggle = setInterval(() => {
            setIsBlue(isBlue === 'blue' ? props.color : 'blue');
        }, props.interval);
        return () => clearInterval(toggle);
     })
    return (
      <Animated.Text
        style={{
          ...props.style,
            color: isBlue
        }}>
        {props.children}
      </Animated.Text>
    );
  }
