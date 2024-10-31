import { Dimensions, StyleSheet } from "react-native";
import AppColors from "../../../global-styles/app-colors";
import AppTexts from "../../../global-styles/app-texts";

const styles = StyleSheet.create({
    page: {
        backgroundColor: AppColors.instance.bgDark,
    },

    resetPage:{
        backgroundColor: AppColors.instance.bgDark,
        flex: 1,
        paddingTop: 56
    },

    pageContent: {
        justifyContent: "space-between",
    },

    body: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        rowGap: 35,
        justifyContent: "space-between",
        minHeight: Dimensions.get("window").height - (Dimensions.get("window").height / 3.5 + 110),
    },

    resetBody:{
        paddingHorizontal: 20,
        paddingBottom: 20,
        rowGap: 60,
        justifyContent: "space-between",
        flexGrow:1
    },

    titleBox: {
        rowGap: 12,
    },

    title: {
        ...AppTexts.instance.head2Regular,
        color: AppColors.instance.textMediumLight,
    },

    subtitle: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textMediumLight,
    },

    form: {
        rowGap: 10,
    },
    resetForm:{
        flexGrow: 1
    },

    actionBox: {
        alignItems: "center",
        rowGap: 16,
    },
});

export default styles;
