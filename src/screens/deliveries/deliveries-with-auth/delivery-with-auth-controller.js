import DeliveryRepository from "../../../repositories/delivery-repository";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum.js";
import BackgroundLocationService from "../../../services/background-location-service/background-location-service";
import onReloadInterfaceEvent from "../../../events/onReloadInterface.js";

export default class DeliveryWithAuthController {
    #repository = new DeliveryRepository();

    constructor() {}

    /**
     * Retrieves the deliveries asynchronously and updates the UI accordingly.
     *
     * @param {function} setBlankPage - A function to set the blank page state.
     * @param {function} setDeliveries - A function to set the deliveries.
     * @param {function} setLoading - A function to set the loading state.
     * @param {function} setRefreshing - A function to set the refreshing state.
     * @return {Promise<void>} A promise that resolves when the deliveries are retrieved and the UI is updated.
     */
    async getDeliveries(setBlankPage, setDeliveries, setLoading, setRefreshing) {
        setLoading(GenericScreenStateEnum.loading);
        try {
            const response = await this.#repository.getDeliveries();

            setLoading(GenericScreenStateEnum.sucess);
            setRefreshing(false);

            if (response.length < 1) {
                setBlankPage(true);
                return;
            }

            setDeliveries(response);
            setBlankPage(false);
        } catch (error) {
            setBlankPage(true);
            // eslint-disable-next-line no-undef
            console.log(error, "<= DeliveryWithAuthController - getDeliveries");
            setLoading(GenericScreenStateEnum.error);
        }
    }

    /**
     * Handles the press event on a card.
     *
     * @param {Object} delivery - The delivery object.
     * @param {Function} setDelivery - The function to set the delivery state.
     * @param {Function} setModalVisible - The function to set the modal visibility state.
     * @param {boolean} isModalVisible - The current visibility state of the modal.
     * @return {void}
     */
    cardPress(delivery, setDelivery, setModalVisible, isModalVisible) {
        setDelivery(delivery);
        this.toggleModal(setModalVisible, isModalVisible);
    }

    /**
     * Handles the long press event on a delivery card.
     *
     * @param {DeliveryModel} delivery - The delivery object.
     * @param {function} setDelivery - The function to set the selected delivery.
     * @param {function} setMenuVisible - The function to set the visibility of the menu.
     */
    cardLongPress(delivery, setDelivery, setMenuVisible) {
        setMenuVisible(true);
        setDelivery(delivery);
    }

    /**
     * Navigates to the "EditDelivery" screen if the given index is 0.
     *
     * @param {number} index - The index of the delivery.
     * @param {object} navigation - The navigation object.
     * @param {object} delivery - The delivery object.
     * @return {void}
     */
    navigateToEdit(index, navigation, delivery) {
        if (index === 0) navigation.navigate("EditDelivery", { deliveryId: delivery.DeliveryId });
    }

    /**
     * Toggles the visibility of a modal.
     *
     * @param {function} setModalVisible - A function to set the visibility state of the modal.
     * @param {boolean} isModalVisible - The current visibility state of the modal.
     * @return {void}
     */
    toggleModal(setModalVisible, isModalVisible) {
        setModalVisible(!isModalVisible);
    }

    /**
     * Handles the long press event on a delivery card.
     *
     * @param {DeliveryModel} delivery - The delivery object.
     * @param {function} setLoading - The function to set the selected delivery.
     * @param {DeliveryModel[]} deliveries - The current deliveries list.
     */
    async deleteDelivery(
        delivery,
        setLoading,
        deliveries,
        setMenuVisible,
        setBlankPage,
        setMessage,
        setPopupVisible
    ) {
        try {
            setLoading(GenericScreenStateEnum.loading);
            await this.#repository.deleteDeliveryById(delivery.DeliveryId);
            await BackgroundLocationService.removeTaskById(delivery.DeliveryId);
            onReloadInterfaceEvent.emmiter(GenericScreenStateEnum.reloading);
            //throw new CustomError();
            deliveries.splice(
                deliveries.findIndex((e) => e.DeliveryId === delivery.DeliveryId),
                1
            );

            setLoading(GenericScreenStateEnum.sucess);
            setMenuVisible(false);
            if (deliveries.length < 1) {
                setBlankPage(true);
            }
            setMessage(`Entrega ${delivery.Description} excluída com sucesso!`);
            setPopupVisible(true);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error(error, "<= DeliveryWithAuthController - deleteDelivery");

            setLoading(GenericScreenStateEnum.error);
            setMessage(`Não foi possível excluir a entrega`);
            setMenuVisible(false);
            setPopupVisible(true);
        }
    }
}
