/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import InputDefault from "../../global-components/input-default/input-default";
import styles from "./edit-deliveries-styles";
import InputDropdown from "../../global-components/input-dropdown/input-dropdown";
import MainButton from "../../global-components/main-button/main-button";
import GenericScreenStateEnum from "../../data/enums/generic-screen-state-enum";
import Spinner from "react-native-loading-spinner-overlay";
import InfoModal from "../../global-components/info-modal/info-modal";
import EditDeliveryController from "./edit-deliveries-controller";

export default function EditDelivery({ route, navigation }) {
    const controller = new EditDeliveryController();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [description, setDescription] = useState("");
    const [observation, setObservation] = useState("");
    const [screenState, setScreenState] = useState(GenericScreenStateEnum.idle);
    const [cities, setCities] = useState([{ label: "", value: "" }]);
    const [errors, setErrors] = useState(controller.errorsModel);
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const [cepOrigin, setcepOrigin] = useState("");
    const [districtOrigin, setdistrictOrigin] = useState("");
    const [streetOrigin, setstreetOrigin] = useState("");
    const [numberOrigin, setnumberOrigin] = useState("");
    const [complementOrigin, setcomplementOrigin] = useState("");

    const [cepDestination, setcepDestination] = useState("");
    const [districtDestination, setdistrictDestination] = useState("");
    const [streetDestination, setstreetDestination] = useState("");
    const [numberDestination, setnumberDestination] = useState("");
    const [complementDestination, setcomplementDestination] = useState("");

    const { deliveryId } = route.params;
    // console.log(deliveryId)

    async function handleSubmit() {
        await controller.handleSubmit(
            description,
            origin,
            destination,
            observation,
            setErrors,
            setMessage,
            setScreenState,
            setVisible,
            setOrigin,
            setDestination,
            setObservation,
            setDescription,

            cepOrigin,
            setcepOrigin,
            districtOrigin,
            setdistrictOrigin,
            streetOrigin,
            setstreetOrigin,
            numberOrigin,
            setnumberOrigin,
            complementOrigin,
            setcomplementOrigin,
            cepDestination,
            setcepDestination,
            districtDestination,
            setdistrictDestination,
            streetDestination,
            setstreetDestination,
            numberDestination,
            setnumberDestination,
            complementDestination,
            setcomplementDestination,
            deliveryId,
            navigation
        );
    }

    function navigateBack(value) {
        setVisible(value);
        if (screenState === GenericScreenStateEnum.sucess) navigation.navigate("MyDeliveries");
    }

    useEffect(() => {
        controller.getCities(setScreenState, cities);
        controller.getDeliveryData(
            deliveryId,
            setMessage,
            setScreenState,
            setVisible,
            setOrigin,
            setDestination,
            setObservation,
            setDescription,
            setcepOrigin,
            setdistrictOrigin,
            setstreetOrigin,
            setnumberOrigin,
            setcomplementOrigin,
            setcepDestination,
            setdistrictDestination,
            setstreetDestination,
            setnumberDestination,
            setcomplementDestination
        );
    }, [deliveryId]);


    return (
        <ScrollView style={styles.page}>
            <Spinner visible={screenState === GenericScreenStateEnum.loading} />
            <InfoModal visible={visible} setVisible={navigateBack} message={message} />
            <View style={styles.body}>
                <Text style={styles.title}>Editar entrega</Text>
                <Text style={styles.subtitle}>
                    Preencha os campos abaixo para editar os dados da entrga
                </Text>
                <View style={styles.form}>
                    <InputDefault
                        placeholder="Descrição*"
                        error={errors.description.error}
                        text={description}
                        setText={setDescription}
                    />
                    <InputDefault
                        placeholder="Observação"
                        error={errors.observation.error}
                        text={observation}
                        setText={setObservation}
                    />
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Origem:</Text>
                        <InputDropdown
                            placeholder={"Cidade/UF*"}
                            setValue={setOrigin}
                            data={cities}
                            value={origin}
                            error={errors.origin.error}
                        />
                        <InputDefault
                            placeholder="Cep*"
                            text={cepOrigin}
                            setText={setcepOrigin}
                            mask={controller.zipCodeMask}
                            error={errors.cepOrigin.error}
                        />
                        <InputDefault
                            placeholder="Bairro*"
                            text={districtOrigin}
                            setText={setdistrictOrigin}
                            error={errors.districtOrigin.error}
                        />

                        <InputDefault
                            placeholder="Rua*"
                            text={streetOrigin}
                            setText={setstreetOrigin}
                            error={errors.streetOrigin.error}
                        />
                        <InputDefault
                            placeholder="Número*"
                            text={numberOrigin}
                            setText={setnumberOrigin}
                            error={errors.numberOrigin.error}
                        />
                        <InputDefault
                            placeholder="Complemento"
                            text={complementOrigin}
                            setText={setcomplementOrigin}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Destino:</Text>
                        <InputDropdown
                            placeholder={"Cidade/UF*"}
                            setValue={setDestination}
                            data={cities}
                            value={destination}
                            error={errors.destination.error}
                        />

                        <InputDefault
                            placeholder="Cep*"
                            text={cepDestination}
                            setText={setcepDestination}
                            mask={controller.zipCodeMask}
                            error={errors.cepDestination.error}
                        />
                        <InputDefault
                            placeholder="Bairro*"
                            text={districtDestination}
                            setText={setdistrictDestination}
                            error={errors.districtDestination.error}
                        />
                        <InputDefault
                            placeholder="Rua*"
                            text={streetDestination}
                            setText={setstreetDestination}
                            error={errors.streetDestination.error}
                        />
                        <InputDefault
                            placeholder="Número*"
                            text={numberDestination}
                            setText={setnumberDestination}
                            error={errors.numberDestination.error}
                        />
                        <InputDefault
                            placeholder="Complemento"
                            text={complementDestination}
                            setText={setcomplementDestination}
                        />
                    </View>
                </View>

                <MainButton title="SALVAR" action={handleSubmit} />
            </View>
        </ScrollView>
    );
}
