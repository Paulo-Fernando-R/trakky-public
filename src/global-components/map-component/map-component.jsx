/* eslint-disable react/prop-types */
import React from "react";
import { WebView } from "react-native-webview";
import styles from "./map-component-styles";
import { View, Text, Linking, TouchableHighlight } from "react-native";

/**
 * Renders a map component with the given latitude and longitude.
 *
 * @param  latitude - The latitude value for the map location
 * @param  longitude - The longitude value for the map location
 * @return {JSX.Element} A WebView component displaying the map with the provided latitude and longitude
 */
export default function MapComponent({ latitude, longitude }) {
    
    // eslint-disable-next-line no-undef
    const baseUrl = process.env.EXPO_PUBLIC_MAP_BASE_URL;
    const uri = baseUrl.replaceAll("/*LAT*/", latitude).replaceAll("/*LONG*/", longitude);

    const date = new Date(Date.now());
    const license1 = "https://www.openstreetmap.org/";
    const license2 = "https://www.openstreetmap.org/copyright";

    function navigate(url) {
        // eslint-disable-next-line no-undef
        Linking.openURL(url).catch((err) => console.log(err));
    }

    return (
        <>
            <WebView
                cacheEnabled={true}
                cacheMode="LOAD_CACHE_ELSE_NETWORK"
                style={styles.map}
                source={{ uri: uri }}
            />
            <View style={styles.licenseBox}>
                <View style={styles.boxLine}>
                    <Text style={styles.text}>Map data from</Text>
                    <TouchableHighlight onPress={() => navigate(license1)}>
                        <Text style={styles.link}>OpenStreetMap</Text>
                    </TouchableHighlight>
                    <Text style={styles.text}>{date.toDateString()}</Text>
                </View>

                <View style={styles.boxLine}>
                    <Text style={styles.text}>©</Text>
                    <TouchableHighlight onPress={() => navigate(license2)}>
                        <Text style={styles.link}>OpenStreetMap</Text>
                    </TouchableHighlight>
                    <Text style={styles.text}>contributors</Text>
                </View>
            </View>
        </>
    );
}
