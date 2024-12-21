import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Images } from '../common/Images';
import { deviceHeight, deviceWidth } from '../common/Dimens';
import { colors } from '../common/Colors';
import { Fonts } from '../common/Fonts';

const InviteFriendsScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.headerText}>Invite your Friends</Text>

            {/* Reward Section */}
            <ImageBackground
                source={Images.referBack}
                resizeMode="contain"
                style={styles.rewardContainer}
            >
                <Text style={styles.rewardText}>Earn up to ₹50 per friend you INVITE to RIDE24</Text>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeText}>RIDE24KAR1</Text>
                </View>
            </ImageBackground>

            {/* Invite Section */}
            <View style={styles.inviteContainer}>
                <View style={styles.inviteHeader}>
                    <Image
                        source={Images.referGift}
                        style={styles.icon}
                    />
                    <Text style={styles.inviteTitle}>Invite Friends to Ride24</Text>
                    <TouchableOpacity>
                        <Text style={styles.inviteButtonText}>INVITE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inviteFooter}>
                    <Text style={styles.inviteFooterText}>• Refer friends & earn ride offers on Ride24
                    </Text>
                </View>
            </View>

            {/* How It Works Section */}
            <Text style={styles.sectionHeader}>How It Works?</Text>
            <View style={styles.card}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardText}>Your friend completes 1 order</Text>
                    <Text style={styles.cardSubtext}>within 7 days of registration</Text>
                </View>
                <View style={styles.cardRewardContainer}>
                    <Text style={styles.rewardLabel}>You earn</Text>
                    <Text style={styles.rewardValue}>₹50</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    rewardContainer: {
        width: deviceWidth(90),
        height: deviceHeight(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    rewardText: {
        fontSize: 17,
        textAlign: 'center',
        color: colors.black,
        fontFamily: Fonts.ibmsemibold,
    },
    codeContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    codeText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    inviteContainer: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    inviteHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    icon: {
        width: 24,
        height: 24,
    },
    inviteTitle: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    inviteButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    inviteFooter: {
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        padding: 8,
    },
    inviteFooterText: {
        fontSize: 12,
        color: '#6C757D',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardTextContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f9f9f9',
    },
    cardText: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardSubtext: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    cardRewardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    rewardLabel: {
        fontSize: 14,
        color: 'green',
        fontWeight: '500',
    },
    rewardValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default InviteFriendsScreen;
