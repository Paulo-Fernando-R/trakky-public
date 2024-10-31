import { StyleSheet } from "react-native";
import AppColors from "../../../global-styles/app-colors";
// eslint-disable-next-line no-unused-vars
import AppTexts from "../../../global-styles/app-texts";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
    body: {
        rowGap: 16,
        backgroundColor: AppColors.instance.bgDark,
        flex: 1,
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 64,
       
    },
    mapContainer: {
        backgroundColor: AppColors.instance.textLight,
        borderRadius: 16,
        height: Dimensions.get("window").height / 2.1,
        marginHorizontal: 8,
        overflow: "hidden"
    },
    infoContainer: {
        backgroundColor: AppColors.instance.bgMedium,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 10,
        shadowOpacity: 1,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowRadius: 10,
        padding: 20,
    },
    infoContainerContent: {
        alignItems: "center",
        rowGap: 16,
        paddingBottom: 40,
    },
    infoContainerLine: {
        width: 60,
        height: 3,
        backgroundColor: AppColors.instance.textLight,
        borderRadius: 8,
    },
    infoContainerTitleBox: {
        width: "100%",
        rowGap: 16,
    },
    infoContainerTitle1: {
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textMediumLight,
    },
    infoContainerTitle2Box: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
        paddingBottom: 16,
        borderBottomColor: AppColors.instance.strokeLight,
        borderBottomWidth: 1,
    },
    infoContainerTitle2: {
        ...AppTexts.instance.head2Bold,
        color: AppColors.instance.textLight,
    },
    infoContainerInfoBox: {
        width: "100%",
        rowGap: 8,
    },
    infoContainerInfoText1: {
        ...AppTexts.instance.paragraph1Regular,
        color: AppColors.instance.textMediumLight,
    },
    infoContainerInfoText2: {
        ...AppTexts.instance.subtitle1Regular,
        color: AppColors.instance.textMediumLight,
        lineHeight: 12
    },
    buttonBox: {
        width: "100%",
        paddingTop: 10,
        justifyContent: "flex-end",
    },
});

export default styles;
