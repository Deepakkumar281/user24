import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styling } from './Styling'
import { Fonts } from './Fonts'

const Buttoncam = ({text}) => {
  return (
    <View style={{backgroundColor:'#DFE4EA',borderRadius:5}}>
      <Text style={{color:'black',textAlign:'center',fontFamily:Fonts.ibmbold ,padding:15,}}>{text}</Text>
    </View>
  )
}

export default Buttoncam

const styles = StyleSheet.create({})