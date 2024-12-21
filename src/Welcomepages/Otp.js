import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {styling} from '../common/Styling';
import {Images} from '../common/Images';
import {deviceHeight, deviceWidth} from '../common/Dimens';
import Button from '../common/Button';
import {Fonts} from '../common/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import configuration from '../Api/apiconfig';

const Otp = ({navigation, route}) => {
  const Phonenumber = route?.params?.phone;
  console.log('🚀 ~ Otp ~ Phonenumber:', Phonenumber);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);
  const validateOtp = () => {
    return otp.every(digit => digit !== '');
  };

  const handleVerifyOtp = async () => {
    if (!validateOtp()) {
      ToastAndroid.show(
        'Please enter a valid 4-digit OTP.',
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      setLoading(true);
      const fullOtp = otp.join('');

      const response = await axios.post(configuration.Enterotp, {
        mobileNumber: Phonenumber,
        otp: fullOtp,
      });
      console.log('🚀 ~ handleVerifyOtp ~ response:', response.data);

      if (response.data.status) {
        navigation.navigate('home');
      } else {
        ToastAndroid.show(
          response.data.message || 'OTP verification failed.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      ToastAndroid.show(
        response.data.message ||
          'Something went wrong. Please try again later.',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyPress = (index, key) => {
    if (key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
    }
  };

  return (
    <View style={[styling.container, {padding: 20}]}>
      <TouchableOpacity onPress={() => navigation.navigate('register')}>
        <Image source={Images.back}></Image>
      </TouchableOpacity>
      <KeyboardAwareScrollView
        contentContainerStyle={{top: deviceHeight(5), rowGap: 20}}>
        <Text style={styling.texthead}>Verify OTP</Text>
        <View>
          <Text style={styling.textsub}>
            Enter the 4-digit code sent to your Mobile
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styling.textsub}>Number </Text>
            <Text
              style={{
                color: '#6B768A',
                fontSize: deviceHeight(2),
                fontFamily: Fonts.ibmbold,
                lineHeight: 20,
              }}>
              {Phonenumber}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              style={[
                styling.field1,
                {
                  width: deviceWidth(20),
                  height: deviceHeight(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: deviceHeight(2.5),
                  color: 'black',
                },
              ]}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={value => handleOtpChange(index, value)}
              onKeyPress={({nativeEvent: {key}}) => handleKeyPress(index, key)}
            />
          ))}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              color: '#6B768A',
              fontSize: deviceHeight(1.8),
              fontFamily: Fonts.ibmbold,
              lineHeight: 20,
            }}>
            I don’t receive code{' '}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: '#0883FE',
                fontFamily: Fonts.ibmsemibold,
                fontSize: deviceHeight(1.8),
                textDecorationLine: 'underline',
                lineHeight: 20,
              }}>
              Click here
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          flex: 1,
          width: deviceWidth(90),
          left: deviceWidth(5),
        }}>
        <TouchableOpacity onPress={() => handleVerifyOtp()} disabled={loading}>
          <Button text={loading ? 'Verifying...' : 'Verify'}></Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({});
