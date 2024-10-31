/* eslint-disable react/prop-types */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "./start/start";
import StartDeliveryDetails from "./start-delivery-details/start-delivery-details";

import { TransitionPresets } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator
            id="2"
            initialRouteName="Start"
            screenOptions={{
                headerShown: false,
                animationEnabled: true,
                animationTypeForReplace: "pop",
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="StartDeliveryDetails" component={StartDeliveryDetails} />
            <Stack.Screen name="Start" component={Start} />
        </Stack.Navigator>
    );
}
