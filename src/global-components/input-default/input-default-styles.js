import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";

const styles = StyleSheet.create({
    input: {
        height: 60,
        backgroundColor: AppColors.instance.bgMedium,
        borderRadius: 20,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
    },

    textInput: {
        ...AppTexts.instance.paragraph1Regular,
        maxWidth: "90%",
        width: "90%",

        color: AppColors.instance.textMediumLight,
    },

    error: {
        ...AppTexts.instance.paragraph1Regular,
        maxWidth: "90%",
        width: "90%",

        color: "#DF4141",
    },
    inputError: {
        height: 60,
        backgroundColor: AppColors.instance.bgMedium,
        borderRadius: 20,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
        borderColor: "#DF4141",
        borderWidth: 1,
        borderStyle: "solid",
    },
});

export default styles;
