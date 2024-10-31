import { setStatusBarTranslucent } from "expo-status-bar";

/**
 * Sets the status bar to be opaque.
 *
 * @param {NativeSyntheticEvent<NativeScrollEvent>} event - The scroll event.
 * @return {void} This function does not return anything.
 */
function onScrollStatusbar(event) {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 50) {
        setStatusBarTranslucent(false);
        return;
    }

    setStatusBarTranslucent(true);
}

export default onScrollStatusbar;
