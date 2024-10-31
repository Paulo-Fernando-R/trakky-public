import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";

const styles = StyleSheet.create({
    input: {
        height: 60,
        backgroundColor: AppColors.instance.bgMedium,
        borderRadius: 20,
        justifyContent: "space-between",
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
    },

    textInput: {
        ...AppTexts.instance.paragraph1Regular,

        height: "100%",
        flex: 1,
        paddingLeft: 20,
        color: AppColors.instance.textMediumLight,
    },
});

export default styles;
