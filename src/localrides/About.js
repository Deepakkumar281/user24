import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { colors } from '../common/Colors';
import Button from '../common/Button';
import { useNavigation } from '@react-navigation/native';

const About = () => {
    const handleEmailPress = () => {
        Linking.openURL('mailto:info@ride24.in');
    };

    const handleTermsPress = () => {
        // Navigate or link to Terms of Service
        alert('Terms of Services Clicked!');
    };

    const handlePrivacyPress = () => {
        // Navigate or link to Privacy Policy
        alert('Privacy Policy Clicked!');
    };

    const handleCustomerCarePress = () => {
        // Action for customer care button
        alert('Customer Care Clicked!');
    };
    const navigation = useNavigation()

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>About Ride24</Text>
            <Text style={styles.description}>
                Setting new accessibility for billions of people. Privacy, Terms and other Information are below.
            </Text>

            <TouchableOpacity style={styles.linkItem} onPress={() => { navigation.navigate('terms') }}>
                <Text style={styles.linkText}>Terms of Services</Text>
                <Text style={styles.linkSubText}>Know more about Terms of Service</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkItem} onPress={() => { navigation.navigate('Privacy') }}>
                <Text style={styles.linkText}>Privacy Policy</Text>
                <Text style={styles.linkSubText}>Our Ride24 Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCustomerCarePress}>
                <Text style={styles.buttonText}>Customer Care</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={handleEmailPress}>

                <Button text={'ride24'} />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    linkItem: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    linkText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkSubText: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
    },

    button2: {

        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    email: {
        color: 'white',
        fontSize: 14,
        // marginTop: 20,
        textAlign: 'center',
    },
});

export default About;
