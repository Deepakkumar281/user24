import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styling} from '../common/Styling';
import {deviceHeight, deviceWidth} from '../common/Dimens';
import {colors} from '../common/Colors';
import {Images} from '../common/Images';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Button from '../common/Button';
import Line from '../common/Line';
import Buttondim from '../common/Buttondim';
import Linedim from '../common/Linedim';

const Review = ({navigation, route}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [distance, setDistance] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [arrowLocation, setArrowLocation] = useState(null);
  const [arrowRotation, setArrowRotation] = useState(0);
  const apiKey = 'AIzaSyDPgJZYAJjeWwIPYKlOjcIgP44_ABNsM7w';

  const destlocatoin = route?.params?.destlocation;

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
            const {latitude, longitude} = info.coords;
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
          {enableHighAccuracy: false, timeout: 30000, maximumAge: 5000},
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
        const {latitude, longitude} = info.coords;
        const updatedCoords = {latitude, longitude};
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
      {enableHighAccuracy: true, distanceFilter: 1},
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
    const {latitude, longitude} = e.nativeEvent.coordinate;
    const location = {latitude, longitude};
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
    navigation.navigate('searchlocation', {location: currentLocation});
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
    const {latitude, longitude} = e.nativeEvent.coordinate;
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
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{width: deviceWidth(100), height: deviceHeight(60)}}
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
      <View
        style={{flex: 1, justifyContent: 'flex-end', padding: 20, rowGap: 10}}>
        <View style={styles.rideOptions}>
          <View style={styles.rideOption}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Carz.png')}
            />
            <Text style={styling.textfield1}>Mini</Text>
            <Text style={styling.textsub1}>₹159 - ₹199</Text>
          </View>
          <View style={styles.rideOption}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Car1z.png')}
            />
            <Text style={styling.textfield1}>Ev cars</Text>
            <Text style={styling.textsub1}>₹159 - ₹199</Text>
          </View>
          <View style={styles.rideOption}>
            <Image
              style={styles.image1}
              source={require('../../assets/images/Car2z.png')}
            />
            <Text style={styling.textfield1}>Auto</Text>
            <Text style={styling.textsub1}>₹159 - ₹199</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('reviewbooking')}>
          <Buttondim text={'Review Booking'}></Buttondim>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: deviceWidth(20),
    height: deviceHeight(6),
  },
  image1: {
    width: deviceWidth(16),
    height: deviceHeight(6),
  },
  rideOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rideOption: {
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  destinationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    paddingHorizontal: 20,
  },
});

export default Review;
