import React, { useRef, useEffect, useState,createContext,useContext } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    TextInput
} from 'react-native';
import { StopTapButton } from './StopTapButton';
import { strings } from '../translations/languages';
export const UserNameModalVisiblity = createContext();
export const UsernameModal: () => Node = (props) => {
  const {UserNameModalVisible, setUserNameModalVisible} = useContext(UserNameModalVisiblity);
  const [Username, setUsername] = useState('');
  const colors = props.colors;
  const dimcolor = props.colors.text.replace(')', ', 0.5)').replace('rgb', 'rgba');;
  const styles = UsernameModalStyle(colors,dimcolor);
  return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={UserNameModalVisible}
          onRequestClose={() => {
              setUserNameModalVisible(false);
          }}
          supportedOrientations={['landscape']}
      >
          <View style={styles.container}>
              <View style={styles.modal}>
                  <Text style={styles.info}>Please choose a username</Text>
                  <TextInput
                    multiline={false}
                    editable
                    maxLength={16}
                    value={Username}
                    onChangeText={text => {
                      setUsername(text);
                    }}
                    style={styles.input}
                    placeholder={"Username"}
                    autoComplete={"off"}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    placeholderTextColor={"#727272"}
                    selectionColor={colors.text}
                  />
                  <View style={styles.buttonscontainer}>
                    {(Username != '')  
                    ?
                    <>
                    <StopTapButton
                      bgcolor={colors.background}
                      btcolor={colors.text}
                      style={styles.button}
                      onPress={()=> {
                        setUserNameModalVisible(false);
                      }}
                      title={"Cancel"}
                    />
                    <View style={styles.spacer}/>
                    <StopTapButton
                      bgcolor={colors.background}
                      btcolor={colors.text}
                      style={styles.button}
                      onPress={()=> {
                        setUserNameModalVisible(false);
                        props.callback(Username);
                      }}
                      title={"Set"}
                    />
                    </>
                    :
                    <>
                    <View style={styles.spacerfill}/>
                    <StopTapButton
                      bgcolor={colors.background}
                      btcolor={colors.text}
                      style={styles.cancelemptyinput}
                      onPress={()=> {
                        setUserNameModalVisible(false);
                      }}
                      title={"Cancel"}
                    />
                    <View style={styles.spacerfill}/>
                    </>
                    }
                  </View>
              </View>
          </View>
      </Modal>
  );
  }

  const UsernameModalStyle = (colors:any,dimcolor: any) => StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: dimcolor
    },
    modal:{
      width: '50%',
      backgroundColor: colors.background,
      borderColor: colors.text,
      borderRadius: 14,
      borderWidth: 6,
      padding: 35,
      alignItems: 'stretch',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonscontainer:{
      flexDirection: 'row',
    },
    button:{
     flex: 1
    },
    info:{
      fontSize: 16,
      color: colors.text,
      fontFamily: 'DotsAllForNowJL',
      marginBottom: 14,
    },
    input:{
      borderWidth: 2,
      borderRadius: 4,
      borderColor: colors.text,
      marginBottom: 14,
      height: 30,
      color: colors.text,
      paddingHorizontal: 6,
      fontFamily: 'DotsAllForNowJL',
    },
    spacer:{
      width:10,
    },
    spacerfill:{
      flex: 1,
    },
    cancelemptyinput:
    {
      flex: 2
    }
  });