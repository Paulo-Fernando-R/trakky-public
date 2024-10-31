import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import noContentStyles from "./no-content-style";
import AppColors from "../../../../global-styles/app-colors";

export default function NoContent() {
    return (
        <View style={noContentStyles.body}>
            <AntDesign name="warning" size={100} color={AppColors.instance.strokeLight} />
            <Text style={noContentStyles.text}>Sem entregas cadastradas para o usuário!</Text>
        </View>
    );
}
