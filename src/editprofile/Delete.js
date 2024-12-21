import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    ToastAndroid,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { styling } from '../common/Styling';
import { Images } from '../common/Images';
import { deviceHeight, deviceWidth } from '../common/Dimens';
import Button from '../common/Button';
import { Fonts } from '../common/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Line from '../common/Line';

const Delete = ({ navigation, route }) => {
    const Phonenumber = '';
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);


    return (
        <View style={[styling.container, { padding: 20 }]}>
            <TouchableOpacity onPress={() => navigation.navigate('editprofile')}>
                <Image source={Images.back}></Image>
            </TouchableOpacity>
            <KeyboardAwareScrollView
                contentContainerStyle={{ top: deviceHeight(5), rowGap: 20 }}>
                <Text style={styling.texthead}>Delete your Account</Text>
                <View>
                    <Text style={styling.textsub}>
                        Sorry to see you go</Text>
                </View>

            </KeyboardAwareScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 20,
                    flex: 1,
                    width: deviceWidth(90),
                    left: deviceWidth(5),
                    rowGap: 10,
                }}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('verifyotp')}
                    disabled={loading}>
                    <Button text={'Continue'}></Button>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Delete;

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
    },
});
