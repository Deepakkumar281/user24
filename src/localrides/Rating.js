import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    ToastAndroid,
    ImageBackground,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { styling } from '../common/Styling';
import { Images } from '../common/Images';
import { deviceHeight, deviceWidth } from '../common/Dimens';
import Button from '../common/Button';
import { Fonts } from '../common/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { colors } from '../common/Colors';
import Line from '../common/Line';

const Rating = ({ navigation, route }) => {
    return (
        <View style={[styling.container, { padding: 20 }]}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('cancelstill')}>
                    <Image source={Images.back}></Image>
                </TouchableOpacity>
                <Text style={styling.texthead}>Payment</Text>
                <View></View>
            </View>
            <Image style={{ width: deviceWidth(50), height: deviceWidth(50), alignSelf: 'center', marginTop: 20 }} source={require('../../assets/images/Tick.png')}></Image>
            <Text style={{ fontFamily: Fonts.ibmbold, fontSize: deviceHeight(6), textAlign: 'center' }}>₹169</Text>
            <Text style={{ fontFamily: Fonts.ibmbold, fontSize: deviceHeight(3), textAlign: 'center' }}>Payment Successful</Text>
            <Text style={[styling.textsub1, { textAlign: 'center' }]}>Your payment was successful and kindly update your valuable feedback of the Ride!</Text>
            <View
                style={[
                    styling.field1,
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        marginTop: 10
                    },
                ]}>
                <TextInput
                    style={styling.textfield1}
                    placeholder="Booking ID"
                    placeholderTextColor={'#6B768A'}
                    editable={false}
                />
                <Text style={[styling.textfield1]}>mb23102s7gbyk</Text>
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    top: deviceHeight(5),
                    rowGap: 20,
                }}>
                <View style={{ position: 'absolute', zIndex: 1, right: 10, top: 20 }}>
                    <Image style={{ width: deviceWidth(20), height: deviceWidth(20), alignSelf: 'center' }} source={require('../../assets/images/Profile.png')}></Image>
                </View>
                <TouchableOpacity
                    style={[styling.field1, styles.destinationInput]}>
                    <Image source={Images.greendot} />
                    <TextInput
                        style={styling.textfield1}
                        placeholder="Enter Pickup Location"
                        placeholderTextColor={'#6B768A'}

                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styling.field1, styles.destinationInput]}>
                    <Image source={Images.reddot} />
                    <TextInput
                        placeholder="Select Destination"
                        placeholderTextColor={'#6B768A'}
                        style={styling.textfield1}

                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginHorizontal: 20 }}
                    onPress={() => navigation.navigate('Completed')}>
                    <Button text={'Ratings'}></Button>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Rating;

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
    },
});
