import { Dimensions, StyleSheet } from "react-native";
import AppColors from "../../../../../global-styles/app-colors";
import AppTexts from "../../../../../global-styles/app-texts";

const styles = StyleSheet.create({
    bodyWitoutItens: {
        height: Dimensions.get("window").height/1.8,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop:80,
        gap: 16
       
    },
    emptyImage: {
        width: 300,
        height: 300,
       marginTop: -16,
        objectFit: "contain",
    },
    emptyText: {
        ...AppTexts.instance.head2Regular,
        color: AppColors.instance.textMediumLight,
        textAlign: "center",
    },
});
export default styles;
