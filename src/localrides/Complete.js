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

const Complete = ({ navigation, route }) => {
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
                <Text style={styling.texthead}>Complete</Text>
                <View></View>
            </View>
            <Image style={{ width: deviceWidth(50), height: deviceWidth(50), alignSelf: 'center', marginTop: 20 }} source={require('../../assets/images/Tick.png')}></Image>
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
                <View
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderColor: colors.border,
                        borderRadius: 10,
                        rowGap: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styling.textfield1}>Total Fare</Text>
                        <Text style={styling.textfield1}>₹159</Text>
                    </View>
                    <Text style={styling.textsub1}>Including taxes</Text>
                    <Line></Line>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styling.textfield2}>Base Fare</Text>
                        <Text style={styling.textfield1}>₹159</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styling.textfield2}>Rate per km</Text>
                        <Text style={styling.textfield1}>₹19</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styling.textfield2}>Ride time charge per min</Text>
                        <Text style={styling.textfield1}>₹9</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styling.textfield2}>Waiting fee per min</Text>
                        <Text style={styling.textfield1}>₹1</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ marginHorizontal: 20 }}
                    onPress={() => navigation.navigate('rating')}>
                    <Button text={'Payment'}></Button>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Complete;

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
    },
});
