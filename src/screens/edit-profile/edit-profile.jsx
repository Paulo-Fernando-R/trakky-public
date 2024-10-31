/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import InputDefault from "../../global-components/input-default/input-default";
import { Masks } from "react-native-mask-input";
import MainButton from "../../global-components/main-button/main-button";
import styles from "./edit-profile-styles";
import GenericScreenStateEnum from "../../data/enums/generic-screen-state-enum";
import BackButton from "../../global-components/back-button/back-button";
import EditProfileController from "./edit-profile-controller";
import Spinner from "react-native-loading-spinner-overlay";
import InfoModal from "../../global-components/info-modal/info-modal";

export default function EditProfile({ navigation, route }) {
    const controller = new EditProfileController();

    const { email: _email, name: _name, birth: _birth } = route.params;
  
    const [email, SetEmail] = useState(_email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState(_name);
    const [birthDate, setBirthDate] = useState(_birth);

    const [errors, setErrors] = useState(controller.errorsModel);
    const [message, setMessage] = useState("");
    const [screenState, setScreenState] = useState();
    const [visible, setVisible] = useState(false);
    

    async function handleSubmit() {
        await controller.handleSubmit(
            email,
            name,
            oldPassword,
            birthDate,
            newPassword,
            setErrors,
            setScreenState,
            setMessage,
            setVisible,
            _email,
            _name,
            _birth
        );
    }

    function navigateBack(value) {
        setVisible(false);
        if (screenState === GenericScreenStateEnum.sucess) {
            navigation.navigate("ProfileFlow");
        }
    }

    //ToastAndroid.show("teste", ToastAndroid.SHORT)

    return (
        <ScrollView style={styles.page} contentContainerStyle={styles.body}>
            <Spinner visible={screenState === GenericScreenStateEnum.loading} />
            <InfoModal message={message} visible={visible} setVisible={navigateBack} />
            <View style={styles.header}>
                <BackButton action={() => navigation.pop()} />
            </View>
            <Text style={styles.title}>Editar perfil</Text>

            <View style={styles.flexView}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados pessoais</Text>
                    <View style={styles.inputBox}>
                        <InputDefault
                            placeholder="Nome"
                            text={name}
                            setText={setName}
                            error={errors.fullName.error}
                        />
                        <InputDefault
                            placeholder="E-mail"
                            text={email}
                            setText={SetEmail}
                            error={errors.email.error}
                        />

                        <InputDefault
                            placeholder="Data de nascimento"
                            text={birthDate}
                            setText={setBirthDate}
                            mask={Masks.DATE_DDMMYYYY}
                            error={errors.birthDate.error}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Alterar senha</Text>
                    <View style={styles.inputBox}>
                        <InputDefault
                            placeholder="Senha atual"
                            password={true}
                            text={oldPassword}
                            setText={setOldPassword}
                            error={errors.password.error}
                        />
                        <InputDefault
                            placeholder="Senha nova"
                            password={true}
                            text={newPassword}
                            setText={setNewPassword}
                            error={errors.confirmPassword.error}
                        />
                    </View>
                </View>
            </View>

            <MainButton title="SALVAR" action={handleSubmit} />
        </ScrollView>
    );
}
