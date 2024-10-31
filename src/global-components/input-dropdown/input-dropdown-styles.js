import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    box: {
        backgroundColor: AppColors.instance.bgMedium,
        borderWidth: 0,
        height: 60,
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    input: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textMediumLight,
        borderWidth: 0,
    },
    inputSearch: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textMediumLight,
        backgroundColor: AppColors.instance.bgDark,
        borderWidth: 0,
        borderRadius: 12,
    },
    list: {
        backgroundColor: AppColors.instance.bgMedium,
        borderRadius: 20,
        borderColor: AppColors.instance.strokeLight,
        borderWidth: 0,
    },

    boxError: {
        backgroundColor: AppColors.instance.bgMedium,
        borderColor: "#DF4141",
        borderWidth: 1,
        borderStyle: "solid",
        height: 60,
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 20,
    },
});

export default styles;
