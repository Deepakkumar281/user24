import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styling } from './Styling'
import { Fonts } from './Fonts'

const Button = ({ text }) => {
  return (
    <View style={{ backgroundColor: '#070F2F', borderRadius: 25 }}>
      <Text style={{ color: 'white', textAlign: 'center', padding: 15, fontFamily: Fonts.ibmmedium }}>{text}</Text>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({})