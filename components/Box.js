import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
export const Box: () => Node = (props) => {
    return (
      <View style={{
        ...props.style,
        backgroundColor: props.btcolor,
        borderRadius: props.style.height / 6,
      }}
      onLayout={
          props.onLayout
      }
      >
        <View
          style={{
            backgroundColor: props.color,
            flex: 1,
            margin: props.style.height * (4/50),
            borderRadius: props.style.height / 10,
          }}>
        </View>
      </View>
    );
  }
