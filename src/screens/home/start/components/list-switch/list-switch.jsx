import React from "react";
import { Text, View } from "react-native";
import styles from "./list-switch-styles";
import ListSwitchEnum from "../../../../../data/enums/list-switch-enum";

export default function ListSwitch({ handleListType, activeOption }) {
    return (
        <View style={styles.listSwitch}>
            <Text
                style={
                    activeOption === ListSwitchEnum.inTransport
                        ? styles.listSwitchOptionActive
                        : styles.listSwitchOptionInactive
                }
                onPress={() => {
                    handleListType(ListSwitchEnum.inTransport);
                }}
            >
                Em transporte
            </Text>

            <Text
                style={
                    activeOption === ListSwitchEnum.complete
                        ? styles.listSwitchOptionActive
                        : styles.listSwitchOptionInactive
                }
                onPress={() => {
                    handleListType(ListSwitchEnum.complete);
                }}
            >
                Concluído
            </Text>
        </View>
    );
}
