import { Dimensions, StyleSheet } from "react-native";
import AppTexts from "../../../../global-styles/app-texts";
import AppColors from "../../../../global-styles/app-colors";

const styles = StyleSheet.create({
    header: {
        height: Dimensions.get("window").height / 3.5,
    },
    image: {
        objectFit: "cover",
        aspectRatio: 2 / 1,
        height: "100%",
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        paddingVertical: 30,
        paddingHorizontal: 20,
        justifyContent: "flex-end",
    },
    text: {
        ...AppTexts.instance.head1Bold,
        color: AppColors.instance.textLight,
    },
});

export default styles;
