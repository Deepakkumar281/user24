import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import {styling} from '../common/Styling';
import {deviceHeight, deviceWidth} from '../common/Dimens';
import {colors} from '../common/Colors';
import {Images} from '../common/Images';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import Line from '../common/Line';
import Button from '../common/Button';

const Fromlocation = ({navigation, route}) => {
  const picklocation = route?.params?.location;
  const [address, setAddress] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const apiKey = 'AIzaSyDPgJZYAJjeWwIPYKlOjcIgP44_ABNsM7w';

  const mapRef = React.useRef(null);

  const [region, setRegion] = useState({
    latitude: 9.884512,
    longitude: 78.052353,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    const getLocation = async () => {
      if (picklocation) {
        try {
          const addressFromCoords = await getAddressFromCoordinates(
            picklocation.latitude,
            picklocation.longitude,
          );
          setAddress(addressFromCoords);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getLocation();
  }, [picklocation]);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        return (
          response.data.results[0].formatted_address || 'Address not found'
        );
      }
      return 'Address not found';
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not found';
    }
  };

  const fetchSuggestions = async input => {
    if (!input) {
      setSuggestions([]);
      setDropdownVisible(false);
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        setSuggestions(response.data.predictions);
        setDropdownVisible(true);
      } else {
        setSuggestions([]);
        setDropdownVisible(false);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionSelect = async placeId => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        const result = response.data.result;

        //     setDestination(result.formatted_address);
        //     setDestinationLocation({
        //       latitude: result.geometry.location.lat,
        //       longitude: result.geometry.location.lng,
        //     });
        //     setRegion({
        //       latitude: result.geometry.location.lat,
        //       longitude: result.geometry.location.lng,
        //       latitudeDelta: 0.05,
        //       longitudeDelta: 0.05,
        //     });

        //     setDropdownVisible(false);
        //   }
        const location = {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        };
        setDestination(result.formatted_address);
        setDestinationLocation(location);
        console.log('Selected Location', location);
        navigation.navigate('home', {locationvalue: location});
        setDropdownVisible(false);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const handleMapPress = async e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setDestinationLocation({latitude, longitude});
    const address = await getAddressFromCoordinates(latitude, longitude);
    setDestination(address);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSuggestions([]);
    setDropdownVisible(false);
    if (destination && destinationLocation) {
      navigation.navigate('home', {
        location: destination,
        locationvalue: destinationLocation,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styling.container}>
        <View style={{padding: 20, rowGap: 10}}>
          <Image source={Images.back} />
          <View style={[styling.field1, styles.destinationInput]}>
            <Image source={Images.greendot} />
            <TextInput
              placeholder="Search for a place"
              placeholderTextColor="#6B768A"
              style={styling.textfield1}
              value={destination}
              onChangeText={text => {
                setDestination(text);
                fetchSuggestions(text);
              }}
            />
          </View>

          <Line />

          {isDropdownVisible && suggestions.length > 0 && (
            <View style={styles.dropdownContainer}>
              <FlatList
                data={suggestions}
                keyExtractor={item => item.place_id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSuggestionSelect(item.place_id)}>
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View
            style={{
              position: 'absolute',
              top: deviceHeight(80),
              left: deviceWidth(5),
              rowGap: 10,
              width: '100%',
            }}>
            <Text style={styling.textsub1}>
              If you are not able to find the location from search
            </Text>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Button text={'Set Location on Map'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent
          onRequestClose={handleModalClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  backgroundColor: 'white',
                  rowGap: 10,
                  paddingVertical: 10,
                }}>
                <Text style={[styling.texthead, {textAlign: 'center'}]}>
                  Select Location
                </Text>
                <View style={[styling.field1, styles.destinationInput2]}>
                  <Image source={Images.reddot} />
                  <TextInput
                    placeholder="Select Location"
                    placeholderTextColor={'#6B768A'}
                    style={styling.textfield1}
                    value={destination}
                    onChangeText={text => {
                      setDestination(text);
                      fetchSuggestions(text);
                    }}
                  />
                </View>
                <MapView
                  ref={mapRef}
                  provider={PROVIDER_GOOGLE}
                  style={{
                    width: deviceWidth(100),
                    height: deviceHeight(65),
                  }}
                  region={region}
                  showsUserLocation={true}
                  followUserLocation={true}
                  onPress={handleMapPress}>
                  {destinationLocation && (
                    <Marker
                      coordinate={destinationLocation}
                      title="Destination"
                      description={destination || 'Fetching address...'}
                    />
                  )}
                </MapView>
                <View style={{width: '100%'}}>
                  <TouchableOpacity onPress={handleModalClose}>
                    <Button text={'Confirm Location'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  destinationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  destinationInput2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxHeight: deviceHeight(20),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 10,
    padding: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Fromlocation;
