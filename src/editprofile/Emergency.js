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

const Emergency = ({ navigation, route }) => {
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
                <Text style={styling.texthead}>Emergency Contact</Text>
                <View>
                    <Text style={styling.textsub}>
                        You can add up to 3 people.</Text>
                </View>
                <TouchableOpacity

                    style={[styling.field1, styles.destinationInput]}>
                    <Image source={Images.reddot} />
                    <TextInput
                        placeholder="Search contact"
                        placeholderTextColor={'#6B768A'}
                        style={styling.textfield1}

                    />
                </TouchableOpacity>
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
                    onPress={() => navigation.navigate('editlocation')}
                    disabled={loading}>
                    <Button text={'Add contact'}></Button>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Emergency;

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
    },
});
