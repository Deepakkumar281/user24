import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {deviceWidth} from './Dimens';
import {colors} from './Colors';

const Line = () => {
  return (
    <View>
      <View
        style={{
          borderTopWidth: 1,
          width: deviceWidth(100),
          marginHorizontal: -20,
          borderColor: colors.border,
        }}></View>
    </View>
  );
};

export default Line;

const styles = StyleSheet.create({});
