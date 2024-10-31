import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";

const styles = StyleSheet.create({
    listItem: {
        height: 250,
        width: "47%",
        borderRadius: 20,
        borderColor: AppColors.instance.strokeLight,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        rowGap: 20,
    },
    iconBox: {
        width: 150,
        height: 150,
        backgroundColor: AppColors.instance.bgMedium,
        borderRadius: Number.MAX_SAFE_INTEGER,
        justifyContent: "center",
        alignItems: "center",
    },
    infoBox: {
        rowGap: 4,
        alignItems: "center",
    },
    itemTitle: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textLight,
        textAlign: "center",
        maxWidth: "90%",
    },
    itemDate: {
        ...AppTexts.instance.subtitle1Regular,
        color: AppColors.instance.textMediumLight,
        maxWidth: "90%",
    },
});

export default styles;
