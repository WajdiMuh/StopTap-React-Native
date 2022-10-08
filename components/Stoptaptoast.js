import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import {
  Text,
  View,
} from 'react-native';
export const toastConfig = {
    stoptaptoast: ({ text1, props }) => (
      <View style={{  backgroundColor: props.bgcolor, borderWidth: 6,borderColor: props.bgcolor ,borderRadius: 5}}>
        <Text style={{color: props.textcolor, textAlign:'center', fontFamily: 'DotsAllForNowJL', fontSize: 18, padding: 8}}>{text1}</Text>
      </View>
    )
  };

export default {
    toastConfig,
}