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
import Buttondim from '../common/Buttondim';

const Editlocation = ({ navigation, route }) => {
    const [address, setAddress] = useState('');
    const [destination, setDestination] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(true);
    const [modalVisible2, setModalVisible2] = useState(false);
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={true}
                    statusBarTranslucent
                    onRequestClose={() => {
                        navigation.navigate('favorites')
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
                                    onPress={() => setModalVisible2(!modalVisible2)}>
                                    <Button text={'Confirm Location'}></Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible1}
                    statusBarTranslucent
                    onRequestClose={() => {
                        setModalVisible1(!modalVisible1);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    rowGap: 10,
                                    paddingVertical: 10,
                                    width: deviceWidth(100),
                                    paddingHorizontal: 20
                                }}>
                                <TouchableOpacity
                                    style={[styling.field1, styles.destinationInput]}>
                                    <Image source={Images.greendot} />
                                    <TextInput
                                        style={styling.textfield1}
                                        placeholder="Enter Pickup Location"
                                        placeholderTextColor={'#6B768A'}

                                    />
                                </TouchableOpacity>
                                <Line></Line>
                                <TouchableOpacity style={{ borderRadius: 10, borderColor: colors.border, borderWidth: 1, padding: 10 }}>
                                    <View style={{ alignItems: 'center', columnGap: 10, flexDirection: 'row' }}>
                                        <Image style={{ width: deviceWidth(5), height: deviceWidth(5) }} source={Images.home}></Image>
                                        <Text style={styling.textfield1}>Home</Text>
                                    </View>
                                    <Text style={styling.textsub1}>V3P4+MWQ, Madurai, Tamil Nadu 625006...</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => setModalVisible1(!modalVisible1)}>
                                        <Buttondim text={'Edit'}></Buttondim>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => navigation.navigate('')}>
                                        <Button text={'Delete'}></Button>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible2}
                    statusBarTranslucent
                    onRequestClose={() => {
                        setModalVisible2(!modalVisible2);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    rowGap: 10,
                                    paddingVertical: 10,
                                    width: deviceWidth(100),
                                    paddingHorizontal: 20
                                }}>
                                <TouchableOpacity
                                    style={[styling.field1, styles.destinationInput]}>
                                    <Image source={Images.greendot} />
                                    <TextInput
                                        style={styling.textfield1}
                                        placeholder="Enter Pickup Location"
                                        placeholderTextColor={'#6B768A'}

                                    />
                                </TouchableOpacity>
                                <Line></Line>
                                <Text style={styling.textfield1}>Save as favourite</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            columnGap: 10
                                        }}>
                                        <Image
                                            style={{ width: deviceWidth(4), height: deviceWidth(4) }}
                                            source={require('../../assets/images/Select.png')}></Image>
                                        <View
                                            style={{ flexDirection: 'row', alignItems: 'center', columnGap: 20 }}>
                                            <Text style={styling.textfield1}>Home</Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            columnGap: 10
                                        }}>
                                        <Image
                                            style={{ width: deviceWidth(4), height: deviceWidth(4) }}
                                            source={require('../../assets/images/Select.png')}></Image>
                                        <View
                                            style={{ flexDirection: 'row', alignItems: 'center', columnGap: 20 }}>
                                            <Text style={styling.textfield1}>Work</Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            columnGap: 10
                                        }}>
                                        <Image
                                            style={{ width: deviceWidth(4), height: deviceWidth(4) }}
                                            source={require('../../assets/images/Select.png')}></Image>
                                        <View
                                            style={{ flexDirection: 'row', alignItems: 'center', columnGap: 20 }}>
                                            <Text style={styling.textfield1}>Others</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => setModalVisible2(!modalVisible2)}>
                                        <Buttondim text={'Cancel'}></Buttondim>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => navigation.navigate('')}>
                                        <Button text={'Save'}></Button>
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

export default Editlocation;
