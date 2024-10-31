import React from "react";
import { View, Text, ScrollView } from "react-native";
import deliverieStyles from "./deliveries-without-auth-styles.js";
import { MaterialIcons } from "@expo/vector-icons";
import AppColors from "../../../global-styles/app-colors.js";
import TextButton from "../../../global-components/text-button/text-button.jsx";

export default function DeliveriesWithoutAuth({ navigation }) {
    function navigate() {
        navigation.navigate("Profile");
    }
    return (
        <ScrollView style={deliverieStyles.page} contentContainerStyle={deliverieStyles.bodyNoLogin}>
            <View style={deliverieStyles.titleContainer}>
                <Text style={deliverieStyles.title}>Minhas Entregas</Text>
                <Text style={deliverieStyles.subTitle}>
                    Esta seção é destinada apenas para usuários que desejam realizar entregas.
                </Text>
            </View>

            <View style={deliverieStyles.grid}>
                <MaterialIcons name="dashboard" size={100} color={AppColors.instance.strokeLight} />

                <Text style={deliverieStyles.gridText}>Faça login para acessar suas entregas</Text>
                <TextButton title="Ir para Login" action={navigate} />
            </View>
        </ScrollView>
    );
}
