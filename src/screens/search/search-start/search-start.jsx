import React, { useState } from "react";
import styles from "./search-start-styles";
import { ScrollView } from "react-native-gesture-handler";
import SearchInput from "../../../global-components/search-input/search-input";
import { View, Text } from "react-native";
import ListItem from "../../../global-components/list-default/list-item";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppColors from "../../../global-styles/app-colors";
import SearchStartController from "./search-start-controller";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import Spinner from "react-native-loading-spinner-overlay";
import InfoModal from "../../../global-components/info-modal/info-modal";
import DeliveryModel from "../../../data/models/delivery-model";

export default function SearchStart({ navigation }) {
    const controller = new SearchStartController();
    const [search, setSearch] = useState("");
    const [itemList, setItemList] = useState([]);
    const [screenState, setScreenState] = useState(GenericScreenStateEnum.idle);
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = (id) => {
        navigation.navigate("SearchDetails", { id: id });
    };

    async function searchDelivery() {
        await controller.searchDelivery(
            search,
            setScreenState,
            setItemList,
            setErrorMessage,
            setVisible
        );
    }

    return (
        <ScrollView style={styles.page}>
            <Spinner visible={screenState === GenericScreenStateEnum.loading} />
            <InfoModal visible={visible} setVisible={setVisible} message={errorMessage} />
            <View style={styles.body}>
                <SearchInput
                    placeholder="Pesquisar"
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                    searchPressAction={searchDelivery}
                />

                <View style={styles.listConatiner}>
                    {itemList.length < 1 ? (
                        <View style={styles.emptyBox}>
                            <MaterialCommunityIcons
                                name="shield-search"
                                size={100}
                                color={AppColors.instance.strokeLight}
                            />
                            <Text style={styles.emptyText}>
                                Nada aqui ainda, tente pesquisar por um código.
                            </Text>
                        </View>
                    ) : (
                        itemList.map((e, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    deliveryId={e.DeliveryId}
                                    lasUpdate={e.LastUpdateTime}
                                    title={e.Description}
                                    navigate={navigate}
                                />
                            );
                        })
                    )}
                </View>
            </View>
        </ScrollView>
    );
}
