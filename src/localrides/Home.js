// import React, {useEffect, useState, useRef} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import {styling} from '../common/Styling';
// import {deviceHeight, deviceWidth} from '../common/Dimens';
// import {colors} from '../common/Colors';
// import {Images} from '../common/Images';

// const Home = ({route}) => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [destinationLocation, setDestinationLocation] = useState(null);
//   const [currentAddress, setCurrentAddress] = useState('');
//   const [destinationAddress, setDestinationAddress] = useState('');
//   const [routeCoordinates, setRouteCoordinates] = useState([]);
//   const [distance, setDistance] = useState(null);

//   const mapRef = useRef(null);
//   const navigation = useNavigation();
//   const apiKey = 'AIzaSyDPgJZYAJjeWwIPYKlOjcIgP44_ABNsM7w';

//   const updateAddressFromCoords = async (coords, setAddress) => {
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;
//     try {
//       const response = await axios.get(url);
//       if (response.data.status === 'OK') {
//         const address =
//           response.data.results[0].formatted_address || 'Address not found';
//         setAddress(address);
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//     }
//   };

//   useEffect(() => {
//     if (route.params) {
//       const {locationvalue, destaddress} = route.params;
//       if (locationvalue) {
//         setCurrentLocation(locationvalue);
//         updateAddressFromCoords(locationvalue, setCurrentAddress);
//       }
//       if (destaddress) {
//         setDestinationLocation(destaddress);
//         updateAddressFromCoords(destaddress, setDestinationAddress);
//       }
//     }
//   }, [route.params]);

//   useEffect(() => {
//     Geolocation.getCurrentPosition(
//       async info => {
//         const coords = {
//           latitude: info.coords.latitude,
//           longitude: info.coords.longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         };
//         setCurrentLocation(coords);
//         updateAddressFromCoords(coords, setCurrentAddress);
//       },
//       error => console.log('Error fetching location:', error),
//       {enableHighAccuracy: false, timeout: 30000, maximumAge: 5000},
//     );

//     const watchID = Geolocation.watchPosition(
//       info => {
//         const {latitude, longitude} = info.coords;
//         const updatedCoords = {latitude, longitude};
//         if (destinationLocation) {
//           const dist = calculateDistance(
//             latitude,
//             longitude,
//             destinationLocation.latitude,
//             destinationLocation.longitude,
//           );
//           setDistance(dist.toFixed(2));
//           console.log(`Distance: ${dist.toFixed(2)} km`);
//         }
//       },
//       error => console.log('Error watching position:', error),
//       {enableHighAccuracy: true, distanceFilter: 1},
//     );

//     return () => Geolocation.clearWatch(watchID);
//   }, [destinationLocation]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const toRad = value => (value * Math.PI) / 180;
//     const R = 6371; // Earth's radius in kilometers

//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) *
//         Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const decodePolyline = encoded => {
//     let points = [];
//     let index = 0,
//       len = encoded.length;
//     let lat = 0,
//       lng = 0;

//     while (index < len) {
//       let b,
//         shift = 0,
//         result = 0;
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
//       lat += deltaLat;

//       shift = 0;
//       result = 0;
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
//       lng += deltaLng;

//       points.push({
//         latitude: lat / 1e5,
//         longitude: lng / 1e5,
//       });
//     }

//     return points;
//   };

//   useEffect(() => {
//     const fetchRoute = async () => {
//       if (currentLocation && destinationLocation) {
//         const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destinationLocation.latitude},${destinationLocation.longitude}&mode=driving&key=${apiKey}`;
//         try {
//           const response = await axios.get(url);
//           if (response.data.status === 'OK') {
//             const points = decodePolyline(
//               response.data.routes[0].overview_polyline.points,
//             );
//             setRouteCoordinates(points);
//             const dist = response.data.routes[0].legs[0].distance.value / 1000;
//             setDistance(dist.toFixed(2));
//             console.log(`Route Distance: ${dist.toFixed(2)} km`);
//           }

//           if (currentLocation) {
//             const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${location.latitude},${location.longitude}&mode=driving&key=${apiKey}`;
//             const directionsResponse = await axios.get(directionsUrl);
//             console.log('🚀 ~ handleSuggestionSelect ~ directionsResponse:', directionsResponse.data);

