import React, { useState } from "react";
import { View, Text } from "react-native";
import ProfileWithoutAuthTypeEnum from "../../../../data/enums/profile-without-auth-type-enum";
import styles from "../profile-without-auth-styles";
import MainButton from "../../../../global-components/main-button/main-button";
import InputDefault from "../../../../global-components/input-default/input-default";
import ProfileResetController from "./profile-reset-controller";
import Spinner from "react-native-loading-spinner-overlay";
import InfoModal from "../../../../global-components/info-modal/info-modal";
import BackButton from "../../../../global-components/back-button/back-button";
import GenericScreenStateEnum from "../../../../data/enums/generic-screen-state-enum";

/**
 * Renders the profile reset page with options to submit email for password reset.
 *
 * @param switchScreen - Function to switch the screen.
 */
export default function ProfileReset({ switchScreen }) {
    const controller = new ProfileResetController();
    
    const [email, SetEmail] = useState("");
    const [errors, setErrors] = useState(controller.errorsModel);
    const [message, setMessage] = useState("");
    const [screenState, setScreenState] = useState(GenericScreenStateEnum.idle);
    const [visible, setVisible ] = useState(false);

    function navigate(value) {
        setVisible(value);
        switchScreen(ProfileWithoutAuthTypeEnum.login);
    }

    async function handleSubmit() {
        controller.handleSubmit(
            email,
            setErrors,
            setMessage,
            setScreenState,
            setVisible,
        );
    }

    return (
        <View style={styles.resetPage}>
            <Spinner visible={screenState === GenericScreenStateEnum.loading} />
            <InfoModal visible={visible} message={message} setVisible={setVisible}/>

            <View style={styles.resetBody}>
                <BackButton action={navigate} />
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Informe seu email</Text>
                    <Text style={styles.subtitle}>Será enviado um e-mail com sua nova senha.</Text>
                </View>

                <View style={styles.resetForm}>
                    <InputDefault
                        error={errors.email.error}
                        text={email}
                        setText={SetEmail}
                        placeholder="E-mail*"
                    />
                </View>
                <View style={styles.actionBox}>
                    <MainButton title="ENVIAR" action={handleSubmit} />
                </View>
            </View>
        </View>
    );
}
