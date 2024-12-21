import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Images } from "../common/Images";
import { styling } from "../common/Styling";
import { colors } from "../common/Colors";
import { deviceHeight, deviceWidth } from "../common/Dimens";

const SosCall = () => {
    return (
        <View style={styles.container}>
            <Text style={styling.texthead}>SOS Call</Text>
            <Text style={styling.textsub}>
                Ride24 Safety Response Team will contact you immediately and collects location data during an active booking form your device in case you raise an alert.
            </Text>

            {/* Headset Icon */}
            <View style={styles.iconContainer}>
                <Image
                    source={Images.alert} // Replace with your headset icon
                    style={styles.icon}
                    resizeMode='contain'
                />
            </View>

            {/* Buttons */}
            <TouchableOpacity style={styles.customerCareButton}>
                <Text style={styles.buttonText}>Police Control Room</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sosButton}>
                <Text style={styles.buttonText}>Alert Emergency Contact</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
        rowGap: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        // marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
    },
    iconContainer: {
        marginBottom: deviceHeight(30),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: deviceWidth(30),
        height: deviceWidth(30),
        tintColor: "#ccc", // Optional styling for the icon color
    },
    customerCareButton: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "#E83434",
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 15,
    },
    sosButton: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: colors.black,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SosCall;













