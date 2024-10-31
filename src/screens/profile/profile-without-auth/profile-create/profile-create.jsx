import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import ProfileWithoutAuthTypeEnum from "../../../../data/enums/profile-without-auth-type-enum";
import styles from "../profile-without-auth-styles";
import ProfileWithoutAuthHeader from "../components/profile-without-auth-header";
import MainButton from "../../../../global-components/main-button/main-button";
import TextButton from "../../../../global-components/text-button/text-button";
import InputDefault from "../../../../global-components/input-default/input-default";
import { Masks } from "react-native-mask-input";
import ProfileCreateController from "./profile-create-controller";
import Spinner from "react-native-loading-spinner-overlay";
import InfoModal from "../../../../global-components/info-modal/info-modal";
import AuthStateEnum from "../../../../data/enums/auth-state-enum";

/**
 * Creates a new profile by capturing user input.
 *
 * @param {object} route - The route object.
 * @param {function} switchScreen - A function to switch the screen.
 * @return {JSX.Element} The rendered profile creation form.
 */
export default function ProfileCreate({ switchScreen }) {
    const controller = new ProfileCreateController();
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [name, SetName] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const [errors, setErrors] = useState(controller.errorsModel);
    const [message, setMessage] = useState("");
    const [screenState, setScreenState] = useState(AuthStateEnum.notAuthenticated);
    const [visible, setVisible] = useState(false);
    const [canProcced, setCanProcced] = useState(false);

    async function handleSubmit() {
        controller.handleSubmit(
            email,
            password,
            setErrors,
            setMessage,
            setScreenState,
            setVisible,
            birthDate,
            name,
            setCanProcced
        );
    }
    function navigate(value) {
        setVisible(value);
        switchScreen(ProfileWithoutAuthTypeEnum.login);
    }
    return (
        <ScrollView style={styles.page}>
            <Spinner visible={screenState === AuthStateEnum.authenticating} />
            <InfoModal
                visible={visible}
                setVisible={canProcced ? navigate : setVisible}
                message={message}
            />
            <ProfileWithoutAuthHeader />
            <View style={styles.body}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>
                        Para aproveitar todos os recursos, crie uma conta.
                    </Text>
                </View>

                <View style={styles.form}>
                    <InputDefault
                        text={name}
                        setText={SetName}
                        placeholder="Nome completo*"
                        error={errors.fullName.error}
                    />
                    <InputDefault
                        text={email}
                        setText={SetEmail}
                        placeholder="E-mail*"
                        error={errors.email.error}
                    />
                    <InputDefault
                        text={birthDate}
                        setText={setBirthDate}
                        placeholder="Data de nascimento*"
                        mask={Masks.DATE_DDMMYYYY}
                        error={errors.birthDate.error}
                    />

                    <InputDefault
                        password={true}
                        text={password}
                        setText={SetPassword}
                        placeholder="Senha*"
                        error={errors.password.error}
                    />
                </View>
                <View style={styles.actionBox}>
                    <MainButton title="CADASTRAR" action={handleSubmit} />
                    <TextButton title="Se ja possui uma conta, faça login." action={navigate} />
                </View>
            </View>
        </ScrollView>
    );
}
