import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
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
import Linedim from '../common/Linedim';
import Line from '../common/Line';

const RReviewbooking = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
        <Text style={styling.texthead}>Review Booking</Text>
        <View></View>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          top: deviceHeight(5),
          rowGap: 12,
        }}>
        <TouchableOpacity style={[styling.field1, styles.destinationInput]}>
          <Image source={Images.greendot} />
          <TextInput
            style={styling.textfield1}
            placeholder="Enter Pickup Location"
            placeholderTextColor={'#6B768A'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styling.field1, styles.destinationInput]}>
          <Image source={Images.reddot} />
          <TextInput
            placeholder="Select Destination"
            placeholderTextColor={'#6B768A'}
            style={styling.textfield1}
          />
        </TouchableOpacity>
        <Text style={styling.textfield1}>Trip Details</Text>
        <Linedim></Linedim>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Car.png')}
            />
            <View>
              <Text style={styling.textfield1}>Mini(4 Seater)</Text>
              <Text style={styling.textsub1}>Local trip</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={{
                width: deviceWidth(6),
                height: deviceHeight(3),
              }}
              source={require('../../assets/images/Info.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderColor: colors.border,
            borderRadius: 10,
            rowGap: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styling.textfield1}>Estimate Fare</Text>
            <Text style={styling.textfield1}>₹159 - ₹199</Text>
          </View>
          <Text style={styling.textsub1}>Including taxes</Text>
          <Line></Line>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styling.textfield2}>Base Fare</Text>
            <Text style={styling.textfield1}>₹159</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styling.textfield2}>Rate per km</Text>
            <Text style={styling.textfield1}>₹19</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styling.textfield2}>Ride time charge per min</Text>
            <Text style={styling.textfield1}>₹9</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styling.textfield2}>Waiting fee per min</Text>
            <Text style={styling.textfield1}>₹1</Text>
          </View>
        </View>
        <Line></Line>
        <TouchableOpacity
          onPress={() => navigation.navigate('coupon')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 20}}>
            <Text style={styling.textfield1}>26 Oct 2024, 08.15 PM</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
            <Image
              style={{width: deviceWidth(3), height: deviceWidth(4)}}
              source={require('../../assets/images/Coupon.png')}></Image>
            <Text style={styling.textfield1}>Promo code</Text>
            <Image
              style={{width: deviceWidth(3), height: deviceWidth(4)}}
              source={Images.arrow}></Image>
          </View>
        </TouchableOpacity>
        <Linedim></Linedim>
        <TouchableOpacity
          onPress={() => navigation.navigate('payment')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            style={{width: deviceWidth(6), height: deviceWidth(4)}}
            source={require('../../assets/images/Payment.png')}></Image>
          <View>
            <Text style={styling.textfield1}>Payment</Text>
            <Text style={styling.textsub1}>
              You can pay via cash or UPI for your ride
            </Text>
          </View>

          <Image
            style={{width: deviceWidth(3), height: deviceWidth(4)}}
            source={Images.arrow}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 20}}
          onPress={() => navigation.navigate('cancelride')}>
          <Button text={'Confirm Booking'}></Button>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  backgroundColor: 'white',
                  rowGap: 10,
                  padding: 10,
                  width: deviceWidth(100),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <Image
                    style={{width: deviceHeight(16), height: deviceHeight(8)}}
                    source={Images.minicar}></Image>
                  <View>
                    <Text style={styling.textfield1}>Prime Sedan</Text>
                    <Text style={styling.textsub1}>4 seator</Text>
                  </View>
                  <View>
                    <Text style={styling.textfield1}>₹159 - ₹199</Text>
                    <Text style={styling.textsub1}>Estimated Fare</Text>
                  </View>
                </View>
                <Text style={styling.textsub1}>
                  • Fare includes additional charges for out of the city limit
                  pickup/drop.
                </Text>
                <Text style={styling.textsub1}>
                  • Fare includes additional charges for out of the city limit
                  pickup/drop.
                </Text>
                \
                <Text style={styling.textsub1}>
                  • Fare includes additional charges for out of the city limit
                  pickup/drop.
                </Text>
                <TouchableOpacity
                  style={{marginHorizontal: 20}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Button text={'Close'}></Button>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RReviewbooking;

const styles = StyleSheet.create({
  destinationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    paddingHorizontal: 20,
  },
  image: {
    width: deviceWidth(25),
    height: deviceHeight(7),
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 35,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    top: 35,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
// const RReviewbooking = () => {
//   return (
//     <View>
//       <Text>jdnjdn</Text>
//     </View>
//   );
// };
// export default RReviewbooking;
