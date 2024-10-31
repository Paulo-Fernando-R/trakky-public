import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";
const styles = StyleSheet.create({
    modalLayout: { justifyContent: "center", alignItems: "center", flex: 1 },
    modalAppearence: {
        backgroundColor: AppColors.instance.bgMedium,
        borderRadius: 20,
        padding: 30,
        width: "80%",
        minHeight: 200,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        elevation: 5,
        justifyContent: "space-between",

        rowGap: 20,
    },
    modalButton: {
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: AppColors.instance.primaryDark,
    },
    modalText: { ...AppTexts.instance.paragraph1Regular, textAlign: "center", lineHeight:20 },
});

export default styles;
