/* eslint-disable no-unused-vars */
import { View, Text, ScrollView } from "react-native";
import React from "react";
import deliverieStyles from "./deliveries-with-auth-styles";
import DeliveryCard from "./delivery-card/delivery-card.jsx";
import { useEffect, useState } from "react";
import GestureRecognizer from "react-native-swipe-detect";
import BottomSheetModal from "./bottom-sheet-modal/bottom-sheet-modal.jsx";
import DeliveryWithAuthController from "./delivery-with-auth-controller.js";
import { RefreshControl } from "react-native";
import NoContent from "./no-content/no-content.jsx";
import Spinner from "react-native-loading-spinner-overlay";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum.js";
import ContextMenu from "../../../global-components/context-menu/context-menu.jsx";
import DeliveryModel from "../../../data/models/delivery-model.js";
import ContextMenuOptionEnum from "../../../data/enums/context-menu-option-enum.js";
import InfoModal from "../../../global-components/info-modal/info-modal.jsx";
import useInterfaceReload from "../../../hooks/useInterfaceReload.js";
import onScrollStatusbar from "../../../events/onScrollStatusbar.js";

export default function DeliveriesWithAuth({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [delivery, setDelivery] = useState(DeliveryModel.fromJson());
    const [deliveryStatus, setDeliveryStatus] = useState("");
    const [deliveries, setDeliveries] = useState([]);
    const [blankPage, setBlankPage] = useState(true);
    const controller = new DeliveryWithAuthController();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(GenericScreenStateEnum.idle);
    const [menuVisible, setmenuVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [message, setMessage] = useState("second");
    const needReload = useInterfaceReload();

    async function fetchData() {
        await controller.getDeliveries(setBlankPage, setDeliveries, setLoading, setRefreshing);
    }

    async function onRefresh() {
        setRefreshing(true);
        await fetchData();
    }

    const toggleModal = () => {
        controller.toggleModal(setModalVisible, isModalVisible);
    };

    function cardPress(delivery) {
        controller.cardPress(delivery, setDelivery, setModalVisible, isModalVisible);
    }

    function menuOption(index) {
        switch (index) {
            case ContextMenuOptionEnum.edit:
                controller.navigateToEdit(index, navigation, delivery);
                break;

            case ContextMenuOptionEnum.delete:
                controller.deleteDelivery(
                    delivery,
                    setLoading,
                    deliveries,
                    setmenuVisible,
                    setBlankPage,
                    setMessage,
                    setPopupVisible
                );
                break;
        }
    }

    function cardLongPress(delivery) {
        controller.cardLongPress(delivery, setDelivery, setmenuVisible);
    }

    useEffect(() => {
        fetchData();
    }, [needReload]);

    return (
        <View style={deliverieStyles}>
            <Spinner visible={loading === GenericScreenStateEnum.loading} />
            <InfoModal message={message} setVisible={setPopupVisible} visible={popupVisible} />
            <ScrollView
                contentContainerStyle={deliverieStyles.page}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={onScrollStatusbar}
            >
                <View style={deliverieStyles.titleContainer}>
                    <Text style={deliverieStyles.title}>Minhas Entregas</Text>
                    <Text style={deliverieStyles.subTitle}>
                        Esta seção é destinada apenas para usuários que desejam realizar entregas.
                    </Text>
                </View>

                <View style={deliverieStyles.grid}>
                    {(!blankPage && (
                        <Itens
                            deliveries={deliveries}
                            cardLongPress={cardLongPress}
                            cardPress={cardPress}
                        />
                    )) ||
                        (blankPage && <NoContent />)}
                </View>
            </ScrollView>

            <GestureRecognizer config={{ velocityThreshold: 0.1 }} onSwipeDown={toggleModal}>
                {
                    <BottomSheetModal
                        state={isModalVisible}
                        toggleModal={toggleModal}
                        delivery={delivery}
                    />
                }
            </GestureRecognizer>

            <ContextMenu
                action={menuOption}
                close={() => setmenuVisible(false)}
                visible={menuVisible}
            />
        </View>
    );
}

function Itens({ deliveries, cardPress, cardLongPress }) {
    return (
        <>
            {deliveries.map((delivery, index) => {
                return (
                    <DeliveryCard
                        key={index}
                        delivery={delivery}
                        onPress={cardPress.bind(delivery)}
                        onLongPress={cardLongPress.bind(delivery)}
                    />
                );
            })}
        </>
    );
}
