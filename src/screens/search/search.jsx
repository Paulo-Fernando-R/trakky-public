import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import SearchStart from "./search-start/search-start";
import SearchDeliveryDetails from "./search-details/search-delivery-details";

const Stack = createStackNavigator();

export default function Search() {
    return (
        <Stack.Navigator
            id="2"
            initialRouteName="SearchStart"
            screenOptions={{
                headerShown: false,
                animationEnabled: true,
                animationTypeForReplace: "pop",
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="SearchDetails" component={SearchDeliveryDetails} />
            <Stack.Screen name="SearchStart" component={SearchStart} />
        </Stack.Navigator>
    );
}
