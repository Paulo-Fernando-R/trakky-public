import FeedDeliveryRepository from "../../../repositories/FeedDeliveryRepository";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import stringFormatters from "../../../utils/string-formatters";
import * as Location from "expo-location";
import DeliveryRepository from "../../../repositories/delivery-repository";
import backgroundDeliveriesUpdateService from "../../../services/background-deliveries-update-service/background-deliveries-update-service";
import onReloadInterfaceEvent from "../../../events/onReloadInterface";

export default class StartDeliveryDetailsController {
    #repository = new FeedDeliveryRepository();
    #deliveryRepository = new DeliveryRepository();
    constructor() {}

    /**
     * A function to get delivery data.
     *
     * @param {number} deliveryId - the ID of the delivery
     * @param {function} setdescription - function to set the description
     * @param {function} setcreatedAt - function to set the created at timestamp
     * @param {function} setupdatedAt - function to set the updated at timestamp
     * @param {function} setlatitude - function to set the latitude
     * @param {function} setlongitude - function to set the longitude
     * @param {function} setScreenState - function to set the screen state
     * @param {function} setErrorMessage - function to set the error message
     * @param {function} setVisible - function to set visibility
     * @param {function} setcurrentLocationName - function to set the current location name
     * @param {function} setPermissions - function to set permissions
     * @return {Promise<void>}
     */
    async getDeliveryData(
        deliveryId = 0,
        setdescription,
        setcreatedAt,
        setupdatedAt,
        setlatitude,
        setlongitude,
        setScreenState,
        setErrorMessage,
        setVisible,
        setcurrentLocationName,
        // eslint-disable-next-line no-unused-vars
        setPermissions
    ) {
        setScreenState(GenericScreenStateEnum.loading);

        try {
            const response = await this.#repository.getDeliveryDetails(deliveryId);

            // if (response.LastLatitude && response.LastLongitude) {
            //     await this.getCurrentLocationName(
            //         response.LastLatitude,
            //         response.LastLongitude,
            //         setcurrentLocationName,
            //         setErrorMessage,
            //         setVisible,
            //         setScreenState,
            //         setPermissions
            //     );
            // }

            let city = "";
            let uf = "";
            let location = "";

            city = response.LastLocation.city ? response.LastLocation.city : "";
            uf = response.LastLocation.uf ? response.LastLocation.uf : "";
            location = city ? city + ", " : "";
            location += uf;

            setcurrentLocationName(location);
            setdescription(stringFormatters.toTitlecase(response.Description));
            setcreatedAt(response.CreatedAt);
            setupdatedAt(response.LastUpdateTime);
            setlatitude(response.LastLatitude);
            setlongitude(response.LastLongitude);
            setScreenState(GenericScreenStateEnum.sucess);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error(error, "<= 'StartDeliveryDetailsController - getDeliveryData'");
            setScreenState(GenericScreenStateEnum.error);
            setErrorMessage(error.message);
            setVisible(true);
        }
    }

    //?ANTIGO NÃO SERÁ MAIS USADO
    /**
     * Retrieves the name of the current location based on the provided latitude and longitude.
     *
     * @param {number} latitude - The latitude coordinate of the location.
     * @param {number} longitude - The longitude coordinate of the location.
     * @param {function} setcurrentLocationName - Function to set the name of the current location.
     * @param {function} setMessage - Function to set a message.
     * @param {function} setVisible - Function to set the visibility.
     * @param {function} setScreenState - Function to set the screen state.
     * @param {function} setPermissions - Function to set the permissions.
     */
    async getCurrentLocationName(
        latitude,
        longitude,
        setcurrentLocationName,
        setMessage,
        setVisible,
        setScreenState,
        setPermissions
    ) {
        const serviceStatus = await Location.hasServicesEnabledAsync();

        if (!serviceStatus) {
            setMessage("Serviço de localização desativado. Ative-o para usar esta função.");
            setVisible(true);
            setScreenState(GenericScreenStateEnum.error);
            setPermissions(false);
            return;
        }

        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();

        if (foregroundStatus !== "granted") {
            setMessage("Para usar esta função é necessária a permissão de acesso à localização.");
            setVisible(true);
            setScreenState(GenericScreenStateEnum.error);
            setPermissions(false);
            return;
        }

        const response = await Location.reverseGeocodeAsync({
            latitude: latitude,
            longitude: longitude,
        });

        let str = "";

        if (response[0].city) {
            str += response[0].city + ", ";
        }
        if (response[0].district) {
            str += response[0].district + ", ";
        }
        if (response[0].region) {
            str += response[0].region + "";
        }
        setcurrentLocationName(str);
    }

    async deleteDelivery(id = 0, setScreenState, setErrorMessage, setVisible, setDeleted) {
        setScreenState(GenericScreenStateEnum.loading);
        try {
            await this.#deliveryRepository.deleteUserSavedDelivery(id);
            await backgroundDeliveriesUpdateService.removeTaskById(id);
            onReloadInterfaceEvent.emmiter(GenericScreenStateEnum.reloading);
            setScreenState(GenericScreenStateEnum.sucess);
            setErrorMessage("Excluída com sucesso");
            setDeleted(true);
            setVisible(true);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error(error.message, "<= StartDeliveryDetailsController - deleteDelivery");
            setScreenState(GenericScreenStateEnum.error);
            setErrorMessage(error.message);
            setVisible(true);
        }
    }
}
