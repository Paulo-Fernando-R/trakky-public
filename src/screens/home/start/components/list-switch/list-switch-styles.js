import { StyleSheet } from "react-native";
import AppColors from "../../../../../global-styles/app-colors";
import AppTexts from "../../../../../global-styles/app-texts";

const styles = StyleSheet.create({
    listSwitch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
        columnGap: 16,
    },
    listSwitchOptionActive: {
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.accentDefault,
    },
    listSwitchOptionInactive: {
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textLight,
    },
});

export default styles;
