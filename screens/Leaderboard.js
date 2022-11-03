// @flow
import React from 'react';
import {Node, useState,useContext,useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import { MainMenuTitle } from '../components/MainMenuTitle';
import { strings,langcontext   } from '../translations/languages';
import { StopTapButton } from '../components/StopTapButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import API from '../API/API';
import Icon from 'react-native-vector-icons/FontAwesome';
export const Leaderboard: () => Node = ({ navigation }) => {  
  const { colors } = useTheme();
  const styles = LeaderboardStyle(colors);
  const [Leaderboarddata, setLeaderboarddata] = useState([]);
  const [Userrank, setUserrank] = useState();
  useEffect(() => {
    async function fetchData() {
      await API.getleaderboard()
      .then((response) => response.json())
      .then((json) => {
        var leaderboarddata = [];
        if(json["better_ranks"]["data"].length >= 5){
          leaderboarddata.push({"rank":"","name":"","value":""});
        }
        json["better_ranks"]["data"].forEach(data => {
          leaderboarddata.push(data);
        });
        leaderboarddata.push(json["user_rank"]);
        setUserrank(json["user_rank"]["rank"]);
        json["worse_ranks"]["data"].forEach(data => {
          leaderboarddata.push(data);
        });
        if(json["worse_ranks"]["data"].length >= 5){
          leaderboarddata.push({"rank":"","name":"","value":""});
        }
        setLeaderboarddata(leaderboarddata);
      })
      .catch((error) => {
          console.error(error);
      });
    }

    fetchData();
  },[]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.leaderboardtitle}>Leaderboard</Text>
      <View style={styles.itemcontainer}>
        <Text style={styles.rankscore}>Rank</Text>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.rankscore}>Score</Text>
      </View>
      <FlatList
          style={styles.ranklist}
          data={Leaderboarddata}
          renderItem={
              ({item}) => (
                (item.rank == "")
                ?
                <View style={styles.moreiconcontainer}>
                  <Icon name={"plus"} size={20} color={colors.text}></Icon> 
                </View>
                :
                <View style={[styles.itemcontainer,(item.rank == Userrank) && styles.currentrank]}>
                  <Text style={styles.rankscore}>{item.rank}</Text>
                  <Text style={styles.username}>{item.name}</Text>
                  <Text style={styles.rankscore}>{item.value}</Text>
                </View>
              )}
          keyExtractor={(item, index) => index}
      />
      <StopTapButton
        bgcolor={colors.background}
        btcolor={colors.text}
        onPress={()=> {navigation.pop()}}
        title={strings.general.back}
        style={styles.backbtn}
      />
    </SafeAreaView>
  );
};

const LeaderboardStyle = (colors:any) => StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center'
  },
  leaderboardtitle:{
    color: colors.text,
    fontFamily: 'DotsAllForNowJL',
    fontSize: 30,
    marginTop: 10,
  },
  ranklist:{
    alignSelf: 'stretch',
  },
  itemcontainer:{
    borderBottomColor: colors.text,
    borderBottomWidth:2,
    flexDirection: 'row',
  },
  rankscore:{
    textAlign:'center',
    paddingVertical:10,
    color: colors.text,
    fontFamily: 'DotsAllForNowJL',
    fontSize: 20,
    flex:1
  },
  username:{
    textAlign:'center',
    paddingVertical:10,
    color: colors.text,
    fontFamily: 'DotsAllForNowJL',
    fontSize: 20,
    flex:3,
  },
  currentrank:{
    backgroundColor: '#727272'
  },
  backbtn:{
    marginTop:10,
    marginBottom: 10
  },
  moreiconcontainer:{
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});