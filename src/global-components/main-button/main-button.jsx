
import { Text, TouchableOpacity } from "react-native";
import styles from "./main-button-styles";
import React from "react";

/**
 * Renders a main button component with a given title and action.
 *
 * @param  title - The title of the button.
 * @param  action - The action to be performed when the button is pressed.
 * @return {React.ReactNode} The rendered main button component.
 */
// eslint-disable-next-line react/prop-types
export default function MainButton({ title = "", action = () => {} }) {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.mainButton} onPress={() => action()}>
            <Text style={styles.mainButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}
