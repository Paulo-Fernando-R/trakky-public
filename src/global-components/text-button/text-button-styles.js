import { StyleSheet } from "react-native";
import AppTexts from "../../global-styles/app-texts";
import AppColors from "../../global-styles/app-colors";
const styles = StyleSheet.create({
    textButton: {
        ...AppTexts.instance.paragraph2Regular,
        color: AppColors.instance.accentDefault,
    },
});

export default styles;
