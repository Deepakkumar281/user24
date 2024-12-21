import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {styling} from '../common/Styling';
import {Images} from '../common/Images';
import {deviceHeight, deviceWidth} from '../common/Dimens';
import Buttondim from '../common/Buttondim';
import {Fonts} from '../common/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import configuration from '../Api/apiconfig';
const Register = ({navigation}) => {
  const [Phonenumber, setPhonenumber] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhoneNumber = number => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };
  const handleNextPress = async () => {
    if (!validatePhoneNumber(Phonenumber)) {
      if (!validatePhoneNumber(Phonenumber)) {
        ToastAndroid.show(
          'Please enter a valid 10-digit phone number.',
          ToastAndroid.SHORT,
        );
        return;
      }
    }
    try {
      setLoading(true);
      console.log(configuration.OTP, 'dkmdlkmdkl');
      const response = await axios.post(configuration.OTP, {
        mobileNumber: Phonenumber,
        referralCode: '',
      });
      console.log(response.data, '=============>>>>>');
      if (response.data.status == true) {
        console.log('trueeeeeeee');
        navigation.navigate('otp', {phone: Phonenumber});
      } else {
        ToastAndroid.show(
          response.data.message || 'Failed to send OTP',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        'Something went wrong. Please try again later.',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/images/LoginScreen.png')}
      style={[styling.container, {padding: 20}]}>
      <TouchableOpacity onPress={() => navigation.navigate('intro1')}>
        <Image source={Images.back}></Image>
      </TouchableOpacity>
      <KeyboardAwareScrollView
        contentContainerStyle={{paddingTop: deviceHeight(50), rowGap: 20}}>
        <Text style={styling.texthead}>Mobile Number</Text>
        <Text style={styling.textsub}>
          We'll send you a OTP for verification to ensure the security of your
          account.
        </Text>
        <View
          style={[
            styling.field1,
            {
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 5,
              paddingHorizontal: 20,
            },
          ]}>
          <Image source={require('../../assets/images/Ellipse9.png')}></Image>
          <Text
            style={{
              color: 'black',
              fontFamily: Fonts.ibmmedium,
              fontSize: deviceHeight(2),
            }}>
            +91
          </Text>
          <TextInput
            placeholder="Your Mobile Number"
            placeholderTextColor={'#6B768A'}
            style={styling.textfield1}
            keyboardType="phone-pad"
            maxLength={10}
            value={Phonenumber}
            onChangeText={text => setPhonenumber(text)}></TextInput>
        </View>
        <TouchableOpacity onPress={() => handleNextPress()} disabled={loading}>
          <Buttondim text={loading ? 'Loading...' : 'Send OTP'}></Buttondim>
        </TouchableOpacity>
        <View>
          <Text style={[styling.textsub, {textAlign: 'center'}]}>
            By continuing, you agree that you have read
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={[styling.textsub1, {}]}>and accept our</Text>
            <Text
              style={{
                color: '#0883FE',
                fontFamily: Fonts.ibmsemibold,
                fontSize: deviceHeight(1.6),
                textDecorationLine: 'underline',
              }}>
              Terms and Policy
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({});
