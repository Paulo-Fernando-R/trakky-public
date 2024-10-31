import { StyleSheet } from "react-native";
import AppColors from "../../../global-styles/app-colors";
import AppTexts from "../../../global-styles/app-texts";

const styles = StyleSheet.create({
    page: {
        backgroundColor: AppColors.instance.bgDark,
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 12,
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
    bodyWitoutItens: {
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
    emptyImage: {
        width: 250,
        height: 250,
        objectFit: "contain",
    },
    emptyText: {
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textMediumLight,
        textAlign: "center",

    },
});

export default styles;
