import { StyleSheet, Image, View, StatusBar, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styling } from '../common/Styling';
import { deviceHeight, deviceWidth } from '../common/Dimens';
import { Fonts } from '../common/Fonts';
import Button from '../common/Button';
import { PermissionsAndroid, Platform } from 'react-native';

const Intro1 = ({ navigation }) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);


  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          setHasLocationPermission(true);
          navigation.navigate('register')
        } else if (permission === RESULTS.DENIED) {
          Alert.alert('Permission Denied', 'You need to grant location permission to continue.');
          setHasLocationPermission(false);
        } else if (permission === RESULTS.BLOCKED) {
          Alert.alert('Permission Blocked', 'Location permission is blocked. Please enable it in settings.');
          setHasLocationPermission(true);
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
    }
  };

  return (
    <View style={styling.container}>
      <View style={styles.imb1}>
        <StatusBar hidden={false}></StatusBar>
        <View style={{ rowGap: 10 }}>
          <Image resizeMode='contain' style={{ width: deviceWidth(60), height: deviceHeight(30) }} source={require('../../assets/images/Location.png')}></Image>
          <Text style={[styling.texthead, { textAlign: 'center' }]}>Allow Location Access</Text>
          <Text style={[styling.textsub1, { textAlign: 'center' }]}>Enable Location in your Device for better Experience. Turn on your Precise Location Permission.</Text>
        </View>
      </View>
      <TouchableOpacity style={{ bottom: 20, paddingHorizontal: 20 }} onPress={requestLocationPermission}>
        <Button text={'Enable Location'}></Button>
      </TouchableOpacity>
    </View>
  )
}

export default Intro1

const styles = StyleSheet.create({
  imb1: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    width: deviceWidth(100),
    padding: 20
  },
})