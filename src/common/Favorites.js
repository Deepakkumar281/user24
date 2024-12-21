import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { deviceWidth } from './Dimens'
import { styling } from './Styling'
import { colors } from './Colors'

const Favorites = ({ image1, image2, text, flex }) => {
    return (

        <View style={{ flex: flex && 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.field, padding: 10, borderRadius: 5 }}>
            <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: deviceWidth(6), height: deviceWidth(6) }} source={image1}></Image>
                <Text style={styling.textfield1}>{text}</Text>
            </View>
            {image2 && <Image source={image2}></Image>}
        </View>

    )
}

export default Favorites

const styles = StyleSheet.create({})