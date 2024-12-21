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

const Editname = ({ navigation, route }) => {
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
                <Text style={styling.texthead}>Update Name</Text>
                <View>
                    <Text style={styling.textsub}>
                        This name will be shown to the driver during ride pickup.</Text>
                </View>

                <TouchableOpacity
                    style={[styling.field1, styles.destinationInput]}>
                    <TextInput
                        style={styling.textfield1}
                        placeholder="Enter name"
                        placeholderTextColor={'#6B768A'}
                    />
                </TouchableOpacity>
                <Text style={styling.textsub}>
                    Select your Gender</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', columnGap: 20 }}>
                        <Text style={styling.textfield1}>Male</Text>
                    </View>
                    <Image
                        style={{ width: deviceWidth(4), height: deviceWidth(4) }}
                        source={require('../../assets/images/Ellipse34.png')}></Image>
                </View>
                <Line></Line>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', columnGap: 20 }}>
                        <Text style={styling.textfield1}>Female</Text>
                    </View>
                    <Image
                        style={{ width: deviceWidth(4), height: deviceWidth(4) }}
                        source={require('../../assets/images/Select.png')}></Image>
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
                    onPress={() => navigation.navigate('home')}
                    disabled={loading}>
                    <Button text={'Update'}></Button>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Editname;

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
    },
});
