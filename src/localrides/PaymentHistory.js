import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const transactions = [
    { id: '1', type: 'Money Added', amount: '₹100', time: 'Nov 28 at 12:15 PM', success: true, source: require('../../assets/images/Up.png') },
    { id: '2', type: 'Money Added', amount: '₹100', time: 'Nov 28 at 12:15 PM', success: true, source: require('../../assets/images/Up.png') },
    { id: '3', type: 'Ride Payment', amount: '₹199', time: 'Nov 28 at 12:15 PM', success: false, source: require('../../assets/images/Down.png') },
];

const PaymentHistory = () => {
    const renderItem = ({ item }) => (
        <View style={styles.transactionContainer}>
            <Image source={item.source} style={styles.statusIcon} />
            <View style={styles.details}>
                <Text style={styles.tnxId}>Tnx ID: MB23102S7GBYK</Text>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={[styles.type, { color: item.success ? 'green' : 'red' }]}>{item.type}</Text>
            </View>
            <Text style={styles.amount}>{item.amount}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transaction History</Text>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    transactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statusIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    tnxId: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 12,
        color: '#666',
    },
    type: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PaymentHistory;
