import { StyleSheet } from "react-native";
import AppTexts from "../../../../global-styles/app-texts";
import AppColors from "../../../../global-styles/app-colors";
const noContentStyles = StyleSheet.create({

    body: {
        marginTop: "25%",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        ...AppTexts.instance.head2Regular,
        padding: 2,
        fontSize: 12,
        color: AppColors.instance.textMediumLight,
        marginBottom: "10%"

    }
})

export default noContentStyles