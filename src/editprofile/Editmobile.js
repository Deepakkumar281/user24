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

const Editmobile = ({ navigation, route }) => {
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
                <Text style={styling.texthead}>Update Mobile Number</Text>
                <View>
                    <Text style={styling.textsub}>
                        If you change your given mobile number, you will receive a 4-digit code to update user account.</Text>
                </View>

                <View
                    style={[
                        styling.field1,
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            columnGap: 5,
                            paddingHorizontal: 20,
                        },
                    ]}>
                    <Image source={require('../../assets/images/Ellipse9.png')}></Image>
                    <Text
                        style={{
                            color: 'black',
                            fontFamily: Fonts.ibmmedium,
                            fontSize: deviceHeight(2),
                        }}>
                        +91
                    </Text>
                    <TextInput
                        placeholder="Your Mobile Number"
                        placeholderTextColor={'#6B768A'}
                        style={styling.textfield1}
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={Phonenumber}
                    ></TextInput>
                </View>
            </KeyboardAwareScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 20,
                    flex: 1,
                    width: deviceWidth(90),
                    left: deviceWidth(5),
                }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('verifyotp')}
                    disabled={loading}>
                    <Button text={'Send OTP'}></Button>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Editmobile;

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
    },
});
