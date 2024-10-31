/* eslint-disable react/prop-types */
import React from "react";
import MaskInput, { Masks } from "react-native-mask-input";
import AppColors from "../../global-styles/app-colors";
import styles from "./input-default-styles";
import { View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

/**
 * Generates a function comment for the given function body.
 *
 * @param  inputDefault - An object containing the following properties:
 *  - placeholder (string): The placeholder text for the input field (default: "").
 *  - text (string): The text value of the input field (default: "").
 *  - setText (function): A function to update the text value of the input field (default: "").
 *  - password (boolean): A flag indicating whether the input field is a password field (default: false).
 *  - mask (undefined): The mask for the input field (default: undefined).
 *  - error (boolean): A flag indicating whether there is an error with the input field (default: false).
 * @return {JSX.Element} - The JSX element representing the input component.
 */
export default function InputDefault({
    placeholder = "",
    text = "",
    setText = "",
    password = false,
    mask = undefined,
    error = false,
}) {
    const [showText, setShowText] = useState(password);

    return (
        <View style={error? styles.inputError: styles.input}>
            <MaskInput
                style={error ? styles.error : styles.textInput}
                placeholderTextColor={AppColors.instance.textMediumLight}
                placeholder={placeholder}
                value={text}
                onChangeText={(masked, unmasked) => {
                    setText(mask === Masks.DATE_DDMMYYYY ? masked : unmasked);
                }}
                mask={mask}
                secureTextEntry={showText}
            />
            {password ? (
                <Ionicons
                    onPress={() => {
                        setShowText(!showText);
                    }}
                    name="eye"
                    size={20}
                    color={AppColors.instance.textMediumLight}
                />
            ) : (
                <></>
            )}
        </View>
    );
}
