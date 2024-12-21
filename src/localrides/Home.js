import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styling } from '../common/Styling';
import { deviceHeight, deviceWidth } from '../common/Dimens';
import { colors } from '../common/Colors';
import { Images } from '../common/Images';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Button from '../common/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = ({ route }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [distance, setDistance] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [arrowLocation, setArrowLocation] = useState(null);
  const [arrowRotation, setArrowRotation] = useState(0);
  const apiKey = 'AIzaSyDPgJZYAJjeWwIPYKlOjcIgP44_ABNsM7w';
  const navigation = useNavigation()

  const destlocatoin = route?.params?.destlocation
  console.log(destlocatoin);

  const mapRef = React.useRef(null);

  const [region, setRegion] = useState({
    latitude: 9.884512,
    longitude: 78.052353,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        Geolocation.getCurrentPosition(
          async info => {
            const { latitude, longitude } = info.coords;
            const coords = {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setCurrentLocation(coords);

            setRegion(coords);
            const address = await getAddressFromCoordinates(
              latitude,
              longitude,
            );
            setCurrentAddress(address);
          },
          error => {
            console.log('Error fetching location:', error);
            getLocation();
          },
          { enableHighAccuracy: false, timeout: 30000, maximumAge: 5000 },
        );
        if (destlocatoin) {
          setDestinationLocation({
            latitude: destlocatoin.lat,
            longitude: destlocatoin.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          const address = await getAddressFromCoordinates(
            destlocatoin.lat,
            destlocatoin.lng,
          );

          setDestinationAddress(address);
        }
      } catch (error) {
        console.log(error);
        getLocation();
      }
    };
    getLocation();

    const watchID = Geolocation.watchPosition(
      info => {
        const { latitude, longitude } = info.coords;
        const updatedCoords = { latitude, longitude };
        setArrowLocation(updatedCoords);
        if (destinationLocation) {
          const updatedDistance = calculateDistance(
            latitude,
            longitude,
            destinationLocation.latitude,
            destinationLocation.longitude,
          );
          setDistance(updatedDistance.toFixed(2));
        }
      },
      error => console.log('Error watching position:', error),
      { enableHighAccuracy: true, distanceFilter: 1 },
    );

    return () => Geolocation.clearWatch(watchID);
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        const result = response.data.results[0];
        return result.formatted_address || 'Address not found';
      }
      return 'Address not found';
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not found';
    }
  };

  const handleYourLocationPress = async () => {
    if (!currentLocation) return;

    mapRef.current.animateToRegion(
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000,
    );

    const address = await getAddressFromCoordinates(
      currentLocation.latitude,
      currentLocation.longitude,
    );
    setCurrentAddress(address);
  };

  const handleMapPress = async e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const location = { latitude, longitude };
    setCurrentLocation(location);
    const address = await getAddressFromCoordinates(latitude, longitude);
    setCurrentAddress(address);

    if (currentLocation) {
      const dist = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        latitude,
        longitude,
      );
      setDistance(dist.toFixed(2));
    }
  };

  const handleSelectDestinationPress = () => {
    // if (!destinationLocation) return;

    // mapRef.current.animateToRegion(
    //     {
    //         latitude: destinationLocation.latitude,
    //         longitude: destinationLocation.longitude,
    //         latitudeDelta: 0.005,
    //         longitudeDelta: 0.005,
    //     },
    //     1000
    // );
    navigation.navigate('searchlocation', { location: currentLocation });
  };

  useEffect(() => {
    const getRoute = async () => {
      if (currentLocation && destinationLocation) {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destinationLocation.latitude},${destinationLocation.longitude}&mode=driving&key=${apiKey}`;
        try {
          const response = await axios.get(url);
          if (response.data.status === 'OK') {
            const points = decodePolyline(
              response.data.routes[0].overview_polyline.points,
            );
            const extendedRoute = extendRouteToDestination(
              points,
              destinationLocation,
            );
            setRouteCoordinates(extendedRoute);
            const dist = response.data.routes[0].legs[0].distance.value / 1000;
            setDistance(dist.toFixed(2));
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      }
    };
    getRoute();
  }, [destinationLocation, currentLocation]);

  const calculateBearing = (startLat, startLng, endLat, endLng) => {
    const toRad = value => (value * Math.PI) / 180;
    const toDeg = value => (value * 180) / Math.PI;

    const dLon = toRad(
      destinationLocation.longitude - currentLocation.longitude,
    );
    const y = Math.sin(dLon) * Math.cos(toRad(destinationLocation.latitude));
    const x =
      Math.cos(toRad(currentLocation.latitude)) *
      Math.sin(toRad(destinationLocation.latitude)) -
      Math.sin(toRad(currentLocation.latitude)) *
      Math.cos(toRad(destinationLocation.latitude)) *
      Math.cos(dLon);
    const bearing = toDeg(Math.atan2(y, x));
    return (bearing + 360) % 360;
  };

  const handleRegionChangeComplete = async newRegion => {
    setRegion(newRegion);
    const newArrowLocation = {
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    };
    setArrowLocation(newArrowLocation);
    const bearing = calculateBearing(
      arrowLocation.latitude,
      arrowLocation.longitude,
      newRegion.latitude,
      newRegion.longitude,
    );
    setArrowRotation(bearing);
    const address = await fetchAddress(newRegion.latitude, newRegion.longitude);
    setCurrentAddress(address);
  };

  const extendRouteToDestination = (route, destination) => {
    const lastPoint = route[route.length - 1];
    if (
      lastPoint.latitude !== destination.latitude ||
      lastPoint.longitude !== destination.longitude
    ) {
      return [...route, destination];
    }
    return route;
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

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = value => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const onMarkerDragEnd = async e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const updatedCoords = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setCurrentLocation(updatedCoords);
    setRegion(updatedCoords);
    const newAddress = await getAddressFromCoordinates(latitude, longitude);
    setCurrentAddress(newAddress);
  };

  return (
    <View style={styling.container}>
      <ScrollView>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ width: deviceWidth(100), height: deviceHeight(65) }}
          region={region}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChangeComplete={newRegion => {
            setRegion(newRegion);
            handleRegionChangeComplete();
          }}
          onPress={handleMapPress}>
          {currentLocation && (
            <Marker
              coordinate={currentLocation}
              title="Your Location"
              description={currentAddress || 'Fetching address...'}
              image={Images.greenpin}
              draggable
              onDragEnd={onMarkerDragEnd}
            />
          )}
          {/* {arrowLocation && (
                    // <Marker
                    //     coordinate={arrowLocation}
                    //     title="You"
                    //     description="Moving position"
                    //     flat
                    //     anchor={{ x: 0.5, y: 0.5 }}
                    // >
                    //     <Image
                    //         source={require('../../assets/images/googlemap.jpg')} 
                    //         style={{ width: 40, height: 40, transform: [{ rotate: '0deg' }] }} 
                    //     />
                    // </Marker>
                    <Marker coordinate={arrowLocation} flat anchor={{ x: 0.5, y: 0.5 }}>
                        <Image
                            source={require('../../assets/images/googlemap.jpg')}
                            style={{
                                width: 40, height: 40,
                                transform: [{ rotate: `${arrowRotation}deg` }]
                            }}
                        />
                    </Marker>
                )} */}
          {destinationLocation && (
            <Marker
              coordinate={destinationLocation}
              title="Destination"
              description={destinationAddress || 'Fetching address...'}
              image={Images.redpin}
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
        {/* <TouchableOpacity
                style={{ position: 'absolute', top: deviceHeight(55), right: deviceWidth(10) }}
                onPress={handleYourLocationPress}
            >
                <Image source={require('../../assets/images/Pointer.png')} />
            </TouchableOpacity> */}
        <View
          style={{ flex: 1, justifyContent: 'flex-end', padding: 20, rowGap: 10 }}>
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
            onPress={handleSelectDestinationPress}
            style={[styling.field1, styles.destinationInput]}>
            <Image source={Images.greendot} />
            <TextInput
              style={styling.textfield1}
              placeholder="Enter Pickup Location"
              placeholderTextColor={'#6B768A'}
              value={currentAddress}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSelectDestinationPress}
            style={[styling.field1, styles.destinationInput]}>
            <Image source={Images.reddot} />
            <TextInput
              placeholder="Select Destination"
              placeholderTextColor={'#6B768A'}
              style={styling.textfield1}
              value={destinationAddress}
              editable={false}
              onChangeText={text => {
                setDestination(text);
                fetchSuggestions(text);
              }}
            />
          </TouchableOpacity>
          {/* {distance && (
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={styling.textsub1}>Distance: {distance} km</Text>
                    </View>
                )} */}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('BookingHistoryTwo')} style={{ position: 'absolute', top: 10, left: 10 }}>
          <Image
            style={{ width: deviceHeight(5), height: deviceHeight(5) }}
            source={require('../../assets/images/Menu.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    </View >
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
