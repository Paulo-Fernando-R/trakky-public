import AppTexts from "../../global-styles/app-texts";
import AppColors from "../../global-styles/app-colors";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainButton: {
        height: 60,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: AppColors.instance.primaryDefault,
    },
    mainButtonText: {
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textLight,
    },
});

export default styles;
