/* eslint-disable react/prop-types */
import React from "react";
import { Modal, View, Text, TouchableHighlight } from "react-native";
import AppColors from "../../global-styles/app-colors";
import styles from "./info-modal-styles";

/**
 * Renders an InfoModal component with the given visibility, message, and function to set visibility.
 *
 * @param  visible - The visibility of the modal
 * @param  setVisible - The function to set the visibility of the modal
 * @param  message - The message to be displayed in the modal
 * @return {JSX.Element} The rendered InfoModal component
 */
export default function InfoModal({ visible, setVisible, message }) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalLayout}>
                <View style={styles.modalAppearence}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableHighlight
                        underlayColor={AppColors.instance.primaryDefault}
                        style={styles.modalButton}
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.modalText}>Fechar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}
