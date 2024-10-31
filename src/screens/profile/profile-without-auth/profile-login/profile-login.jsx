/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../profile-without-auth-styles";
import ProfileWithoutAuthHeader from "../components/profile-without-auth-header";
import MainButton from "../../../../global-components/main-button/main-button";
import TextButton from "../../../../global-components/text-button/text-button";
import InputDefault from "../../../../global-components/input-default/input-default";
import { useState } from "react";
import ProfileWithoutAuthTypeEnum from "../../../../data/enums/profile-without-auth-type-enum";
import ProfileLoginController from "./profile-login-controller";
import AuthStateEnum from "../../../../data/enums/auth-state-enum";
import Spinner from "react-native-loading-spinner-overlay";
import InfoModal from "../../../../global-components/info-modal/info-modal";
import AuthContext from "../../../../contexts/auth-context";

/**
 * Handles the profile login submission by processing the user input and
 * interacting with the ProfileLoginController to handle the login process.
 *
 * @param {object} navigation - The navigation object.
 * @param {function} switchScreen - A function to switch the screen.
 * @param {Function} setAuthState - A function to set the authentication state.
 * @return {JSX.Element} The rendered login form.
 */

export default function ProfileLogin({ switchScreen, setAuthState, navigation }) {
    const controller = new ProfileLoginController();
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [errors, setErrors] = useState(controller.errorsModel);
    const [message, setMessage] = useState("");
    const [screenState, setScreenState] = useState(AuthStateEnum.notAuthenticated);
    const [visible, setVisible] = useState(false);
    const context = useContext(AuthContext);

    async function handleSubmit() {
        controller.handleSubmit(
            email,
            password,
            setErrors,
            setMessage,
            setScreenState,
            setVisible,
            context,
            setAuthState,
            navigation
        );
    }

    return (
        <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
            <Spinner visible={screenState === AuthStateEnum.authenticating} />
            <InfoModal visible={visible} setVisible={setVisible} message={message} />
            <ProfileWithoutAuthHeader />
            <View style={styles.body}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Para aproveitar todos os recursos, faça login.</Text>
                    <Text style={styles.subtitle}>Informe seus dados de login</Text>
                </View>

                <View style={styles.form}>
                    <InputDefault
                        text={email}
                        setText={SetEmail}
                        placeholder="E-mail*"
                        error={errors.email.error}
                    />
                    <InputDefault
                        password={true}
                        text={password}
                        setText={SetPassword}
                        placeholder="Senha*"
                        error={errors.password.error}
                    />
                    {/* <TextButton
                        title="Recuperar senha"
                        action={() => switchScreen(ProfileWithoutAuthTypeEnum.reset)}
                    /> */}
                </View>
                <View style={styles.actionBox}>
                    <MainButton title="ENTRAR" action={handleSubmit} />
                    <TextButton
                        title="Se não possui uma conta, crie uma."
                        action={() => switchScreen(ProfileWithoutAuthTypeEnum.create)}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
