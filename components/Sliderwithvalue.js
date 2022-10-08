import React, { useRef, useEffect, useState } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
export const Sliderwithvalue: () => Node = (props) => {
    const [SliderValue, setSliderValue] = useState(props.defaultvalue);
    return (
      <View style={[Array.from(props.style),{...props.style,paddingHorizontal: 10, flexDirection: 'row',alignItems: 'center'}]}>
        <Slider
            minimumValue={props.minimumValue}
            maximumValue={props.maximumValue}
            step={props.step}
            minimumTrackTintColor={props.progresscolor}
            maximumTrackTintColor={props.remainingcolor}
            onValueChange={(value)=> {setSliderValue(value)}}
            onSlidingComplete={(value)=>{props.valueset(value)}}
            style={{flex: 1}}
            value={props.defaultvalue}
            thumbImage={props.thumbtheme === 'light' ? require('../assets/imgs/thumb.png') : require('../assets/imgs/thumb-nm.png')}
        />
        <Text style={{width: 20,marginLeft: 10, fontFamily: 'DotsAllForNowJL', color: props.textcolor}}>{SliderValue}</Text>
      </View>
    );
  }
