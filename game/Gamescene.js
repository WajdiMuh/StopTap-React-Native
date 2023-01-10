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
  LayoutChangeEvent,
  InteractionManager
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Direction } from './Directionenum';
import { LifeLost } from '../components/LifeLost';
//TODO fix game restart since focus is not called after restart
export const Gamescene: () => Node = (props) => {  
  const { colors } = useTheme();
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const screenusablewidth:Number = (width - insets.left - insets.right);
  const BigBoxWidth = (50 * width) / 411;
  const SmallBoxWidth = (35 * width) / 411;
  const styles = GamesceneStyle(colors,BigBoxWidth,SmallBoxWidth);
  const maxX = screenusablewidth - SmallBoxWidth;
  const {pause,restart} = useContext(pausecontext);
  const [Pause, setPause] = pause;
  const [Lives, setLives] = useState(3);
  const [Score, setScore] = useState(0);
  const [DoubleScore, setDoubleScore] = useState(false);
  const [BigBoxX, setBigBoxX] = useState(0);
  const [SmallBoxX, setSmallBoxX] = useState(0);
  const [LifeLostX, setLifeLostX] = useState(0);
  const [IsIntersecting, setIsIntersecting] = useState(false);
  const [DirectionState, setDirectionState] = useState(Direction.Right);
  const [Duration,setDuration] = useState(576);
  const [LastGeneratedDuration,setLastGeneratedDuration] = useState(576);
  const moveanimref = useRef(new Animated.Value(0)).current;
  const firstrender = useRef(true);
  const [Restart, setRestart] = restart;
  const leftanim = Animated.timing(moveanimref, {
      toValue: 0,
      duration: Duration,
      useNativeDriver: true
    });
  const rightanim = Animated.timing(moveanimref, {
    toValue: maxX,
    duration: Duration,
    useNativeDriver: true
  });
  function rightanimend({finished}){
    if (!finished) return;
    generaterandomduration();
    setDirectionState(Direction.Left);
  }
  function leftanimend({finished}){
    if (!finished) return;
    generaterandomduration();
    setDirectionState(Direction.Right);
    }
  function generaterandomduration(){
    switch(Math.floor(Math.random() * 3)){
      case 0:
        setDuration(288);
        setLastGeneratedDuration(288);
        break;
      case 1:
        setDuration(576);
        setLastGeneratedDuration(576);
        break;
      case 2:
        setDuration(864);
        setLastGeneratedDuration(864);
        break;
      default:
        setDuration(576);
        setLastGeneratedDuration(576);
        break;
    }
  }
  useEffect(() => {
    if(!moveanimref.hasListeners()){
      moveanimref.addListener((value) => {
        setSmallBoxX(value.value);
        setIsIntersecting((value.value > (BigBoxX - SmallBoxWidth)) && (value.value < (BigBoxX + BigBoxWidth)));
      });
    }
    return () => {
      moveanimref.removeAllListeners();
    };
  }, [BigBoxX]);
  useEffect(() => {
    if(!firstrender.current){
      console.log('hey');
      if(DirectionState == Direction.Left){
        leftanim.start(leftanimend);
      }else{
        rightanim.start(rightanimend);
      }
    }
  }, [DirectionState]);
  useEffect(() => {
    if(Pause){
      moveanimref.stopAnimation(currentx => {
        if(DirectionState == Direction.Left){
          setDuration(currentx * LastGeneratedDuration / maxX);
        }else{
          setDuration((maxX - currentx) * LastGeneratedDuration / maxX);
        }
      });
    }else if(!firstrender.current){
      if(DirectionState == Direction.Left){
        leftanim.start(leftanimend);
      }else{
        rightanim.start(rightanimend);
      }
    }
  }, [Pause]);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', (e) => {
      InteractionManager.runAfterInteractions(() => {
        if(!firstrender.current){
          setRestart(true);
        }
        firstrender.current = false;
        rightanim.start(rightanimend);
      });
    });
    return unsubscribe;
  }, [props.navigation]);
  return (
    !Pause && <TouchableOpacity activeOpacity={1} style={styles.container}
      onPressIn={()=>{
        if(!IsIntersecting){
          if(Lives <= 0){
            props.navigation.navigate('GameOver',{score: Score});
          }else{
            setLifeLostX(moveanimref);
            setLives(Lives - 1);
          }
        }else{
          setScore(Score + 1);
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
        <LifeLost style={styles.lifelost} x={LifeLostX} size={SmallBoxWidth} on={Lives}></LifeLost>
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
        }}/>
      </View>
      <Text style={styles.score}>
        Score : {Score}
      </Text>
    </TouchableOpacity>
  );
};

const GamesceneStyle = (colors:any,bigboxsize:Number,smallboxsize:Number) => StyleSheet.create({
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
    width: smallboxsize ,
    height: smallboxsize ,
  },
  bigbox:{
    width: bigboxsize ,
    height: bigboxsize ,
  },
  smallboxmovecontainer:{
    position: 'absolute',
    left: 0,
    zIndex: 2
  },
  boxescontainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  score:{
    position: 'absolute',
    bottom: 10,
    color: colors.text,
    fontFamily: 'DotsAllForNowJL',
    fontSize: 24
  },
  lifelost:{
    position: 'absolute',
    left: 0,
    zIndex: 1
  },
});