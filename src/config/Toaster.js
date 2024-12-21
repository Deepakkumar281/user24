import Toast from 'react-native-toast-message';
import { Button } from 'react-native'

export const Toaster = (type,text)=> {
    Toast.show({
      type: type,
      text1: text,
    });
}