import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styling } from './Styling'
import { Fonts } from './Fonts'

const Buttondim = ({text}) => {
  return (
    <View style={{backgroundColor:'#DFE4EA',borderRadius:25}}>
      <Text style={{color:'#6B768A',textAlign:'center',padding:15,fontFamily:Fonts.ibmbold}}>{text}</Text>
    </View>
  )
}

export default Buttondim

const styles = StyleSheet.create({})