import { StyleSheet } from "react-native";
import AppColors from "../../../..//global-styles/app-colors";
import AppTexts from "../../../../global-styles/app-texts";

const bottomSheetStyles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#181B1F",
        gap: 16,
    },
    backButton: {
        marginLeft: 20,
    },
    modalBody: {
        backgroundColor: "#272A2E",
        flex: 1,
        // top: "3%",

        width: "100%",
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        alignItems: "center",
    },
    slideDown: {
        backgroundColor: "white",
        width: "15%",
        height: 5,
        marginTop: 20,
        borderRadius: 20,
    },
    header: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingTop: 20,
        width: "92%",
        marginHorizontal: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#565656B2",
    },
    headerText: {
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textMediumLight,
        fontSize: 14,
        marginBottom: "2%",
    },
    originPlace: {
        paddingVertical: "3%",
        marginBottom: "3%",
        flexDirection: "row",
        alignItems: "center",
    },
    originText: {
        ...AppTexts.instance.head1Bold,
        fontSize: 20,
        paddingBottom: "1%",

        marginLeft: "3%",
    },

    body: {
        marginTop: "5%",
        justifyContent: "space-between",
        width: "92%",
        height: "70%",
    },

    bodyInfos: {
        alignItems: "flex-start",
        width: "100%",
    },
    bodyTexts: {
        ...AppTexts.instance.paragraph1Regular,
        color: "#858585",
        fontSize: 14,

        width: "100%",
        marginBottom: "4%",
    },

    copyContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        backgroundColor: AppColors.instance.bgDark,
        borderRadius: 16,
        marginTop: 20,
        width: "100%",
    },

    copyText: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textLight,
        flex: 1,
    },

    buttonContainer: {
        borderRadius: 18,
        overflow: "hidden",
        height: "12%",
    },

    buttonDisabled: {
        backgroundColor: AppColors.instance.strokeLight,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        backgroundColor: AppColors.instance.primaryDefault,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        ...AppTexts.instance.head1Bold,
        fontWeight: "100",
        fontSize: 16,
    },
});

export default bottomSheetStyles;
