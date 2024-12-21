import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styling } from '../common/Styling';
import { Fonts } from '../common/Fonts';
import { colors } from '../common/Colors';
import { deviceHeight, deviceWidth } from '../common/Dimens';
import { Images } from '../common/Images';
import Button from '../common/Button';

const PaymentScreenOne = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');

    const predefinedAmounts = [100, 200, 500, 1000];

    const handleAmountSelect = (value) => {
        setAmount(value.toString());
    };

    return (
        <KeyboardAvoidingView
            style={styling.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <View style={styles.sectionContainer}>
                    <Text style={styling.texthead}>Ride24 Wallet</Text>
                    <Text style={styling.textsub1}>It's quick, safe, and secure</Text>

                    {/* Wallet Section */}
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.walletContainer}>
                            <View>
                                <Text style={styles.walletTitle}>Ride24 Wallet</Text>
                                <Text style={styles.walletSubtitle}>Available Balance</Text>
                            </View>
                            <Text style={styles.walletAmount}>₹0.00</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Recharge Section */}
                    <View style={styles.optionContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Recharge')}
                            activeOpacity={0.8}
                        >
                            <View>
                                <Text style={styles.optionTitle}>Recharge</Text>
                                <Text style={styles.optionSubtitle}>Add money to your wallet</Text>
                            </View>
                        </TouchableOpacity>
                        <Image source={Images.arrow} />
                    </View>
                    <Image style={styles.separator} source={Images.lineGap} />

                    {/* Transaction History Section */}
                    <View style={styles.optionContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TransactionHistory')}
                            activeOpacity={0.8}
                        >
                            <View>
                                <Text style={styles.optionTitle}>Transaction History</Text>
                                <Text style={styles.optionSubtitle}>View your past transactions</Text>
                            </View>
                        </TouchableOpacity>
                        <Image source={Images.arrow} />
                    </View>
                    <Image style={styles.separator} source={Images.lineGap} />

                    {/* Other Payments */}
                    <Text style={styles.otherPaymentsHeader}>Other Payments</Text>
                    <View>
                        <View style={styles.paymentMethodContainer}>
                            <Image source={Images.payment} style={styles.paymentIcon} />
                            <Text style={styles.paymentText}>Cash</Text>
                        </View>
                        <Image style={styles.separator} source={Images.lineGap} />

                        <View style={styles.paymentMethodContainer}>
                            <Image source={Images.upi} style={styles.paymentIcon} />
                            <Text style={styles.paymentText}>UPI</Text>
                        </View>
                        <Image style={styles.separator} source={Images.lineGap} />
                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate('PaymentHistory') }}>
                        <Button text={'Payment History'} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal Section */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Recharge Wallet</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.currencySymbol}>₹</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Amount"
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                            />
                        </View>
                        <View style={styles.amountOptions}>
                            {predefinedAmounts.map((value) => (
                                <TouchableOpacity
                                    key={value}
                                    style={styles.amountButton}
                                    onPress={() => handleAmountSelect(value)}
                                >
                                    <Text style={styles.amountText}>₹ {value}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity

                            activeOpacity={0.8}
                            onPress={() => setModalVisible(false)}
                        >

                            <Button text={'Continue'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default PaymentScreenOne;

const styles = StyleSheet.create({
    sectionContainer: {
        margin: 10,
        gap: 10,
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightgray,
        height: deviceHeight(10),
        borderRadius: 20,
        padding: 10,
    },
    walletTitle: {
        color: colors.black,
        fontSize: deviceHeight(1.9),
        fontFamily: Fonts.ibmsemibold,
    },
    walletSubtitle: {
        color: colors.text,
        fontSize: deviceHeight(1.9),
        fontFamily: Fonts.ibmmedium,
    },
    walletAmount: {
        color: 'black',
        fontSize: deviceHeight(2.5),
        fontFamily: Fonts.ibmbold,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    optionTitle: {
        color: colors.black,
        fontSize: deviceHeight(1.9),
        fontFamily: Fonts.ibmsemibold,
    },
    optionSubtitle: {
        color: colors.text,
        fontSize: deviceHeight(1.9),
        fontFamily: Fonts.ibmmedium,
    },
    separator: {
        width: deviceWidth(90),
        height: deviceHeight(0.2),
        alignSelf: 'center',
        marginVertical: deviceHeight(1),
    },
    otherPaymentsHeader: {
        color: 'black',
        fontSize: deviceHeight(2),
        fontFamily: Fonts.ibmbold,
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginLeft: deviceWidth(5),
    },
    paymentIcon: {
        width: deviceWidth(7),
        height: deviceHeight(7),
        resizeMode: 'contain',
    },
    paymentText: {
        color: 'black',
        fontSize: deviceHeight(2),
        fontFamily: Fonts.ibmmedium,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    currencySymbol: {
        fontSize: 18,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    amountOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    amountButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    amountText: {
        fontSize: 16,
    },
    continueButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
