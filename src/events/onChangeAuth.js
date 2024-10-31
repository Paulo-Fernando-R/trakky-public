/* eslint-disable no-unused-vars */
import { EventRegister } from "react-native-event-listeners";
import AuthStateEnum from "../data/enums/auth-state-enum";

const onChangeAuthConfig = { CHANGE_AUTH: "CHANGE_AUTH" };

/**
 * Emits the onChangeAuthConfig.CHANGE_AUTH event with the provided message.
 *
 * @param {AuthStateEnum} data - The data to emit with the event.
 */
const onChnageAuthEventEmmiter = (data) => EventRegister.emit(onChangeAuthConfig.CHANGE_AUTH, data);

/**
 * Event listener function for handling onChangeAuthConfig.CHANGE_AUTH event.
 *
 * @param {function(AuthStateEnum)} callback - The callback function to be executed when the event occurs. Retrieves AuthStateEnum as parameter.
 * @return {onChangeAuthConfig}
 */
const onChangeAuthEventListener = (callback = (message) => {}) => {
    return EventRegister.addEventListener(onChangeAuthConfig.CHANGE_AUTH, callback);
};

/**
 * Removes all event listeners for the specified event.
 *
 * @param {string} event - The name of the event to remove listeners for.
 * @return {void} This function does not return anything.
 */
const onchangeAuthEventRemove = (event) => EventRegister.removeEventListener(event);

const onChangeAuthEvent = {
    emmiter: onChnageAuthEventEmmiter,
    listener: onChangeAuthEventListener,
    remove: onchangeAuthEventRemove,
};

export default onChangeAuthEvent;
