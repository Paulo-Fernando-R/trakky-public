import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./list-item-styles";
import { FontAwesome5 } from "@expo/vector-icons";
import AppColors from "../../global-styles/app-colors";

export default function ListItem({
    title = "",
    lasUpdate = "",
    deliveryId = 0,
    navigate = (_item) => {_item},
}) {

    //!ADICIONAR ESTE TRECHO NOVAMENTE QUANDO AJUSTAR A TELA INICIAL
    // if (!title || !lasUpdate || !deliveryId) {
    //     return <></>;
    // }

    return (
        <Pressable style={styles.listItem} onPress={() => navigate(deliveryId)}>
            <View style={styles.iconBox}>
                <FontAwesome5
                    name="shipping-fast"
                    size={68}
                    color={AppColors.instance.accentMedium}
                />
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                    {title ?? ""}
                </Text>
                <Text style={styles.itemDate}>{lasUpdate}</Text>
            </View>
        </Pressable>
    );
}
