import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styling } from '../common/Styling'
import { colors } from '../common/Colors'
import { deviceHeight, deviceWidth } from '../common/Dimens'
import { Fonts } from '../common/Fonts'
import { Images } from '../common/Images'
import Button from '../common/Button'
import { useNavigation } from '@react-navigation/native'

const Editprofile = () => {
    const navigation = useNavigation()
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styling.container}>
                <TouchableOpacity onPress={(() => navigation.navigate('BookingHistoryTwo'))} style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <Image source={Images.back}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('editname')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20 }}>
                    <View>
                        <Text style={styling.textsub1}>Name</Text>
                        <Text style={styling.textfield1}>Karthick</Text>
                    </View>
                    <Image source={Images.arrow} />
                </TouchableOpacity>
                <Image style={{ width: deviceWidth(99), height: deviceHeight(0.2), alignSelf: 'center' }} source={Images.lineGap} />
                <View style={{ margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('editmobile')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <View>
                            <Text style={styling.textsub1}>Mobile number</Text>
                            <Text style={styling.textfield1}>+91 2387473498</Text>
                        </View>
                        <Image source={Images.arrow} />
                    </TouchableOpacity>
                    <Image style={{ width: deviceWidth(90), height: deviceHeight(0.2), alignSelf: 'center', marginTop: deviceHeight(3), marginBottom: deviceHeight(3) }} source={Images.lineGap} />
                    <TouchableOpacity onPress={() => navigation.navigate('editemail')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <View>
                            <Text style={styling.textsub1}>Email Address</Text>
                            <Text style={styling.textfield1}>No Email Address</Text>
                        </View>
                        <Image source={Images.arrow} />
                    </TouchableOpacity>
                    <Image style={{ width: deviceWidth(90), height: deviceHeight(0.2), alignSelf: 'center', marginTop: deviceHeight(3), marginBottom: deviceHeight(3) }} source={Images.lineGap} />
                    <TouchableOpacity onPress={() => navigation.navigate('favorites')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <View>
                            <Text style={styling.textfield1}>Favorite locations</Text>
                            <Text style={styling.textsub1}>Get to your favourite destination more quickly</Text>
                        </View>
                        <Image source={Images.arrow} />
                    </TouchableOpacity>
                    <Image style={{ width: deviceWidth(90), height: deviceHeight(0.2), alignSelf: 'center', marginTop: deviceHeight(3), marginBottom: deviceHeight(3) }} source={Images.lineGap} />
                    <TouchableOpacity onPress={() => navigation.navigate('emergency')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <View>
                            <Text style={styling.textfield1}>Emergency Contacts</Text>
                            <Text style={styling.textsub1}>You can add up to 3 people</Text>
                        </View>
                        <Image source={Images.arrow} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('delete')} style={{ backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.field, padding: 15, marginTop: 20 }}>
                    <View>
                        <Text style={styling.textfield1}>Delete Account</Text>
                        <Text style={styling.textsub1}>This action cannot be undone.</Text>
                    </View>
                    <Image source={Images.arrow} />
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Editprofile

const styles = StyleSheet.create({})