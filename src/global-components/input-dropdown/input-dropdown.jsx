import React from "react";
import styles from "./input-dropdown-styles";
import { Dropdown } from "react-native-searchable-dropdown-kj";
import AppColors from "../../global-styles/app-colors";

/**
 * Function for rendering an input dropdown component.
 *
 * @param  placeholder - the placeholder for the input dropdown
 * @param  data - the data to populate the dropdown
 * @param value - the selected value in the dropdown
 * @param  setValue - callback function to set the selected value
 * @return {JSX.Element} - the rendered input dropdown component
 */
export default function InputDropdown({ placeholder, data, setValue, value, error = false }) {

    return (
        <Dropdown
            placeholder={placeholder}
            search={true}
            value={value.value}
            onChange={(value) => setValue(value)}
            data={data}
            labelField="label"
            valueField="value"
            style={error? styles.boxError: styles.box}
            placeholderStyle={styles.input}
            selectedTextStyle={styles.input}
            containerStyle={styles.list}
            searchPlaceholder="Pesquisar..."
            inputSearchStyle={styles.inputSearch}
            activeColor={AppColors.instance.primaryDark}
        />
    );
}
