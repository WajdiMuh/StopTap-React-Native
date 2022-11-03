import React, { useRef, useEffect, useState } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
export const Sliderwithvalue: () => Node = (props) => {
    const [thumb, setThumb] = useState();
    const [SliderValue, setSliderValue] = useState(props.defaultvalue);
    useEffect(() => {
      Icon.getImageSource('circle', 25, props.textcolor)
       .then(setThumb);
    }, [props.textcolor]);
    useEffect(() => {
      setSliderValue(props.defaultvalue);
    }, [props.defaultvalue]);
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
            thumbImage={thumb}
        />
        <Text style={{width: 20,marginLeft: 10, fontFamily: 'DotsAllForNowJL', color: props.textcolor}}>{SliderValue}</Text>
      </View>
    );
  }