//             if (directionsResponse.data.status === 'OK') {
//               const route = directionsResponse.data.routes[0];
//               const duration = route.legs[0].duration.text;
//               console.log(`Estimated Travel Time: ${duration}`);
//             }
//           }

//         } catch (error) {
//           console.error('Error fetching route:', error);
//         }
//       }
//     };
//     fetchRoute();
//   }, [currentLocation, destinationLocation]);

//   return (
//     <View style={styling.container}>
//       <ScrollView>
//         <MapView
//           ref={mapRef}
//           provider={PROVIDER_GOOGLE}
//           style={{width: deviceWidth(100), height: deviceHeight(65)}}
//           showsUserLocation
//           followUserLocation
//           initialRegion={{
//             latitude: 9.884512,
//             longitude: 78.052353,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}>
//           {currentLocation && (
//             <Marker
//               coordinate={currentLocation}
//               title="Your Location"
//               description={currentAddress || 'Fetching address...'}
//               image={Images.greenpin}
//             />
//           )}
//           {destinationLocation && (
//             <Marker
//               coordinate={destinationLocation}
//               title="Destination"
//               description={destinationAddress || 'Fetching address...'}
//               image={Images.redpin}
//             />
//           )}
//           {routeCoordinates.length > 0 && (
//             <Polyline
//               coordinates={routeCoordinates}
//               strokeColor="#0000FF"
//               strokeWidth={4}
//             />
//           )}
//         </MapView>

//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'flex-end',
//             padding: 20,
//             rowGap: 10,
//           }}>
//           <View style={styles.rideOptions}>
//             <View style={styles.rideOption}>
//               <Image
//                 style={styles.image}
//                 source={require('../../assets/images/Car.png')}
//               />
//               <Text style={styling.textsub1}>Local Rides</Text>
//             </View>
//             <View style={styles.rideOption}>
//               <Image
//                 style={styles.image}
//                 source={require('../../assets/images/Car1.png')}
//               />
//               <Text style={styling.textsub1}>Rental</Text>
//             </View>
//             <View style={styles.rideOption}>
//               <Image
//                 style={styles.image}
//                 source={require('../../assets/images/Car2.png')}
//               />
//               <Text style={styling.textsub1}>Outstation</Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate('Fromloacation', {location: currentLocation})
//             }
//             style={[styling.field1, styles.destinationInput]}>
//             <Image source={Images.greendot} />
//             <TextInput
//               style={styling.textfield1}
//               placeholder="Enter Pickup Location"
//               placeholderTextColor="#6B768A"
//               value={currentAddress}
//               editable={false}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate('searchlocation', {location: currentLocation})
//             }
//             style={[styling.field1, styles.destinationInput]}>
//             <Image source={Images.reddot} />
//             <TextInput
//               style={styling.textfield1}
//               placeholder="Select Destination"
//               placeholderTextColor="#6B768A"
//               value={destinationAddress}
//               editable={false}
//             />
//           </TouchableOpacity>

//           {distance && (
//             <View style={{alignItems: 'center', marginTop: 10}}>
//               <Text style={styling.textsub1}>Distance: {distance} km</Text>
//             </View>
//           )}
//         </View>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('BookingHistoryTwo')}
//           style={{position: 'absolute', top: 10, left: 10}}>
//           <Image
//             style={{width: deviceHeight(5), height: deviceHeight(5)}}
//             source={require('../../assets/images/Menu.png')}
//           />
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: deviceWidth(25),
//     height: deviceHeight(7),
//   },
//   rideOptions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: colors.border,
//     padding: 10,
//   },
//   rideOption: {
//     alignItems: 'center',
//   },
//   destinationInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     columnGap: 5,
//     paddingHorizontal: 20,
//   },
// });

// export default Home;
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {styling} from '../common/Styling';
import {deviceHeight, deviceWidth} from '../common/Dimens';
import {colors} from '../common/Colors';
import {Images} from '../common/Images';

