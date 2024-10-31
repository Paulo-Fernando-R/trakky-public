/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/auth-context";
import onChangeAuthEvent from "../events/onChangeAuth";
import AuthStateEnum from "../data/enums/auth-state-enum";

/**
 * Custom React hook that listens for changes in the authentication status
 * and updates the component state accordingly.
 *
 * @return {AuthStateEnum} The current authentication status.
 */
const useAuthHotChange = () => {
    const context = useContext(AuthContext);

    const [status, setStatus] = useState(context.authStatus);
    const change = (value) => setStatus(value);
    const callback = (data) => change(data);

    useEffect(() => {
        const event = onChangeAuthEvent.listener(callback);

        return () => {
            onChangeAuthEvent.remove(event);
        };
    }, [status]);

    return status;
};

export default useAuthHotChange;
