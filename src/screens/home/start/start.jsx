/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import ProfileWithoutAuthHeader from "../../profile/profile-without-auth/components/profile-without-auth-header";
import styles from "./start-styles";
import SearchInput from "../../../global-components/search-input/search-input";
import ListSwitchEnum from "../../../data/enums/list-switch-enum";
import StartController from "./start-controller";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import AuthStateEnum from "../../../data/enums/auth-state-enum";
import Spinner from "react-native-loading-spinner-overlay";
import BodyWithoutItens from "./components/body-without-itens/body-without-itens";
import useInterfaceReload from "../../../hooks/useInterfaceReload";
import useAuthHotChange from "../../../hooks/useAuthHotChange";
import onScrollStatusbar from "../../../events/onScrollStatusbar";
import BodyWithItens from "./components/body-with-itens/body-with-itens";

export default function Start({ navigation }) {
    const controller = new StartController();
    const [listType, setListType] = useState(ListSwitchEnum.inTransport);
    const [screenState, setScreenState] = useState(GenericScreenStateEnum.idle);
    const listRef = useRef([]);
    const needReload = useInterfaceReload();
    const authStatus = useAuthHotChange();
    const [feedItens, setFeedItens] = useState([]); //DeliveryModel[]

    function handleListType(type) {
        controller.handleListType(type, setListType, listRef, feedItens);
    }

    const navigate = (id) => {
        navigation.navigate("StartDeliveryDetails", { id: id });
    };

    async function getDeliveries() {
        controller.getDeliveries(setScreenState, setFeedItens, listRef, listType);
    }

    useEffect(() => {
        if (authStatus == AuthStateEnum.authenticated) {
            getDeliveries();
        }
    }, [needReload, authStatus]);

    return (
        <ScrollView
            style={styles.page}
            refreshControl={
                <RefreshControl
                    refreshing={screenState === GenericScreenStateEnum.loading}
                    onRefresh={getDeliveries}
                />
            }
            onScroll={onScrollStatusbar}
        >
            <Spinner visible={screenState === GenericScreenStateEnum.loading} />
            <ProfileWithoutAuthHeader title="Rastreamentos" />
            <View style={styles.body}>
                <SearchInput
                    placeholder="Pesquisar"
                    active={false}
                    inactivePressAction={() => navigation.navigate("Search")}
                />

                <View style={styles.listsCntainer}>
                    {authStatus == AuthStateEnum.authenticated && feedItens.length > 0 ? (
                        <BodyWithItens
                            list={listRef.current}
                            handleListType={handleListType}
                            listType={listType}
                            navigate={navigate}
                        />
                    ) : (
                        <BodyWithoutItens />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}
