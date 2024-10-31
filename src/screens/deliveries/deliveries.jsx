/* eslint-disable no-undef */
import React from "react";
import AuthStateEnum from "../../data/enums/auth-state-enum";
import DeliveriesWithAuth from "./deliveries-with-auth/deliveries-with-auth";
import DeliveriesWithoutAuth from "./deliveries-without-auth/deliveries-without-auth";
import useAuthHotChange from "../../hooks/useAuthHotChange";

// eslint-disable-next-line no-unused-vars
export default function Deliveries({ navigation, route }) {
    const status = useAuthHotChange();

    switch (status) {
        case AuthStateEnum.authenticated:
            return <DeliveriesWithAuth navigation={navigation} />;

        default:
            return <DeliveriesWithoutAuth navigation={navigation} />;
    }
}
