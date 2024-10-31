import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./start-delivery-details-styles";
import BackButton from "../../../global-components/back-button/back-button";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AppColors from "../../../global-styles/app-colors";
import MainButton from "../../../global-components/main-button/main-button";
import GestureRecognizer from "react-native-swipe-detect";
import MapComponent from "../../../global-components/map-component/map-component";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import StartDeliveryDetailsController from "./start-delivery-details-controller";
import InfoModal from "../../../global-components/info-modal/info-modal";
import dateFormatters from "../../../utils/date-formatters";
import Spinner from "react-native-loading-spinner-overlay";
import { StackActions } from "@react-navigation/native";

/**
 * Renders the StartDeliveryDetails screen.
 *
 * @param  navigation - The navigation object for navigating to other screens.
 * @param  route - The route object containing the parameters for the screen.
 * @return {JSX.Element} The StartDeliveryDetails screen component.
 */
export default function StartDeliveryDetails({ navigation, route }) {
    const controller = new StartDeliveryDetailsController();
    const { id } = route.params;

    const [description, setdescription] = useState("");
    const [createdAt, setcreatedAt] = useState("");
    const [updatedAt, setupdatedAt] = useState("");
    const [latitude, setlatitude] = useState(null);
    const [longitude, setlongitude] = useState(null);

    const [screenState, setScreenState] = useState(GenericScreenStateEnum.idle);
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentLocationName, setcurrentLocationName] = useState("");
    //? ESTE STATE ERA PARA PERMISÃO DE LOCAL PARA LOCALIZAÇÃO REVERSA
    //? RETIRAR APÓS TESTES
    const [permissions, setPermissions] = useState(true);
    const [deleted, setDeleted] = useState(false);

    function navigate() {
        navigation.navigate("Start");
    }

    function goBackNoPermission(value) {
        navigate();
        setVisible(value);
    }

    function goBackDelete(value) {
        navigation.dispatch(StackActions.replace("Start"));
        setVisible(value);
    }

    async function getDeliveryData() {
        controller.getDeliveryData(
            id,
            setdescription,
            setcreatedAt,
            setupdatedAt,
            setlatitude,
            setlongitude,
            setScreenState,
            setErrorMessage,
            setVisible,
            setcurrentLocationName,
            setPermissions
        );
    }

    async function deleteDelivery() {
        controller.deleteDelivery(id, setScreenState, setErrorMessage, setVisible, setDeleted);
    }

    useEffect(() => {
        getDeliveryData();
    }, []);

    if (!permissions) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <InfoModal
                        visible={visible}
                        setVisible={goBackNoPermission}
                        message={errorMessage}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Spinner visible={screenState === GenericScreenStateEnum.loading} />
            <InfoModal
                visible={visible}
                setVisible={deleted ? goBackDelete : setVisible}
                message={errorMessage}
            />
            <View style={styles.body}>
                <GestureRecognizer
                    config={{ velocityThreshold: 0.1 }}
                    onSwipeDown={getDeliveryData}
                >
                    <View style={styles.header}>
                        <BackButton action={navigate} />
                    </View>
                </GestureRecognizer>

                <View style={styles.mapContainer}>
                    <MapComponent latitude={latitude ?? 0} longitude={longitude ?? 0} />
                </View>

                <ScrollView
                    style={styles.infoContainer}
                    contentContainerStyle={styles.infoContainerContent}
                >
                    <View style={styles.infoContainerLine}></View>
                    <View style={styles.infoContainerTitleBox}>
                        <Text style={styles.infoContainerTitle1}>{description}</Text>
                        <View style={styles.infoContainerTitle2Box}>
                            <MaterialIcons
                                name="location-on"
                                size={28}
                                color={AppColors.instance.accentDefault}
                            />
                            <Text
                                style={styles.infoContainerTitle2}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {!latitude || !longitude
                                    ? "Sem atualizações no mapa ainda..."
                                    : currentLocationName}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoContainerInfoBox}>
                        <Text style={styles.infoContainerInfoText1}>
                            Última atualização: {dateFormatters.toPtBRDateTime(updatedAt)}
                        </Text>
                        <Text style={styles.infoContainerInfoText2}>
                            Entrega criada em {dateFormatters.toPtBRDateOnly(createdAt)}
                        </Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <MainButton title="EXCLUIR" action={deleteDelivery} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
