import React from "react";
import ProfileCreate from "./profile-create/profile-create";
import ProfileLogin from "./profile-login/profile-login";
import ProfileReset from "./profile-reset/profile-reset";
import { useState } from "react";
import ProfileWithoutAuthTypeEnum from "../../../data/enums/profile-without-auth-type-enum";

/**
 * Function to render the profile without authentication.
 *
 * @param {object} navigation - the navigation object
 * @param {function} setAuthState - function to set the authentication state
 * @return {JSX.Element} the rendered profile without authentication
 */
// eslint-disable-next-line react/prop-types
export default function ProfileWithoutAuth({ navigation, setAuthState }) {
    const [swithScreen, setSwitchScreen] = useState(ProfileWithoutAuthTypeEnum.login);

    switch (swithScreen) {
        case ProfileWithoutAuthTypeEnum.login:
            return (
                <ProfileLogin
                    setAuthState={setAuthState}
                    switchScreen={setSwitchScreen}
                    navigation={navigation}
                />
            );
        case ProfileWithoutAuthTypeEnum.create:
            return (
                <ProfileCreate
                    setAuthState={setAuthState}
                    switchScreen={setSwitchScreen}
                    navigation={navigation}
                />
            );
            case ProfileWithoutAuthTypeEnum.reset: 
            return(
                <ProfileReset switchScreen={setSwitchScreen}/>
            )
    }
}
