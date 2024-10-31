import { StyleSheet } from "react-native";
import AppColors from "../../global-styles/app-colors";
import AppTexts from "../../global-styles/app-texts";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
    page:{
        backgroundColor: AppColors.instance.bgDark,
    }, 

    header:{
        paddingTop: 64,
        paddingBottom: 10,
    },
    body: {
        paddingHorizontal: 20,
       
        paddingBottom: 12,
        rowGap: 16,
        minHeight: Dimensions.get("window").height - 60,
    },
    title:{
        ...AppTexts.instance.head1Bold
    },

    flexView:{
        flex: 1,
    },

    section: {
        rowGap: 16,
        paddingTop: 12,
        paddingVertical: 10,
    },
    sectionTitle:{
        ...AppTexts.instance.paragraph1Bold,
        color: AppColors.instance.textLight,
        paddingLeft: 8,
        lineHeight: 16
    },

    inputBox:{
        gap: 10,
        //paddingVertical: 10,
      
    }
});

export default styles;
