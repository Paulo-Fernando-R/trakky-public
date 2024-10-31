/* eslint-disable no-unused-vars */
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import onReloadInterfaceEvent from "../../../events/onReloadInterface";
import SearchRepository from "../../../repositories/search-repository";
import backgroundDeliveriesUpdateService from "../../../services/background-deliveries-update-service/background-deliveries-update-service";
import stringFormatters from "../../../utils/string-formatters";
import * as Location from "expo-location";

export default class SearchDeliveryDetailsController {
    #repository = new SearchRepository();
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
     * @return {void}
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
        setPermissions
    ) {
        setScreenState(GenericScreenStateEnum.loading);

        try {
            const response = await this.#repository.getDeliveryDetails(deliveryId);
            //console.log(response.toString())
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
            console.error(error, "<= Searchdeliverydetailscontroller - getDeliveryData");
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

    //Fim antigo

    async saveDelivery(id = 0, setScreenState, setErrorMessage, setVisible, description) {
        setScreenState(GenericScreenStateEnum.loading);
        try {
            await this.#repository.saveDeliveryForUser(id);
            await backgroundDeliveriesUpdateService.registerBackgroundFetchAsync(id, description);
            setScreenState(GenericScreenStateEnum.sucess);
            setErrorMessage("Salva com sucesso");
            onReloadInterfaceEvent.emmiter(GenericScreenStateEnum.reloading);
            setVisible(true);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error(error, "<= Searchdeliverydetailscontroller - saveDelivery");
            setScreenState(GenericScreenStateEnum.error);
            setErrorMessage(error.message);
            setVisible(true);
        }
    }
}
