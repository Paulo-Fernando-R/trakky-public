import { StyleSheet } from "react-native";
import AppColors from "../../../global-styles/app-colors";
import AppTexts from "../../../global-styles/app-texts";
const styles = StyleSheet.create({
    page: {
        paddingTop: 70,
        backgroundColor: AppColors.instance.bgDark,
    },
    titleContainer: {
        paddingHorizontal: 20,
        rowGap: 20,
    },
    title: {
        ...AppTexts.instance.head1Bold,
        height: 44,
    },
    subTitle: {
        ...AppTexts.instance.paragraph1Regular,
        height: 22,
    },
    body: {
        paddingHorizontal: 20,
        rowGap: 20,
    },
    infoBox: {
        marginTop: 16,
        paddingHorizontal: 12,
        paddingVertical: 20,
        gap: 16,
        backgroundColor: AppColors.instance.bgMedium,
        borderRadius: 14,
    },

    infoLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        alignItems: "center",
    },

    infoLineLeft: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    infoLineLeftText: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textMediumLight,
    },
    infoLineRightText: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textMediumLight,
    },

    infoEdit: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    infoEditText: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.accentDefault,
    },
    infoEditPress: {
        flexDirection: "row",
        columnGap: 4,
        alignItems: "center",
        paddingHorizontal:8,
        paddingVertical: 4,
        borderRadius:100
    },

    logoutBox: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        justifyContent: "center",
        backgroundColor: AppColors.instance.bgMedium,
        borderRadius: 14,
    },
    logout: {
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textMediumLight,
    },
    logoutIcon: {
        width: 24,
        transform: [{ rotateZ: "180deg" }],
    },

    explainText:{
        ...AppTexts.instance.subtitle1Regular,
        color: AppColors.instance.textMediumLight,
        textAlign: "center",
        lineHeight: 16
    },
    licenses:{
        alignItems:"center",
        marginTop: 20
    }
});

export default styles;
