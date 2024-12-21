import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styling } from '../common/Styling'
import { Images } from '../common/Images'
import { Fonts } from '../common/Fonts'
import { deviceHeight, deviceWidth } from '../common/Dimens'
import { colors } from '../common/Colors'
import SecondryButton from '../common/SecondryButton'
import Button from '../common/Button'
import Line from '../common/Line'
import Buttondim from '../common/Buttondim'

const Completed = ({ navigation }) => {
    return (
        <View style={[styling.container, { padding: 20 }]}>
            <View style={{ rowGap: 10 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity onPress={() => navigation.navigate('rating')}>
                        <Image source={Images.back}></Image>
                    </TouchableOpacity>
                    <Text style={styling.texthead}>Completed</Text>
                    <View></View>
                </View>
                <View style={{ position: 'absolute', zIndex: 1, right: 30, top: 40 }}>
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
            </View>
            <View style={{ backgroundColor: colors.field, width: deviceWidth(90), height: deviceHeight(5), alignSelf: 'center', margin: 10, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.text, fontFamily: Fonts.ibmmedium }}>Booking ID</Text>
                <Text style={{ color: colors.black, fontFamily: Fonts.ibmmedium, marginLeft: deviceWidth(35) }}>mb23102s7gbyk</Text>
            </View>
            <View
                style={{
                    borderWidth: 1,
                    padding: 10,
                    borderColor: colors.border,
                    borderRadius: 10,
                    rowGap: 10,
                    marginBottom: 20
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
            <Line></Line>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: colors.black, fontSize: 18, fontFamily: Fonts.ibmmedium }}>Ratings</Text>
                <Image resizeMode='contain' source={Images.star} style={{ width: deviceWidth(30), height: deviceWidth(30) }} />
            </View>

            <TouchableOpacity style={{ width: deviceHeight(40), alignSelf: 'center', marginBottom: deviceHeight(5) }} >
                <Buttondim text={'Download Invoice'} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: deviceHeight(40), alignSelf: 'center', marginBottom: deviceHeight(5) }} >
                <Button text={'Submit'} />
            </TouchableOpacity>
        </View>
    )
}

export default Completed

const styles = StyleSheet.create({
    destinationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,

    },
})