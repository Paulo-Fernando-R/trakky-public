/* eslint-disable no-unused-vars */
import React from "react";
import { Alert, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import styles from "./search-input-styles";
import { MaterialIcons } from "@expo/vector-icons";
import AppColors from "../../global-styles/app-colors";

/**
 * Renders a search input component with optional placeholder, value, and event handlers.
 *
 * @param  placeholder - The text to display when the input is empty
 * @param  value - The value of the input
 * @param  onChangeText - The function to call when the input text changes
 * @param  active - Indicates whether the input is active
 * @param  inactivePressAction - The function to call when input is pressed while inactive
 * @param  searchPressAction - The async function to call when search icon is pressed
 * @return {ReactElement} A search input component
 */
export default function SearchInput({
    placeholder = "",
    value = "",
    onChangeText = (text) => {},
    active = true,
    inactivePressAction = () => {},
    searchPressAction = async () => {},
}) {
    return (
        <View style={styles.input}>
            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                placeholderTextColor={AppColors.instance.textMediumLight}
                value={value}
                onChangeText={onChangeText}
                onPressIn={active ? () => {} : inactivePressAction}
            />
            <MaterialIcons
                name="search"
                size={28}
                color={AppColors.instance.accentDefault}
                onPress={active ? searchPressAction : inactivePressAction}
            />
        </View>
    );
}
