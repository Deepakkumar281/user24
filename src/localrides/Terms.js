import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { colors } from '../common/Colors';
import { Fonts } from '../common/Fonts';
import { deviceHeight } from '../common/Dimens';

const Terms = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Terms</Text>
            <Text style={styles.subheading}>Ride24 | Taxi Services</Text>
            <Text style={styles.date}>Updated effective from 02, Jan 2024.</Text>
            <Text style={styles.content}>
                This Privacy Policy explains how we collect, process, use, share, and protect information about you. It also tells you how you can access and update your information and make certain choices about how your information is used.
            </Text>
            <Text style={styles.content}>
                The Privacy Policy covers both “online” (e.g., web and mobile services, including any websites operated by us such as Mobile Application, however accessed and/or used, whether via personal computers, mobile devices or otherwise) and “offline” (e.g., collection of data through mailings, telephone, or in person) activities owned, operated, provided, or made available by the Company.
            </Text>
            <Text style={styles.content}>
                Our “online” and “offline” activities, in relation to facilitation of taxi hire services through a network of third-party drivers and taxi operators, are collectively referenced as the “Services”. This Privacy Policy also applies to your use of interactive features or downloads that: (i) we own or control; (ii) are available through Ride24’s Services; or (iii) interact with the Services and post or incorporate this Privacy Policy.
            </Text>
            <Text style={styles.content}>
                BY ACCEPTING THE CUSTOMER TERMS AND CONDITIONS, YOU AGREE TO THE TERMS OF THIS PRIVACY POLICY. Please review the following carefully so that you understand our privacy practices. If you do not agree to this Privacy Policy, do not accept the Customer Terms and Conditions or use our Services. This Privacy Policy is incorporated by reference into the Customer Terms and Conditions.
            </Text>
            <Text style={styles.content}>
                If you have questions about this Privacy Policy, please contact us through the email address provided on our website and/or Mobile Application.
            </Text>
        </ScrollView>
    );
};

export default Terms;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontFamily: Fonts.Bold,
        color: colors.primary,
        marginBottom: 8,
    },
    subheading: {
        fontSize: 18,
        fontFamily: Fonts.Medium,
        color: colors.secondary,
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        fontFamily: Fonts.Regular,
        color: colors.grey,
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        color: colors.text,
        lineHeight: 24,
        marginBottom: 16,
    },
});
