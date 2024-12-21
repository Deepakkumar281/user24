import React, { useEffect, useState } from 'react';
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
import { styling } from '../common/Styling';
import { deviceHeight, deviceWidth } from '../common/Dimens';
import { colors } from '../common/Colors';
import { Images } from '../common/Images';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Line from '../common/Line';
import Button from '../common/Button';
import Favorites from '../common/Favorites';

const Searchlocation = ({ navigation, route }) => {
  const [address, setAddress] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const apiKey = 'AIzaSyDPgJZYAJjeWwIPYKlOjcIgP44_ABNsM7w';

  const picklocatoin = route?.params?.location;

  useEffect(() => {
    const getLocation = async () => {
      if (picklocatoin) {
        try {
          const addressFromCoords = await getAddressFromCoordinates(
            picklocatoin.latitude,
            picklocatoin.longitude,
          );
          setAddress(addressFromCoords);
        } catch (error) {
          console.log();
        }
      }
    };
    getLocation();
  }, []);

  const mapRef = React.useRef(null);

  const [region, setRegion] = useState({
    latitude: 9.884512,
    longitude: 78.052353,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const handleRegionChangeComplete = async newRegion => {
    setRegion(newRegion);
  };

  const handleMapPress = async e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const location = { latitude, longitude };
    setDestinationLocation(location);
    const address = await getAddressFromCoordinates(latitude, longitude);
    setDestinationAddress(address);
  };

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
        setDestination(result.formatted_address);
        setDropdownVisible(false);
        navigation.navigate('home', { destlocation: result.geometry.location });
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styling.container}>
        <View style={{ padding: 20, rowGap: 10 }}>
          <Image source={Images.back} />
          <View style={[styling.field1, styles.destinationInput]}>
            <Image source={Images.greendot} />
            <TextInput
              placeholder="Your Location"
              placeholderTextColor={'#6B768A'}
              style={styling.textfield1}
              value={address}
              editable={false}
            />
          </View>
          <View style={[styling.field1, styles.destinationInput]}>
            <Image source={Images.reddot} />
            <TextInput
              placeholder="Select Destination"
              placeholderTextColor={'#6B768A'}
              style={styling.textfield1}
              value={destination}
              onChangeText={text => {
                setDestination(text);
                fetchSuggestions(text);
              }}
            />
          </View>

          <Line></Line>
          {isDropdownVisible && (
            <View style={styles.dropdownContainer}>
              <Text style={styling.textfield1}>Suggestions</Text>
              <FlatList
                data={suggestions}
                keyExtractor={item => item.place_id}
                renderItem={({ item }) => (
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              columnGap: 10,
            }}>
            <Favorites
              text={'Add Home'}
              image1={Images.home}
              flex={true}></Favorites>
            <Favorites
              text={'Add Work'}
              image1={Images.work}
              flex={true}></Favorites>
          </View>
          <View>
            <Favorites
              text={'Favourite Places'}
              image1={Images.work}
              image2={Images.arrow}></Favorites>
          </View>

          <View
            style={{
              position: 'absolute',
              top: deviceHeight(80),
              left: deviceWidth(5),
              rowGap: 10,
            }}>
            <Text style={styling.textsub1}>
              If You are not able to find the location from search
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Button text={'Set Location on Map'}></Button>
            </TouchableOpacity>
          </View>
        </View>
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
                  paddingVertical: 10,
                }}>
                <Text style={[styling.texthead, { textAlign: 'center' }]}>
                  Select Location
                </Text>
                <View style={[styling.field1, styles.destinationInput1]}>
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
                  <Image
                    style={{ width: deviceWidth(5), height: deviceWidth(5) }}
                    source={Images.clear}
                  />
                </View>
                <View style={{ backgroundColor: '#FFB854' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 5,
                      color: 'black',
                      fontSize: deviceHeight(1.7),
                      fontWeight: 'bold',
                    }}>
                    Search or Drag Map to Change the Location
                  </Text>
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
                  onRegionChangeComplete={newRegion => {
                    setRegion(newRegion);
                    handleRegionChangeComplete();
                  }}
                  onPress={handleMapPress}>
                  {destinationLocation && (
                    <Marker
                      coordinate={destinationLocation}
                      title="Destination"
                      description={destinationAddress || 'Fetching address...'}
                      image={Images.redpin}
                    />
                  )}
                </MapView>
                <TouchableOpacity
                  style={{ marginHorizontal: 20 }}
                  onPress={() => navigation.navigate('confirmride')}>
                  <Button text={'Confirm Location'}></Button>
                </TouchableOpacity>
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
  destinationInput1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxHeight: deviceHeight(20),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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

export default Searchlocation;
