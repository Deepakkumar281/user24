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
import { colors } from '../common/Colors';

const Favorites = ({ navigation, route }) => {
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
                <Text style={styling.texthead}>Your Favorite Locations</Text>
                <View>
                    <Text style={styling.textsub}>
                        Get to your favorite destination more quickly</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('editlocation')} style={{ borderRadius: 10, borderColor: colors.border, borderWidth: 1, padding: 10 }}>
                    <View style={{ alignItems: 'center', columnGap: 10, flexDirection: 'row' }}>
                        <Image style={{ width: deviceWidth(5), height: deviceWidth(5) }} source={Images.home}></Image>
                        <Text style={styling.textfield1}>Home</Text>
                    </View>
                    <Text style={styling.textsub1}>V3P4+MWQ, Madurai, Tamil Nadu 625006...</Text>
                </TouchableOpacity>
                <View style={{ borderRadius: 10, borderColor: colors.border, borderWidth: 1, padding: 10 }}>
                    <View style={{ alignItems: 'center', columnGap: 10, flexDirection: 'row' }}>
                        <Image style={{ width: deviceWidth(5), height: deviceWidth(5) }} source={Images.work}></Image>
                        <Text style={styling.textfield1}>Work</Text>
                    </View>
                    <Text style={styling.textsub1}>V3P4+MWQ, Madurai, Tamil Nadu 625006...</Text>
                </View>
                <View style={{ borderRadius: 10, borderColor: colors.border, borderWidth: 1, padding: 10 }}>
                    <View style={{ alignItems: 'center', columnGap: 10, flexDirection: 'row' }}>
                        <Image style={{ width: deviceWidth(5), height: deviceWidth(5) }} source={Images.fav}></Image>
                        <Text style={styling.textfield1}>Others</Text>
                    </View>
                    <Text style={styling.textsub1}>V3P4+MWQ, Madurai, Tamil Nadu 625006...</Text>
                </View>
                <View style={{ borderRadius: 10, borderColor: colors.border, borderWidth: 1, padding: 10 }}>
                    <View style={{ alignItems: 'center', columnGap: 10, flexDirection: 'row' }}>
                        <Image style={{ width: deviceWidth(5), height: deviceWidth(5) }} source={Images.fav}></Image>
                        <Text style={styling.textfield1}>Others</Text>
                    </View>
                    <Text style={styling.textsub1}>V3P4+MWQ, Madurai, Tamil Nadu 625006...</Text>
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
                    onPress={() => navigation.navigate('addfavorites')}
                    disabled={loading}>
                    <Button text={'Add Favorites'}></Button>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Favorites;

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
    },
});
