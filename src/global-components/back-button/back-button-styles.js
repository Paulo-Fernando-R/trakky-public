import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: AppColors.instance.bgMedium,
        height: 40,
        width: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;
