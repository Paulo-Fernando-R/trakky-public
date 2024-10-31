/* eslint-disable no-unused-vars */
import { EventRegister } from "react-native-event-listeners";
import GenericScreenStateEnum from "../data/enums/generic-screen-state-enum";

const onReloadInterfaceConfig = { RELOAD_INTERFACE: "RELOAD_INTERFACE" };

/**
 * Emits an event to reload the interface with the given data.
 *
 * @param {GenericScreenStateEnum} data - The data to be passed to the event listener.
 * @return {void} This function does not return anything.
 */
const onReloadInterfaceEmitter = (data) =>
    EventRegister.emit(onReloadInterfaceConfig.RELOAD_INTERFACE, data);

/**
 * Registers an event listener for the 'RELOAD_INTERFACE' event and returns a function
 * that can be used to remove the listener. The callback function passed to the
 * event listener will be called with the data passed to the 'onReloadInterfaceEmitter'
 * function.
 *
 * @param {function(GenericScreenStateEnum)} callback - The callback function to be called when
 * the 'RELOAD_INTERFACE' event is emitted. Defaults to an empty function.
 * @return {onReloadInterfaceConfig} - A function that can be called to remove the event listener.
 */
const onReloadInterfaceEventListener = (callback = (message) => {}) => {
    return EventRegister.addEventListener(onReloadInterfaceConfig.RELOAD_INTERFACE, callback);
};

/**
 * Removes the event listener for the specified event.
 *
 * @param {string} event - The name of the event to remove the listener for.
 * @return {void} This function does not return anything.
 */
const onReloadInterfaceRemove = (event) => EventRegister.removeEventListener(event);

const onReloadInterfaceEvent = {
    emmiter: onReloadInterfaceEmitter,
    listener: onReloadInterfaceEventListener,
    remove: onReloadInterfaceRemove,
};

export default onReloadInterfaceEvent;
