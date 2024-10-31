/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { View, TouchableOpacity, Modal, Text, ToastAndroid } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import bottomSheetStyles from "./bottom-sheet-modal-style";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import dateFormatters from "../../../../utils/date-formatters";
import stringFormatters from "../../../../utils/string-formatters";
import DeliveryStatusEnum from "../../../../data/enums/delivery-status-enum";
import AppColors from "../../../../global-styles/app-colors";
import InfoModal from "../../../../global-components/info-modal/info-modal";
import Spinner from "react-native-loading-spinner-overlay";
import BottomSheetModalController from "./bottom-sheet-modal-controller";
import BackButton from "../../../../global-components/back-button/back-button";

export default function BottomSheetModal({ state, toggleModal, delivery }) {
    const controller = new BottomSheetModalController();
    const [status, setStatus] = useState("");
    const [label, setLabel] = useState("");
    const [infoVisible, setinfoVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const date = dateFormatters.toPtBRDateTime(delivery.LastUpdateTime);
    const created = dateFormatters.toPtBRDateTime(delivery.CreatedAt);
    const title = stringFormatters.toTitlecase(delivery.Description);

    let city = "";
    let uf = "";
    let location = "";

    city = delivery.LastLocation.city ? delivery.LastLocation.city : "";
    uf = delivery.LastLocation.uf ? delivery.LastLocation.uf : "";

    location = city ? city + " - " : "";
    location += uf;
    !location ? (location = "Sem atualizações por enquanto") : location;
   
    const updateStatus = (value) => setStatus(value);

    const updateLabel = (value) => setLabel(value);

    async function changeStatus() {
        await controller.changeStatus(
            delivery.DeliveryId,
            setLoading,
            setMessage,
            setinfoVisible,
            updateStatus,
            updateLabel,
            delivery
        );
    }

    async function copy() {
        await controller.copyCode(delivery.Code);
    }

    function onShow() {
        controller.onShow(setLabel, setStatus, delivery.Status);
        controller.getCurrentLocation(delivery.DeliveryId, setLoading, delivery);
    }

    return (
        <Modal animationType="slide" visible={state} onRequestClose={toggleModal} onShow={onShow}>
            <Spinner visible={loading} />
            <InfoModal message={message} setVisible={setinfoVisible} visible={infoVisible} />
            <View style={bottomSheetStyles.background}>
                <View style={bottomSheetStyles.backButton}>
                    <BackButton action={toggleModal} />
                </View>

                <View style={bottomSheetStyles.modalBody}>
                    <View style={bottomSheetStyles.slideDown}>
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={{ flex: 1 }}
                        ></TouchableOpacity>
                    </View>
                    <View style={bottomSheetStyles.header}>
                        <Text style={bottomSheetStyles.headerText}>{title}</Text>
                        <View style={bottomSheetStyles.originPlace}>
                            <Ionicons name="location-sharp" size={22} color="#7FDBFF" />
                            <Text style={bottomSheetStyles.originText}>{location}</Text>
                        </View>
                    </View>
                    <View style={bottomSheetStyles.body}>
                        <View style={bottomSheetStyles.bodyInfos}>
                            <Text style={bottomSheetStyles.bodyTexts}>
                                Origem: {delivery.Origin.city + "-" + delivery.Origin.uf}
                            </Text>
                            <Text style={bottomSheetStyles.bodyTexts}>
                                Destino: {delivery.Destination.city + "-" + delivery.Destination.uf}
                            </Text>
                            <Text style={bottomSheetStyles.bodyTexts}>
                                Última atualização: {date}
                            </Text>
                            <Text style={bottomSheetStyles.bodyTexts}>Status atual: {status}</Text>
                            <Text style={bottomSheetStyles.bodyTexts}>
                                Rastreamento criado no dia: {created}
                            </Text>
                            <View style={bottomSheetStyles.copyContainer}>
                                <Text
                                    style={bottomSheetStyles.copyText}
                                    lineBreakMode="tail"
                                    numberOfLines={1}
                                >
                                    Código: {delivery.Code}
                                </Text>
                                <TouchableOpacity onPress={copy}>
                                    <Ionicons
                                        name="copy"
                                        size={24}
                                        color={AppColors.instance.textLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={bottomSheetStyles.buttonContainer}>
                            <TouchableOpacity
                                style={
                                    delivery.Status === DeliveryStatusEnum.complete
                                        ? bottomSheetStyles.buttonDisabled
                                        : bottomSheetStyles.button
                                }
                                onPress={changeStatus}
                                disabled={delivery.Status === DeliveryStatusEnum.complete}
                            >
                                <Text style={bottomSheetStyles.buttonText}>
                                    {delivery.Status < DeliveryStatusEnum.complete
                                        ? "Marcar como "
                                        : ""}
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
