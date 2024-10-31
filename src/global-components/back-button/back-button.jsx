/* eslint-disable react/prop-types */
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppColors from "../../global-styles/app-colors";
import styles from "./back-button-styles";

/**
 * Renders a back button component.
 *
 * @param  action - The action function to be performed when the button is pressed.
 * @return {ReactElement} A TouchableOpacity component representing the back button.
 */
export default function BackButton({ action }) {
    return (
        <TouchableOpacity style={styles.backButton} onPress={action} activeOpacity={0.6}>
            <MaterialIcons name="chevron-left" size={32} color={AppColors.instance.textLight} />
        </TouchableOpacity>
    );
}
