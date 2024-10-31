import { Dimensions, StyleSheet } from "react-native";
import AppColors from "../../../global-styles/app-colors";
import AppTexts from "../../../global-styles/app-texts";

const styles = StyleSheet.create({
    page: {
        backgroundColor: AppColors.instance.bgDark,
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 100,
        rowGap: 16,
    },
    listsCntainer: {
        paddingTop: 10,
        rowGap: 16,
    },
    listConatiner: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 20,
        paddingVertical: 10,
    },
    emptyBox: {
        flex: 1,
        height: Dimensions.get("window").height - 280,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        ...AppTexts.instance.head2Regular,
        color: AppColors.instance.textMediumLight,
        textAlign: "center",
        width: "80%",
    },
});

export default styles;
