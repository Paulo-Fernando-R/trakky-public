import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";

const styles = StyleSheet.create({
    map: {
        flex: 1,
        marginTop: -55,
        marginRight: -55,
        marginBottom: -40,
    },

    licenseBox: {
        backgroundColor: "#393939",
        height: 34,
        marginTop: -34,
        marginBottom: -1,
       
        zIndex: 100,
        alignSelf: "flex-end",
        borderTopStartRadius: 8,
       
        paddingTop: 2,
        paddingLeft: 6,
        paddingRight: 10,
        paddingBottom: 2,
        alignItems: "flex-end",
    },

    boxLine: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
    text: {
        fontSize: 10,
        color: AppColors.instance.textLight,
    },
    link: {
        color: AppColors.instance.accentDefault,
        fontSize: 10,
        textDecorationStyle: "solid",
        textDecorationLine: "underline",
    },
});

export default styles;
