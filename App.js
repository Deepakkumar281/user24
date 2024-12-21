import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Stacknav from './src/tabs/Stacknav';
import {styling} from './src/common/Styling';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/config/Toastconfig';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <View style={styling.container}>
        <NavigationContainer style={styling.container}>
          <Stacknav></Stacknav>
        </NavigationContainer>
        <Toast toastConfig={toastConfig} />
      </View>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
