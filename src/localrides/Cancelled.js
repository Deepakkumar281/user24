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

const Cancelled = ({ navigation, route }) => {
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
                <Text style={styling.texthead}>Cancelled</Text>
                <View></View>
            </View>

            <KeyboardAwareScrollView
                contentContainerStyle={{
                    top: deviceHeight(5),
                    rowGap: 20,
                }}>
                <View
                    style={[
                        styling.field1,
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
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

                <View
                    style={[
                        styling.field1,
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                        },
                    ]}>
                    <TextInput
                        style={styling.textfield1}
                        placeholder="payment"
                        editable={false}
                        placeholderTextColor={'#6B768A'}
                    />
                    <Text style={[styling.textfield1]}>Cash</Text>
                </View>
                <View
                    style={[
                        styling.field1,
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                        },
                    ]}>
                    <TextInput
                        style={styling.textfield1}
                        placeholder="Reason"
                        placeholderTextColor={'#6B768A'}
                        editable={false}
                    />
                    <Text style={[styling.textfield1]}>Expected a shorter wait time</Text>
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
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Cancelled;

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
    },
});