const Home = ({route}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  const mapRef = useRef(null);
  const navigation = useNavigation();
  const apiKey = 'AIzaSyDPgJZYAJjeWwIPYKlOjcIgP44_ABNsM7w'; // Replace with your actual API key

  const updateAddressFromCoords = async (coords, setAddress) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        const address =
          response.data.results[0].formatted_address || 'Address not found';
        setAddress(address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async info => {
        const coords = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        console.log('Initial Coordinates:', coords);
        setCurrentLocation(coords);
        updateAddressFromCoords(coords, setCurrentAddress);

        if (mapRef.current) {
          mapRef.current.animateToRegion(coords, 1000);
        }
      },
      error => console.error('Error fetching location:', error),
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 5000},
    );
  }, []);

  useEffect(() => {
    if (route.params) {
      const {locationvalue, destaddress} = route.params;
      if (locationvalue) {
        console.log('Received Location:', locationvalue);
        setCurrentLocation(locationvalue);
        updateAddressFromCoords(locationvalue, setCurrentAddress);
      }
      if (destaddress) {
        console.log('Received Destination:', destaddress);
        setDestinationLocation(destaddress);
        updateAddressFromCoords(destaddress, setDestinationAddress);
      }

      if (mapRef.current && locationvalue) {
        mapRef.current.animateToRegion(
          {
            ...locationvalue,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000,
        );
      }
    }
  }, [route.params]);

  useEffect(() => {
    if (currentLocation && destinationLocation) {
      console.log('Fetching route...');
      fetchRoute();
    }
  }, [currentLocation, destinationLocation]);

  const fetchRoute = async () => {
    if (currentLocation && destinationLocation) {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destinationLocation.latitude},${destinationLocation.longitude}&mode=driving&key=${apiKey}`;
      try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
          const route = response.data.routes[0];
          const points = decodePolyline(route.overview_polyline.points);
          setRouteCoordinates(points);

          const distance = route.legs[0].distance.value / 1000;
          const duration = route.legs[0].duration.text;
          setDistance(distance.toFixed(2));
          setTravelTime(duration);
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    }
  };

  const decodePolyline = encoded => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  return (
    <View style={styling.container}>
      <ScrollView>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{width: deviceWidth(100), height: deviceHeight(65)}}
          showsUserLocation={true}
          followUserLocation={true}
          initialRegion={{
            latitude: 9.884512,
            longitude: 78.052353,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          {currentLocation && (
            <Marker
              coordinate={currentLocation}
              title="Your Location"
              description={currentAddress || 'Fetching address...'}
            />
          )}
          {destinationLocation && (
            <Marker
              coordinate={destinationLocation}
              title="Destination"
              description={destinationAddress || 'Fetching address...'}
            />
          )}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#0000FF"
              strokeWidth={4}
            />
          )}
        </MapView>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            padding: 20,
            rowGap: 10,
          }}>
          <View style={styles.rideOptions}>
            <View style={styles.rideOption}>
              <Image
                style={styles.image}
                source={require('../../assets/images/Car.png')}
              />
              <Text style={styling.textsub1}>Local Rides</Text>
            </View>
            <View style={styles.rideOption}>
              <Image
                style={styles.image}
                source={require('../../assets/images/Car1.png')}
              />
              <Text style={styling.textsub1}>Rental</Text>
            </View>
            <View style={styles.rideOption}>
              <Image
                style={styles.image}
                source={require('../../assets/images/Car2.png')}
              />
              <Text style={styling.textsub1}>Outstation</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Fromloacation', {location: currentLocation})
            }
            style={[styling.field1, styles.destinationInput]}>
            <Image source={Images.greendot} />
            <TextInput
              style={styling.textfield1}
              placeholder="Enter Pickup Location"
              placeholderTextColor="#6B768A"
              value={currentAddress}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('searchlocation', {location: currentLocation})
            }
            style={[styling.field1, styles.destinationInput]}>
            <Image source={Images.reddot} />
            <TextInput
              style={styling.textfield1}
              placeholder="Select Destination"
              placeholderTextColor="#6B768A"
              value={destinationAddress}
              editable={false}
            />
          </TouchableOpacity>

          {distance && (
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={styling.textsub1}>Distance: {distance} km</Text>
            </View>
          )}

          {travelTime && (
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={styling.textsub1}>
                Estimated Travel Time: {travelTime}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('BookingHistoryTwo')}
          style={{position: 'absolute', top: 10, left: 10}}>
          <Image
            style={{width: deviceHeight(5), height: deviceHeight(5)}}
            source={require('../../assets/images/Menu.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: deviceWidth(25),
    height: deviceHeight(7),
  },
  rideOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    padding: 10,
  },
  rideOption: {
    alignItems: 'center',
  },
  destinationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    paddingHorizontal: 20,
  },
});

export default Home;
