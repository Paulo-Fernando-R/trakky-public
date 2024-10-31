import { Dimensions, StyleSheet } from "react-native";
import AppColors from "../../../global-styles/app-colors";
import AppTexts from "../../../global-styles/app-texts";
const deliverieStyles = StyleSheet.create({
    pageRoot: {},
    page: {},
    bodyNoLogin: {
        paddingHorizontal: 20,
        paddingTop: 100,
        paddingBottom: 12,
        rowGap: 16,
        minHeight: Dimensions.get("window").height - 60,
    },
    titleContainer: {
        rowGap: 16,
    },
    title: {
        ...AppTexts.instance.head1Bold,
    },
    subTitle: {
        ...AppTexts.instance.subtitle1Regular,
        color: AppColors.instance.textMediumLight,
        textAlign: "left",
    },
    body: {
        paddingHorizontal: 20,
        rowGap: 16,
    },
    grid: {
        height: Dimensions.get("window").height - 280,
        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 15,
    },
    gridText: {
        ...AppTexts.instance.head2Regular,
        color: AppColors.instance.textMediumLight,
        textAlign: "center",
        width: "80%",
        paddingBottom: 12,
    },
});

export default deliverieStyles;
