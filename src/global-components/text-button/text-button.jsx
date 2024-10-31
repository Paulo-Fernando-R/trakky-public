import React from "react";
import { TouchableHighlight, Text } from "react-native";
import styles from "./text-button-styles";
/**
 * Renders a text button with a given title and action.
 *
 * @param  title - The title of the button.
 * @param  action - The function to be called when the button is pressed.
 * @return  The rendered text button component.
 */
export default function TextButton({ title = "", action = () => {} }) {
    return (
        <TouchableHighlight activeOpacity={0.5}>
            <Text onPress={action} style={styles.textButton}>
                {title}
            </Text>
        </TouchableHighlight>
    );
}
