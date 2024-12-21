import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { colors } from '../common/Colors';
import { styling } from '../common/Styling';
import { Images } from '../common/Images';
import { deviceHeight, deviceWidth } from '../common/Dimens';
import { Fonts } from '../common/Fonts';
import Button from '../common/Button';
import { useNavigation } from '@react-navigation/native';


const BookingHistoryThree = () => {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const navigation = useNavigation()

    return (
        <View style={[styling.container, { padding: 20 }]}>
            <TouchableOpacity style={{ marginBottom: 10 }} onPress={(() => navigation.navigate('BookingHistoryTwo'))}>
                <Image source={Images.back}></Image>
            </TouchableOpacity>
            <Text style={styling.texthead}>Booking History</Text>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => setActiveTab('Upcoming')}
                >
                    <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>
                        Upcoming
                    </Text>
                    {activeTab === 'Upcoming' && <View style={styles.underline} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => setActiveTab('Completed')}
                >
                    <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>
                        Completed
                    </Text>
                    {activeTab === 'Completed' && <View style={styles.underline} />}
                </TouchableOpacity>
            </View>

            {/* Content Based on Active Tab */}
            <View style={styles.contentContainer}>
                {activeTab === 'Upcoming' ? (
                    <View><TouchableOpacity onPress={() => navigation.navigate('reviewbooking1')} style={styles.upcomingContent}>
                        <Image
                            resizeMode="contain"
                            source={Images.minicar}
                            style={styles.imageStyle} />
                        <View>
                            <View style={styles.carDetails}>
                                <Text style={styles.carTitle}>Booking ID:</Text>
                                <Text style={styles.carInfo}>mb23102s7gbyk</Text>
                            </View>

                            <View style={styles.fareDetails}>
                                <Text style={styles.fareTitle}>Sedan, Nov 28 at 12:15 PM</Text>
                                <Text style={styles.fareInfo}>Upcoming</Text>
                            </View>
                        </View>

                    </TouchableOpacity><View style={styles.upcomingContent}>
                            <Image
                                resizeMode="contain"
                                source={Images.minicar}
                                style={styles.imageStyle} />
                            <View>
                                <View style={styles.carDetails}>
                                    <Text style={styles.carTitle}>Booking ID:</Text>
                                    <Text style={styles.carInfo}>mb23102s7gbyk</Text>
                                </View>

                                <View style={styles.fareDetails}>
                                    <Text style={styles.fareTitle}>Sedan, Nov 28 at 12:15 PM</Text>
                                    <Text style={styles.fareInfo}>Upcoming</Text>
                                </View>
                            </View>

                        </View>
                        <View style={styles.upcomingContent}>
                            <Image
                                resizeMode="contain"
                                source={Images.minicar}
                                style={styles.imageStyle} />
                            <View>
                                <View style={styles.carDetails}>
                                    <Text style={styles.carTitle}>Booking ID:</Text>
                                    <Text style={styles.carInfo}>mb23102s7gbyk</Text>
                                </View>

                                <View style={styles.fareDetails}>
                                    <Text style={styles.fareTitle}>Sedan, Nov 28 at 12:15 PM</Text>
                                    <Text style={styles.fareInfo}>Upcoming</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <><View style={styles.upcomingContent}>
                        <Image
                            resizeMode="contain"
                            source={Images.minicar}
                            style={styles.imageStyle} />
                        <View>
                            <View style={styles.carDetails}>
                                <Text style={styles.carTitle}>Booking ID:</Text>
                                <Text style={styles.carInfo}>mb23102s7gbyk</Text>
                            </View>

                            <View style={styles.fareDetails}>
                                <Text style={styles.fareTitle}>Sedan, Nov 28 at 12:15 PM</Text>
                                <Text style={styles.fareInfo2}>Cancelled</Text>
                            </View>
                        </View>

                    </View><View style={styles.upcomingContent}>
                            <Image
                                resizeMode="contain"
                                source={Images.minicar}
                                style={styles.imageStyle} />
                            <View>
                                <View style={styles.carDetails}>
                                    <Text style={styles.carTitle}>Booking ID:</Text>
                                    <Text style={styles.carInfo}>mb23102s7gbyk</Text>
                                </View>

                                <View style={styles.fareDetails}>
                                    <Text style={styles.fareTitle}>Sedan, Nov 28 at 12:15 PM</Text>
                                    <Text style={styles.fareInfo2}>Cancelled</Text>
                                </View>
                            </View>

                        </View><View style={styles.upcomingContent}>
                            <Image
                                resizeMode="contain"
                                source={Images.minicar}
                                style={styles.imageStyle} />
                            <View>
                                <View style={styles.carDetails}>
                                    <Text style={styles.carTitle}>Booking ID:</Text>
                                    <Text style={styles.carInfo}>mb23102s7gbyk</Text>
                                </View>

                                <View style={styles.fareDetails}>
                                    <Text style={styles.fareTitle}>Sedan, Nov 28 at 12:15 PM</Text>
                                    <Text style={styles.fareInfo}>Upcoming</Text>
                                </View>
                            </View>

                        </View>
                    </>
                )}
            </View>
            <TouchableOpacity style={{ width: deviceHeight(40), alignSelf: 'center', marginBottom: deviceHeight(5), position: 'absolute', bottom: 20 }} onPress={() => { navigation.navigate('home') }}>
                <Button text={'Book a Ride'} />
            </TouchableOpacity>
        </View>
    );
};

export default BookingHistoryThree;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    tabButton: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 10,
    },
    tabText: {
        fontSize: deviceHeight(1.8),
        color: '#000',
        fontFamily: Fonts.ibmmedium
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#000',
    },
    underline: {
        marginTop: 5,
        height: 3,
        backgroundColor: colors.black,
        width: '100%',
    },
    contentContainer: {
        flex: 1,

    },
    upcomingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: deviceWidth(2),
        backgroundColor: '#F8F9FB'
    },
    imageStyle: {
        width: deviceWidth(20),
        height: deviceWidth(20),
    },
    carDetails: {
        flexDirection: 'row',
        // paddingHorizontal: deviceWidth(4),
        alignItems: 'center'
    },
    carTitle: {
        color: colors.black,
        fontSize: deviceHeight(1.7),
        fontFamily: Fonts.ibmbold,
    },
    carInfo: {
        color: colors.black,
        fontSize: deviceHeight(1.7),
        fontFamily: Fonts.ibmbold,
    },
    fareDetails: {
        flexDirection: 'row',
        // paddingHorizontal: deviceWidth(4),
        alignItems: 'center'

    },
    fareTitle: {
        color: colors.black,
        fontSize: deviceHeight(1.5),
        fontFamily: Fonts.ibmmedium,
    },
    fareInfo: {
        color: '#0883FE',
        fontSize: deviceHeight(1.5),
        fontFamily: Fonts.ibmmedium,
        paddingHorizontal: deviceWidth(2)
    },
    fareInfo2: {
        color: 'red',
        fontSize: deviceHeight(1.5),
        fontFamily: Fonts.ibmmedium,
        paddingHorizontal: deviceWidth(2)
    },
});
