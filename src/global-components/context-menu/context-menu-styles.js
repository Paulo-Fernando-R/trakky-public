import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";
const styles = StyleSheet.create({

    dismissArea: {
        zIndex: 100,
        flex: 1,
    },
    dismissBlur:{
      // backgroundColor: "red", 
       flex: 1
    },

    menuView: {
        height: 200,
        backgroundColor: "#000",
        elevation: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 24,
        gap: 30
    },

    menuTitle:{
        ...AppTexts.instance.paragraph1Bold
    },

    menuItens:{
        gap:16
    },

    menuItem:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomColor: AppColors.instance.strokeLight,
        borderBottomWidth: 1
    },

    menuItemText:{
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textMediumLight
    }
});
export default styles;
