import { useState, useEffect } from "react";
import GenericScreenStateEnum from "../data/enums/generic-screen-state-enum";
import onReloadInterfaceEvent from "../events/onReloadInterface";

/**
 * Custom hook that handles interface reload functionality.
 *
 * @return {GenericScreenStateEnum} The state of whether a reload is needed or not.
 */
const useInterfaceReload = () => {
    const [needReload, setNeedReload] = useState(GenericScreenStateEnum.idle);

    const change = (value) => setNeedReload(value);
    useEffect(() => {
        const event = onReloadInterfaceEvent.listener(change);

        return () => {
            onReloadInterfaceEvent.remove(event);
        };
    }, [needReload]);

    return needReload;
};

export default useInterfaceReload;
