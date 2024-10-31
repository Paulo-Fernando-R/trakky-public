import { Dimensions, StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";

const styles = StyleSheet.create({
    page: {
        backgroundColor: AppColors.instance.bgDark,
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 100,
        paddingBottom: 12,
        rowGap: 16,
        minHeight: Dimensions.get("window").height - 60,
    },

    section: {
        rowGap: 16,
        paddingTop: 12
    },
    sectionTitle:{
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textLight,
        paddingLeft: 8,
        lineHeight: 16
    },

    title: {
        ...AppTexts.instance.head1Bold,
        color: AppColors.instance.textLight,
    },

    subtitle: {
        ...AppTexts.instance.subtitle1Regular,
        color: AppColors.instance.textMediumLight,
    },

    form: {
        gap: 10,
        paddingVertical: 10,
        flex: 1,
    },
});

export default styles;
