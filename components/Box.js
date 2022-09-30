import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
export const Box: () => Node = (props) => {
    return (
      <View
        style={{
          ...props.style,
          borderColor: props.btcolor,
          borderRadius: 5,
          borderWidth: 6,
        }}>
      </View>
    );
  }
