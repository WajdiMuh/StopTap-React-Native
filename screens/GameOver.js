// @flow
import React from 'react';
import type {Node} from 'react';
import { useContext } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Button,
  useWindowDimensions
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { Devimg } from '../components/Devimg';
import { StopTapButton } from '../components/StopTapButton';
import { Devname } from '../components/Devname';
import { strings } from '../translations/languages';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
export const GameOver: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = GameOverStyle(colors);
  const { height, width } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
        <ConfettiCannon style={styles.confetti} count={300} origin={{x: width / 2, y: -20}} fallSpeed={1500} explosionSpeed={300} colors={['red','blue']} fadeOut={true}/>
        <View style={styles.uppercontainer}>
            <Text style={styles.score}>{strings.gameover.score}</Text>
            <Text style={styles.gameover}>{strings.gameover.gameover}</Text>
        </View>
        <View style={styles.midcontainer}>
            <StopTapButton
                bgcolor={colors.background}
                btcolor={colors.text}
                onPress={()=> {navigation.pop();}}
                title={strings.gameover.playagain}
            />
            <StopTapButton
                bgcolor={colors.background}
                btcolor={colors.text}
                onPress={()=> {navigation.pop();}}
                title={strings.gameover.menu}
                style={styles.mainmenu}
            />
            <StopTapButton
                bgcolor={colors.background}
                btcolor={colors.text}
                onPress={()=> {navigation.pop();}}
                title={strings.gameover.leaderboard}
            />
        </View>
        <Text style={styles.highscore}>{strings.gameover.highscore}</Text>
    </SafeAreaView>
  );
};

const GameOverStyle = (colors:any) => StyleSheet.create({
  container:{
    flex: 1
  },
  uppercontainer:{
    alignItems:'center',
    marginTop: 10
  },
  midcontainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  highscore:{
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'DotsAllForNowJL',
    color: colors.text,
    fontSize: 20
  },
  score:{
    fontFamily: 'DotsAllForNowJL',
    color: colors.text,
    fontSize: 20,
  },
  gameover:{
    fontFamily: 'DotsAllForNowJL',
    color: colors.text,
    fontSize: 20,
    marginTop: 10
  },
  mainmenu:{
    marginTop: 10,
    marginBottom: 10
  },
  confetti:{
    zIndex: -1
  }
});