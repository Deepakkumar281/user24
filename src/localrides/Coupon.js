import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {styling} from '../common/Styling';
import {Images} from '../common/Images';
import {deviceHeight, deviceWidth} from '../common/Dimens';
import Button from '../common/Button';
import {Fonts} from '../common/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {colors} from '../common/Colors';

const Coupon = ({navigation, route}) => {
  return (
    <View style={[styling.container, {padding: 20}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('review')}>
          <Image source={Images.back}></Image>
        </TouchableOpacity>
        <Text style={styling.texthead}>Apply Coupon</Text>
        <View></View>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          top: deviceHeight(5),
          rowGap: 20,
        }}>
        <View
          style={[
            styling.field1,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            },
          ]}>
          <TextInput
            style={styling.textfield1}
            placeholder="Enter Coupon Code"
            placeholderTextColor={'#6B768A'}
          />
          <Text style={[styling.textfield1]}>Apply</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ImageBackground
            style={{
              height: deviceHeight(18),
              width: deviceWidth(10),
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={require('../../assets/images/Subtract.png')}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                transform: [{rotate: '360deg'}],
              }}>
              30% OFF
            </Text>
          </ImageBackground>
          <View
            style={{
              backgroundColor: '#F7F9FB',
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}>
              <View>
                <Text style={styling.texthead}>TRYFIRSTRIDE</Text>
                <Text style={styling.textgreen}>Save ₹75 on this Ride!</Text>
              </View>
              <Text style={styling.textblue}>Apply</Text>
            </View>
            <View style={{padding: 10}}>
              <Text style={styling.textsub1}>
                Use code TRYNEWRIDE & get 30% off on first booking ride.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({});
