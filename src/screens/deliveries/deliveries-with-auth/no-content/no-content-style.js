import { StyleSheet } from "react-native";
import AppTexts from "../../../../global-styles/app-texts";
import AppColors from "../../../../global-styles/app-colors";

const noContentStyles = StyleSheet.create({

    body: {
      
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
       
    },
    text: {
        ...AppTexts.instance.head2Regular,
        padding: 2,
        color: AppColors.instance.textMediumLight,
       textAlign: "center",
        width: "80%"

    }
})

export default noContentStyles