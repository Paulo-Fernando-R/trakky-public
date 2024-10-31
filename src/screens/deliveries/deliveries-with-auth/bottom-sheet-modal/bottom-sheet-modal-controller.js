/* eslint-disable no-unused-vars */
import DeliveryRepository from "../../../../repositories/delivery-repository";
import deliveryStatusFormatters from "../../../../utils/delivery-status-formatters";
import DeliveryStatusEnum from "../../../../data/enums/delivery-status-enum";
import * as Clipboard from "expo-clipboard";
import { ToastAndroid } from "react-native";
import backgroundLocationService from "../../../../services/background-location-service/background-location-service";
import DeliveryModel from "../../../../data/models/delivery-model";
import FeedDeliveryRepository from "../../../../repositories/FeedDeliveryRepository";

export default class BottomSheetModalController {
    #repository;
    #auxRepository;

    constructor() {
        this.#repository = new DeliveryRepository();
        this.#auxRepository = new FeedDeliveryRepository();
    }

    async getCurrentLocation(id, setLoading, delivery) {
        setLoading(true);
        try {
            const response = await this.#auxRepository.getDeliveryDetails(id);
            delivery.LastLocation = response.LastLocation;
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err, "- BottomSheetModalController - getCurrentLocation");
            ToastAndroid.show(
                "Não foi possível buscar o local atual da entrega. Tente novamente mais tarde.",
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    }

    /**
     * Updates the screen status and label based on the delivery status.
     *
     * @param {function} setStatus - A function to set the delivery status.
     * @param {function} setLabel - A function to set the delivery status label.
     * @param {DeliveryModel} delivery - The delivery object containing the status.
     * @return {void}
     */
    changeScreenStatus(setStatus, setLabel, delivery) {
        setStatus(() => deliveryStatusFormatters.format(delivery.Status));
        setLabel(() =>
            deliveryStatusFormatters.format(
                delivery.Status < DeliveryStatusEnum.complete
                    ? delivery.Status + 1
                    : DeliveryStatusEnum.complete
            )
        );
        delivery.Status++;
    }

    /**
     * Reverts the screen status and label based on the delivery status.
     *
     * @param {function} setStatus - A function to set the delivery status.
     * @param {function} setLabel - A function to set the delivery status label.
     * @param {DeliveryModel} delivery - The delivery object containing the status.
     * @return {Promise<void>}
     */
    async revertScreenStatus(setStatus, setLabel, delivery) {
        delivery.Status--;
        setStatus(() => deliveryStatusFormatters.format(delivery.Status));
        setLabel(() =>
            deliveryStatusFormatters.format(
                delivery.Status < DeliveryStatusEnum.complete
                    ? delivery.Status + 1
                    : DeliveryStatusEnum.complete
            )
        );
        await backgroundLocationService.removeTaskById(delivery.DeliveryId);
    }

    /**
     * Asynchronously changes the status of a delivery.
     *
     * @param {number} id - The ID of the delivery.
     * @param {function} setLoading - A function to set the loading state.
     * @param {function} setMessage - A function to set the error message.
     * @param {function} setVisible - A function to set the visibility of the error message.
     * @param {function} setStatus - A function to set the delivery status.
     * @param {function} setLabel - A function to set the delivery status label.
     * @param {DeliveryModel} delivery - The delivery object containing the status.
     * @return {Promise<void>} A promise that resolves when the status is successfully updated.
     */
    async changeStatus(id, setLoading, setMessage, setVisible, setStatus, setLabel, delivery) {
        this.changeScreenStatus(setStatus, setLabel, delivery);
        try {
            setLoading(true);
            await this.createTask(id, delivery.Code, setMessage, setVisible, delivery.Status);
            await this.#repository.updateDeliveryStatus(id, delivery.Status);
            ToastAndroid.show("Status atualizado!", ToastAndroid.LONG);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error(error, "at BottomSheetModalController - changeStatus");

            setVisible(true);
            //setMessage("Erro ao tentar alterar o status da entrega, tente novamente!");
            setMessage(error.message);
            await this.revertScreenStatus(setStatus, setLabel, delivery);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Asynchronously copies the given code to the clipboard and displays a toast message.
     *
     * @param {string} code - The code to be copied to the clipboard.
     * @return {Promise<void>} A promise that resolves when the code is successfully copied.
     */
    async copyCode(code) {
        await Clipboard.setStringAsync(code);
        ToastAndroid.show("Código copiado!", ToastAndroid.SHORT);
    }

    /**
     * Updates the label and status based on the given status on modal show.
     *
     * @param {function} setLabel - A function to set the label.
     * @param {function} setStatus - A function to set the status.
     * @param {number} status - The status to be formatted and displayed.
     * @return {void}
     */
    onShow(setLabel, setStatus, status) {
        setStatus(deliveryStatusFormatters.format(status));
        setLabel(
            deliveryStatusFormatters.format(
                status < DeliveryStatusEnum.complete ? status + 1 : DeliveryStatusEnum.complete
            )
        );
    }

    /**
     * Creates a task for background location updates.
     *@param {number} id - The ID of the task.
     *@param {string} code - The code for the task.
     *@param {function} setMessage - A function to set a message.
     *@param {function} setVisible - A function to set visibility.
     *@param {DeliveryStatusEnum} status - The status of the delivery.
     *@throws {Error} If the location service is disabled or permission is denied.
     *@throws {Error} If there is an error registering the task.
     *@return {Promise<void>} A promise that resolves when the task is created.
     */
    async createTask(id, code, setMessage, setVisible, status) {
        const serviceStatus = await backgroundLocationService.getLocationServiceStatus();
        if (!serviceStatus) {
            setMessage("Serviço de localização desativado. Ative-o para usar esta função.");
            setVisible(true);

            throw new Error("Sem acesso a localização");
        }

        const permissionStatus = await backgroundLocationService.requestLocationPermission();
        if (!permissionStatus) {
            setMessage("Permissão de localização negada. Ela é necessária para usar esta função.");
            setVisible(true);

            throw new Error("Sem permissão para usar a localização");
        }

        if (status === DeliveryStatusEnum.inTransport) {
            try {
                const res = await backgroundLocationService.registerBackgroundFetchAsync(code, id);
                setMessage(
                    "As atualizações de localização para esta entrega estão ativadas a partir de agora."
                );
                setVisible(true);
            } catch (error) {
                setMessage("Erro ao registrar a tarefa. Tente novamente.");
                setVisible(true);
                throw new Error("Erro ao registrar task", id);
            }

            return;
        }
        try {
            await backgroundLocationService.removeTaskById(id);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.warn(error, "at BottomSheetModalController - createTask");
        }
    }
}
