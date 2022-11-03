import React from 'react';
import type {Node} from 'react';
import { useState, useEffect,useContext,useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Button,
  Vibration,
  BackHandler,
  useWindowDimensions,
  Animated,
  LayoutChangeEvent
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { StopTapButton } from '../components/StopTapButton';
import { strings,langcontext } from '../translations/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pausecontext } from '../screens/Game';
import Icon from 'react-native-vector-icons/Ionicons';
import { Doublescorehud } from '../components/Doublescorehud';
import { Coinshud } from '../components/Coinshud';
import { Box } from '../components/Box';
export const Gamescene: () => Node = (props) => {  
  const { colors } = useTheme();
  const { height, width } = useWindowDimensions();
  const styles = GamesceneStyle(colors,width);
  const {Pause,setPause} = useContext(pausecontext);
  const [Lives, setLives] = useState(3);
  const [DoubleScore, setDoubleScore] = useState(false);
  const [BigBoxX, setBigBoxX] = useState(0);
  const [BigBoxWidth, setBigBoxWidth] = useState(0);
  const [IsIntersecting, setIsIntersecting] = useState(false);
  const moveanimref = useRef(new Animated.Value(0)).current;
  // const moveanimright = Animated.timing(moveanimref, {
  //     toValue: width - ((35 * width) / 411),
  //     duration: 1000,
  //     useNativeDriver: true
  // });
  const moveanim = Animated.loop(
    Animated.sequence([
      Animated.timing(moveanimref, {
        toValue: width - ((35 * width) / 411),
        duration: 1000,
        useNativeDriver: true
      }),
      {
        start: (finished) => {
          console.log("finished right");
          finished({finished: true});
        }
      },
      Animated.timing(moveanimref, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }),
      {
        start: (finished) => {
          console.log("finished left");
          finished({finished: true});
        }
      },
    ])
  );
  useEffect(() => {
    moveanimref.addListener((value) => {
      setIsIntersecting((value.value > BigBoxX) && (value.value < BigBoxX + BigBoxWidth));
    });
    return () => {
      moveanimref.removeAllListeners();
    };
  }, [BigBoxX,BigBoxWidth]);
  useEffect(() => {
    moveanim.start();
    return () => {
    };
  }, []);
  return (
    !Pause && <TouchableOpacity activeOpacity={1} style={styles.container}
      onPressIn={()=>{
        if(!IsIntersecting){
          setLives(Lives - 1);
        }
      }}
    >
      <View style={styles.upperrighthud}>
        <View style={styles.lives}>
          <Icon name={"close"} size={40} color={(Lives >= 1) ? '#FF000046' : 'red'}></Icon>
          <Icon name={"close"} size={40} color={(Lives >= 2) ? '#FF000046' : 'red'}></Icon>
          <Icon name={"close"} size={40} color={(Lives >= 3) ? '#FF000046' : 'red'}></Icon>
        </View>
        <Doublescorehud on={DoubleScore}/>
      </View>
      <Coinshud style={styles.coinscontainer} coins={3000} textcolor={colors.text}/>
      <View style={styles.boxescontainer}>
        <Animated.View 
          style={[styles.smallboxmovecontainer,
            {
              transform: [
                {
                  translateX: moveanimref
                }
              ]
            }
          ]}
        >
          <Box btcolor={colors.text} style={styles.smallbox} color={'blue'}/>
        </Animated.View>
        <Box btcolor={colors.text} style={styles.bigbox} color={'red'} onLayout={(event:LayoutChangeEvent)=>{
          setBigBoxX(event.nativeEvent.layout.x);
          setBigBoxWidth(event.nativeEvent.layout.width);
        }}/>
      </View>
      <Button title='start move' onPress={()=>{
      }}/>
    </TouchableOpacity>
  );
};

const GamesceneStyle = (colors:any,width:Number) => StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'stretch'
  },
  lives:{
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginBottom: 10
  },
  upperrighthud:{
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  coinscontainer:{
    position: 'absolute',
    top: 60,
    left: 10
  },
  smallbox:{
    width: (35 * width) / 411 ,
    height: (35 * width) / 411 ,
  },
  bigbox:{
    width: (50 * width) / 411 ,
    height: (50 * width) / 411 ,
  },
  smallboxmovecontainer:{
    position: 'absolute',
    left: 0,
    zIndex: 1
  },
  boxescontainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  }
});