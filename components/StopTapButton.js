import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, View } from 'react-native';
export const StopTapButton: () => Node = (props) => {
    return (
        <TouchableOpacity style={{
                borderWidth: 5,
                borderColor: props.btcolor,
                borderRadius: 5
            }} 
            onPress={props.onPress}>
            <View style={{alignItems: 'center',...props.style,backgroundColor: props.bgcolor}}>
                <Text style={{padding: 4, color: props.btcolor}}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
  }