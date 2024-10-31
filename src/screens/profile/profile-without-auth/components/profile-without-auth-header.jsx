import React from "react";
import { View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import map from "../../../../assets/images/map-image.png";
import styles from "./profile-without-auth-header-styles";


/**
 * Renders a profile without the authentication header.
 *
 * @param  title - The title of the profile
 * @return {JSX.Element} The profile without the authentication header
 */
export default function ProfileWithoutAuthHeader({ title = "" }) {
    return (
        <View style={styles.header}>
            <Image style={styles.image} source={map} />
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(24, 27, 31, 0.4)", "rgba(24, 27, 31, 1)"]}
            >
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </View>
    );
}
