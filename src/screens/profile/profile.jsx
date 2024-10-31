import React, { useContext, useState } from "react";
import ProfileWithAuth from "./profile-with-auth/profile-with-auth";
import ProfileWithoutAuth from "./profile-without-auth/profile-without-auth";
import AuthStateEnum from "../../data/enums/auth-state-enum";
import AuthContext from "../../contexts/auth-context";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import EditProfile from "../edit-profile/edit-profile";
import Licenses from "../licenses/licenses";

const Stack = createStackNavigator();

/**
 * Renders the user profile based on the authentication state.
 *
 * @param {object} route - The route object.
 * @return {ReactElement} The rendered profile component based on the authentication state.
 */
// eslint-disable-next-line react/prop-types
export default function Profile({ navigation }) {
    const context = useContext(AuthContext);
    const [authState, setAuthState] = useState(context.authStatus);

    function AuthFlow() {
        switch (authState) {
            case AuthStateEnum.notAuthenticated:
                return <ProfileWithoutAuth setAuthState={setAuthState} navigation={navigation} />;

            case AuthStateEnum.authenticated:
                return <ProfileWithAuth setAuthState={setAuthState} navigation={navigation} />;
            default:
                return <ProfileWithoutAuth setAuthState={setAuthState} navigation={navigation} />;
        }
    }

    return (
        <Stack.Navigator
            id="2"
            initialRouteName="ProfileFlow"
            screenOptions={{
                headerShown: false,
                animationEnabled: true,
                animationTypeForReplace: "pop",
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="ProfileFlow" component={AuthFlow} />

            <Stack.Screen name="EditProfile" component={EditProfile} />

            <Stack.Screen name="Licenses" component={Licenses}/>
        </Stack.Navigator>
    );
}
