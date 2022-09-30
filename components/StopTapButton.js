import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, View } from 'react-native';
export const StopTapButton: () => Node = (props) => {
    const disabled = props.disabled === undefined ? false : props.disabled;
    return (
        <TouchableOpacity style={[{
                borderWidth: 6,
                borderColor: props.btcolor,
                borderRadius: 5,
                backgroundColor: props.bgcolor,
                ...props.style
            },disabled ? {opacity: 0} : {opacity: 1}]} 
            onPress={props.onPress}
            disabled={disabled}
            >
            <View style={{alignItems: 'center',backgroundColor: props.bgcolor}}>
                {(props.children === undefined) ? (
                    <Text style={{padding: 4, color: props.btcolor ,fontFamily: 'DotsAllForNowJL', fontSize: 17}}>{props.title}</Text>
                ):(
                    props.children
                )}
            </View>
        </TouchableOpacity>
    );
  }