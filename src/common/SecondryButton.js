import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styling } from './Styling'
import { Fonts } from './Fonts'
import { colors } from './Colors'

const SecondryButton = ({ text }) => {
    return (
        <View style={{ backgroundColor: '#E7EAF0', borderRadius: 25 }}>
            <Text style={{ color: colors.black, textAlign: 'center', padding: 15, fontFamily: Fonts.ibmmedium }}>{text}</Text>
        </View>
    )
}

export default SecondryButton

const styles = StyleSheet.create({})