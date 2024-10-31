import React from "react";
import ilustration from "../../../../../assets/images/empty-image.png";
import { View, Text, Image } from "react-native";
import styles from "./body-without-itens-styles";
import { Octicons } from '@expo/vector-icons';
import AppColors from "../../../../../global-styles/app-colors";

export default function BodyWithoutItens() {
    return (
        <View style={styles.bodyWitoutItens}>
            {/* <Image style={styles.emptyImage} source={ilustration} /> */}
            <Octicons name="shield-x" size={100} color={AppColors.instance.strokeLight} />
            <Text style={styles.emptyText}>
                Sem dados para ver ainda. Faça login ou salve Rastreamentos para vê-los aqui.
            </Text>
        </View>
    );
}
