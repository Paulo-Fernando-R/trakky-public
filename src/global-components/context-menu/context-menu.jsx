import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import styles from "./context-menu-styles";
import AppColors from "../../global-styles/app-colors";

export default function ContextMenu({ action = () => {}, visible = false, close = () => {} }) {
    return (
        <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={close}>
            <TouchableOpacity activeOpacity={1} onPressOut={close} style={styles.dismissArea}>
                <BlurView intensity={80}  tint="systemMaterialDark" style={styles.dismissBlur}></BlurView>
            </TouchableOpacity>

            <View style={styles.menuView}>
                <Text style={styles.menuTitle}>Opções</Text>

                <View style={styles.menuItens}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.menuItem}
                        onPress={() => action(0)}
                    >
                        <Text style={styles.menuItemText}>Editar Entrega</Text>
                        <AntDesign
                            name="edit"
                            size={24}
                            color={AppColors.instance.textMediumLight}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.menuItem}
                        onPress={() => action(1)}
                    >
                        <Text style={styles.menuItemText}>Excluir Entrega</Text>
                        <MaterialIcons
                            name="delete-outline"
                            size={24}
                            color={AppColors.instance.textMediumLight}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
