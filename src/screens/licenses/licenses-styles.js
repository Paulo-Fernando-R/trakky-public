import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";
const styles = StyleSheet.create({

    header:{
        paddingLeft: 10
    },
    body: {
        backgroundColor: AppColors.instance.bgDark,
        paddingTop: 64,
        paddingLeft: 10,
        paddingRight: 10,
        gap: 16,
    },
    content: {
        gap: 12,
        paddingLeft: 10,
        paddingRight: 10,
    },
    item: {
        backgroundColor: AppColors.instance.bgDark,
        borderRadius: 20,
        padding: 16,
        borderColor: AppColors.instance.strokeLight,
        borderWidth: 1,
        gap: 8,
    },

    name: {
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textLight,
    },
    license: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textMediumLight,
    },
    url: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.accentDefault,
        textDecorationLine: "underline",
    },
});

export default styles;
