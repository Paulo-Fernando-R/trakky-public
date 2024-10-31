import { StyleSheet, Dimensions } from "react-native";
import AppColors from "../../../global-styles/app-colors";
import AppTexts from "../../../global-styles/app-texts";
const deliverieStyles = StyleSheet.create({
    pageRoot: {},
    page: {
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
        height: "auto",
        color: AppColors.instance.textMediumLight,

        textAlign: "left",
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingVertical: 15,

        columnGap: 8,
        rowGap: 20,
        flex: 1,
    },
});

export default deliverieStyles;
