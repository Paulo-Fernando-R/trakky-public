import React from "react";
import styles from "./licenses-styles";
import licenses from "../../../licenses.json";
import { View, Text, Linking, TouchableHighlight, FlatList } from "react-native";
import BackButton from "../../global-components/back-button/back-button";

export default function Licenses({ navigation }) {
    const list = JSON.parse(JSON.stringify(licenses));
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <BackButton action={() => navigation.pop()} />
            </View>

            <FlatList contentContainerStyle={styles.content} data={list} renderItem={LicenseItem} />
        </View>
    );
}

function LicenseItem({ item }) {
    function navigate() {
        // eslint-disable-next-line no-undef
        Linking.openURL(item.url).catch((err) => console.log(err));
    }
    return (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.license}>{item.license}</Text>
            <Text style={styles.license}>{item.authors[0]}</Text>
            <TouchableHighlight onPress={navigate}>
                <Text style={styles.url}>{item.url}</Text>
            </TouchableHighlight>
        </View>
    );
}
