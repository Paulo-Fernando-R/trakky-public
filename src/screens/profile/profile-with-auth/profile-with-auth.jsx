import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./profile-with-auth-styles";
import { MaterialIcons } from "@expo/vector-icons";
import AppColors from "../../../global-styles/app-colors";
import { TouchableHighlight } from "react-native";
import AuthContext from "../../../contexts/auth-context";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import ProfileWithAuthController from "./profile-with-auth-controller";
import Spinner from "react-native-loading-spinner-overlay";
import InfoModal from "../../../global-components/info-modal/info-modal";
import TextButton from "../../../global-components/text-button/text-button";

export default function ProfileWithAuth({ setAuthState, navigation }) {
    const controller = new ProfileWithAuthController();
    const context = useContext(AuthContext);
    const [screenState, setScreenState] = useState(GenericScreenStateEnum.idle);
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");

    function navigate() {
        navigation.navigate("EditProfile", {
            name: name,
            email: email,
            birth: birth,
        });
    }

    async function logoff() {
        await controller.logoff(context, setScreenState, setAuthState, setMessage, navigation);
    }

    useEffect(() => {
        controller.getProfileData(
            setName,
            setEmail,
            setBirth,
            setScreenState,
            context,
            setAuthState,
            navigation,
            setMessage
        );
    }, []);

    return (
        <ScrollView style={styles.page}>
            <Spinner visible={screenState === GenericScreenStateEnum.loading} />
            <InfoModal message={message} visible={visible} setVisible={setVisible} />

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Perfil</Text>
                <Text style={styles.subTitle}>Informações pessoais</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.infoBox}>
                    <View style={styles.infoLine}>
                        <View style={styles.infoLineLeft}>
                            <MaterialIcons
                                name="person"
                                size={20}
                                color={AppColors.instance.accentDefault}
                            />
                            <Text style={styles.infoLineLeftText}>Nome</Text>
                        </View>
                        <Text style={styles.infoLineRightText} numberOfLines={1}>
                            {name}
                        </Text>
                    </View>

                    <View style={styles.infoLine}>
                        <View style={styles.infoLineLeft}>
                            <MaterialIcons
                                name="alternate-email"
                                size={20}
                                color={AppColors.instance.accentDefault}
                            />
                            <Text style={styles.infoLineLeftText}>E-mail</Text>
                        </View>
                        <Text style={styles.infoLineRightText} numberOfLines={1}>
                            {email}
                        </Text>
                    </View>

                    <View style={styles.infoLine}>
                        <View style={styles.infoLineLeft}>
                            <MaterialIcons
                                name="date-range"
                                size={20}
                                color={AppColors.instance.accentDefault}
                            />

                            <Text style={styles.infoLineLeftText}>Data de nascimento</Text>
                        </View>
                        <Text style={styles.infoLineRightText}>{birth}</Text>
                    </View>

                    <View style={styles.infoEdit}>
                        <TouchableHighlight
                            underlayColor={AppColors.instance.primaryDark}
                            style={styles.infoEditPress}
                            onPress={navigate}
                        >
                            <>
                                <Text style={styles.infoEditText}>Editar</Text>
                                <MaterialIcons
                                    name="edit"
                                    size={12}
                                    color={AppColors.instance.accentDefault}
                                />
                            </>
                        </TouchableHighlight>
                    </View>
                </View>

                <TouchableHighlight
                    underlayColor={AppColors.instance.primaryDark}
                    style={styles.logoutBox}
                    onPress={controller.removeTasks}
                >
                    <>
                        <MaterialIcons
                            style={styles.logoutIcon}
                            name="pause-circle-outline"
                            size={24}
                            color={AppColors.instance.accentDefault}
                        />
                        <Text style={styles.logout}>PAUSAR ATUALIZAÇÕES</Text>
                    </>
                </TouchableHighlight>

                <Text style={styles.explainText}>
                    Para pausar as atualizações clique no botão “Pausar atualizações” e feche o APP.
                    Desta forma não serão mais enviados os dados da sua localização atual. As
                    atualizações serão reativadas automaticamente ao abrir novamente o APP.
                </Text>

                <TouchableHighlight
                    underlayColor={AppColors.instance.primaryDark}
                    style={styles.logoutBox}
                    onPress={logoff}
                >
                    <>
                        <MaterialIcons
                            style={styles.logoutIcon}
                            name="logout"
                            size={24}
                            color={AppColors.instance.accentDefault}
                        />
                        <Text style={styles.logout}>SAIR DA CONTA</Text>
                    </>
                </TouchableHighlight>
                <View style={styles.licenses}>
                    <TextButton
                        title="Licensas de software"
                        action={() => navigation.navigate("Licenses")}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
