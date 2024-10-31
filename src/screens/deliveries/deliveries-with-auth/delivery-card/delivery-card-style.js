import { StyleSheet } from "react-native";
import AppColors from "../../../../global-styles/app-colors";
import AppTexts from "../../../../global-styles/app-texts";

const deliveryCardStyles = StyleSheet.create({
    cardInfoBox: {
        //height: "auto",
        ///rowGap: 8
        height: "auto",
    },
    cardTitle: {
        ...AppTexts.instance.paragraph1Regular,

        textAlign: "center",
        marginBottom: 8,
    },
    cardInfo: {
        ...AppTexts.instance.subtitle1Regular,
        color: AppColors.instance.textMediumLight,
        width: "auto",
        textAlign: "center",
        marginBottom: 6,
        height: "auto",
    },

    gridItem: {
        width: "48%", // Adjust the width to leave some space for margins
        padding:8,
        rowGap: 16,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#565656B2", // Add a background color or any other styling
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "flex-start",
        //minHeight: 330,
        
    },

    cardImageBox: {
        width: "90%",
        objectFit: "contain",
        aspectRatio: 1/1,
        backgroundColor: "#272A2E",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        padding: "3%",
    },
});

export default deliveryCardStyles;
