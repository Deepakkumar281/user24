import { StyleSheet, Image, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styling } from '../common/Styling';
import { deviceHeight, deviceWidth } from '../common/Dimens';

const Splash = ({ navigation }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          navigation.replace('intro1')
        }, 1000)
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{flex:1}}>
      <StatusBar hidden={true}></StatusBar>
    
        <Image resizeMode='stretch' style={styles.imb} source={require('../../assets/images/Logo.png')} />
      
      {/* <View style={{top:deviceHeight(33)}}>
        <Image resizeMode="contain" style={styles.imb1} source={require('../../assets/images/City.png')} />
      </View> */}
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  imb: {
    width: deviceWidth(100),
    height:deviceHeight(100)
  },
  imb1: {
    width: deviceWidth(100),
  },
})