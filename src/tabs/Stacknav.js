import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Welcomepages/Splasj';
import Intro1 from '../Welcomepages/Intro1';
import Register from '../Welcomepages/Register';
import Otp from '../Welcomepages/Otp';
import Home from '../localrides/Home';
import Searchlocation from '../localrides/Searchlocation';
import Confirmride from '../localrides/Confirmride';
import Picktime from '../localrides/Picktime';
import Review from '../localrides/Review';
import Coupon from '../localrides/Coupon';
import Payment from '../localrides/Payment';
import BookingHistoryTwo from '../localrides/BookingHistoryTwo';
import BookingHistoryThree from '../localrides/BookingHistoryThree';
import Completed from '../localrides/Completed';
// import Reviewbooking from '../localrides/Reviewbooking';
import Cancelride from '../localrides/Cancelride';
import Reviewbooking1 from '../localrides/Reviewbooking1';
import Cancelstill from '../localrides/Cancelstill';
import Cancelled from '../localrides/Cancelled';
import Complete from '../localrides/Complete';
import Rating from '../localrides/Rating';
import Cancelled1 from '../localrides/Cancelled1';
import Editprofile from '../editprofile/Editprofile';
import PaymentScreenOne from '../localrides/PaymentScreenOne';
import PaymentHistory from '../localrides/PaymentHistory';
import CustomerCare from '../localrides/CustomerCare';
import SosCall from '../localrides/SosCall';
import InviteFriendsScreen from '../localrides/InviteFriendsScreen';
import About from '../localrides/About';
import Terms from '../localrides/Terms';
import Privacy from '../localrides/Privacy';
import Editname from '../editprofile/Editname';
import Editmobile from '../editprofile/Editmobile';
import Verifyotp from '../editprofile/Verifyotp';
import Editemail from '../editprofile/Editemail';
import Favorites from '../editprofile/Favorites';
import Editlocation from '../editprofile/Editlocation';
import Addfavorites from '../editprofile/Addfavorites';
import Emergency from '../editprofile/Emergency';
import Delete from '../editprofile/Delete';
import RReviewbooking from '../localrides/Ridereview';

const Stack = createStackNavigator();

const Stacknav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash">
      {/* <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="intro1" component={Intro1} /> */}
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="otp" component={Otp} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="searchlocation" component={Searchlocation} />
      <Stack.Screen name="confirmride" component={Confirmride} />
      <Stack.Screen name="picktime" component={Picktime} />
      <Stack.Screen name="review" component={Review} />
      <Stack.Screen name="coupon" component={Coupon} />
      <Stack.Screen name="payment" component={Payment} />
      <Stack.Screen name="BookingHistoryTwo" component={BookingHistoryTwo} />
      <Stack.Screen
        name="BookingHistoryThree"
        component={BookingHistoryThree}
      />
      <Stack.Screen name="Completed" component={Completed} />
      <Stack.Screen name="rReviewbooking" component={RReviewbooking} />
      <Stack.Screen name="cancelride" component={Cancelride} />
      <Stack.Screen name="reviewbooking1" component={Reviewbooking1} />
      <Stack.Screen name="cancelstill" component={Cancelstill} />
      <Stack.Screen name="cancelled" component={Cancelled} />
      <Stack.Screen name="complete" component={Complete} />
      <Stack.Screen name="rating" component={Rating} />
      <Stack.Screen name="cancelled1" component={Cancelled1} />
      <Stack.Screen name="editprofile" component={Editprofile} />
      <Stack.Screen name="PaymentScreenOne" component={PaymentScreenOne} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="CustomerCare" component={CustomerCare} />
      <Stack.Screen name="SosCall" component={SosCall} />
      <Stack.Screen
        name="InviteFriendsScreen"
        component={InviteFriendsScreen}
      />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="terms" component={Terms} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="editname" component={Editname} />
      <Stack.Screen name="editmobile" component={Editmobile} />
      <Stack.Screen name="verifyotp" component={Verifyotp} />
      <Stack.Screen name="editemail" component={Editemail} />
      <Stack.Screen name="favorites" component={Favorites} />
      <Stack.Screen name="editlocation" component={Editlocation} />
      <Stack.Screen name="addfavorites" component={Addfavorites} />
      <Stack.Screen name="emergency" component={Emergency} />
      <Stack.Screen name="delete" component={Delete} />
    </Stack.Navigator>
  );
};

export default Stacknav;

const styles = StyleSheet.create({});
