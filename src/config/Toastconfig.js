import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {

    success: ({ text1 }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text style={{color:'black'}}>{text1}</Text>
            
        </View>
    ),
    error: (text1) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text style={{color:'black'}}>{text1}</Text>
            
        </View>
    ),
}