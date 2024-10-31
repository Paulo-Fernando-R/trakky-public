/* eslint-disable no-undef */
import MetadataRepository from "../../repositories/metadata-repository";
import GenericScreenStateEnum from "../../data/enums/generic-screen-state-enum";
import DeliveryRepository from "../../repositories/delivery-repository";
import DeliveryModel from "../../data/models/delivery-model";
import DeliveryAddressModel from "../../data/models/delivery-address-model";
import EditDeliveryPrivateController from "./edit-deliveries-private-controller";

export default class EditDeliveryController {
    #repository;
    #deliveryRepository;
    #zipCodeMask;
    #privateController;
    #cities;
    errorsModel;

    constructor() {
        this.#repository = new MetadataRepository();
        this.#deliveryRepository = new DeliveryRepository();
        this.#zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
        this.#privateController = new EditDeliveryPrivateController();
        this.errorsModel = this.#privateController.defaultErrors();
    }

    /**
     * Asynchronously retrieves delivery data and sets the corresponding state variables.
     *
     * @param {string} deliveryId - The ID of the delivery to retrieve.
     * @param {function} setMessage - A function to set the message state.
     * @param {function} setScreenState - A function to set the screen state.
     * @param {function} setVisible - A function to set the visibility state.
     * @param {function} setOrigin - A function to set the origin state.
     * @param {function} setDestination - A function to set the destination state.
     * @param {function} setObservation - A function to set the observation state.
     * @param {function} setDescription - A function to set the description state.
     * @param {function} setcepOrigin - A function to set the origin CEP state.
     * @param {function} setdistrictOrigin - A function to set the origin district state.
     * @param {function} setstreetOrigin - A function to set the origin street state.
     * @param {function} setnumberOrigin - A function to set the origin number state.
     * @param {function} setcomplementOrigin - A function to set the origin complement state.
     * @param {function} setcepDestination - A function to set the destination CEP state.
     * @param {function} setdistrictDestination - A function to set the destination district state.
     * @param {function} setstreetDestination - A function to set the destination street state.
     * @param {function} setnumberDestination - A function to set the destination number state.
     * @param {function} setcomplementDestination - A function to set the destination complement state.
     * @return {Promise<void>} A Promise that resolves when the delivery data has been retrieved and the state variables have been set.
     */
    async getDeliveryData(
        deliveryId,
        setMessage,
        setScreenState,
        setVisible,
        setOrigin,
        setDestination,
        setObservation,
        setDescription,
        setcepOrigin,
        setdistrictOrigin,
        setstreetOrigin,
        setnumberOrigin,
        setcomplementOrigin,
        setcepDestination,
        setdistrictDestination,
        setstreetDestination,
        setnumberDestination,
        setcomplementDestination
    ) {
        try {
            setScreenState(GenericScreenStateEnum.loading);

            const delivery = await this.#deliveryRepository.deliveryAllDataById(deliveryId);

            const auxOrigin = delivery.Origin.city + " - " + delivery.Origin.uf;
            const auxDestination = delivery.Destination.city + " - " + delivery.Destination.uf;

            if (this.#cities instanceof Array) {
                this.#cities.forEach((e) => {
                    if (e.label === auxOrigin) {
                        setOrigin(e);
                    }

                    if (e.label === auxDestination) {
                        setDestination(e);
                    }
                });
            }

            setDescription(delivery.Description);
            setObservation(delivery.Observation);

            setcepOrigin(delivery.Destination.cep);
            setdistrictOrigin(delivery.Origin.district);
            setstreetOrigin(delivery.Origin.street);
            setnumberOrigin(delivery.Origin.number);
            setcomplementOrigin(delivery.Origin.complement);

            setdistrictDestination(delivery.Destination.district);
            setstreetDestination(delivery.Destination.street);
            setnumberDestination(delivery.Destination.number);
            setcomplementDestination(delivery.Destination.complement);
            setcepDestination(delivery.Destination.cep);

            setScreenState(GenericScreenStateEnum.sucess);
        } catch (error) {
            console.error(error, "<= EditDeliveryController - getDeliveryData");
            setScreenState(GenericScreenStateEnum.error);
            setMessage(error.message);
            setVisible(true);
        }
    }

    /**
     * An asynchronous function to fetch cities and update the screen state.
     *
     * @param {function} setScreenState - A function to set the state of the screen
     * @param {Array} cities - An array of city objects with key and value properties
     */
    async getCities(setScreenState = () => {}, cities = [{ label: "", value: "" }]) {
        setScreenState(GenericScreenStateEnum.loading);
        cities.length < 2 && cities.pop();

        try {
            const response = await this.#repository.getIbgeCities();

            if (response instanceof Array) {
                response.forEach((element) => {
                    cities.push({
                        value: element.cityIbgeId,
                        label: `${element.cityName} - ${element.ufName}`,
                    });
                });

                this.#cities = cities;
            }

            setScreenState(GenericScreenStateEnum.sucess);
        } catch (error) {
            setScreenState(GenericScreenStateEnum.error);
            console.error(error, "<= EditDeliveryController - getCities");
        }
    }

    /**
     * Handles the submission of a form to create a delivery.
     *
     * @param {string} description - The description of the delivery.
     * @param {object} origin - The origin address of the delivery.
     * @param {object} destination - The destination address of the delivery.
     * @param {string} observation - The observation for the delivery.
     * @param {function} setErrors - The function to set the errors state.
     * @param {function} setMessage - The function to set the message state.
     * @param {function} setScreenState - The function to set the screen state.
     * @param {function} setVisible - The function to set the visibility state.
     * @param {function} setOrigin - The function to set the origin state.
     * @param {function} setDestination - The function to set the destination state.
     * @param {function} setObservation - The function to set the observation state.
     * @param {function} setDescription - The function to set the description state.
     * @param {string} cepOrigin - The CEP of the origin address.
     * @param {function} setcepOrigin - The function to set the CEP of the origin address.
     * @param {string} districtOrigin - The district of the origin address.
     * @param {function} setdistrictOrigin - The function to set the district of the origin address.
     * @param {string} streetOrigin - The street of the origin address.
     * @param {function} setstreetOrigin - The function to set the street of the origin address.
     * @param {string} numberOrigin - The number of the origin address.
     * @param {function} setnumberOrigin - The function to set the number of the origin address.
     * @param {string} complementOrigin - The complement of the origin address.
     * @param {function} setcomplementOrigin - The function to set the complement of the origin address.
     * @param {string} cepDestination - The CEP of the destination address.
     * @param {function} setcepDestination - The function to set the CEP of the destination address.
     * @param {string} districtDestination - The district of the destination address.
     * @param {function} setdistrictDestination - The function to set the district of the destination address.
     * @param {string} streetDestination - The street of the destination address.
     * @param {function} setstreetDestination - The function to set the street of the destination address.
     * @param {string} numberDestination - The number of the destination address.
     * @param {function} setnumberDestination - The function to set the number of the destination address.
     * @param {string} complementDestination - The complement of the destination address.
     * @param {function} setcomplementDestination - The function to set the complement of the destination address.
     * @return {Promise<void>} - A promise that resolves when the delivery is created.
     */
    async handleSubmit(
        description,
        origin,
        destination,
        observation,
        setErrors,
        setMessage,
        setScreenState,
        setVisible,
        setOrigin,
        setDestination,
        setObservation,
        setDescription,

        cepOrigin,
        setcepOrigin,
        districtOrigin,
        setdistrictOrigin,
        streetOrigin,
        setstreetOrigin,
        numberOrigin,
        setnumberOrigin,
        complementOrigin,
        setcomplementOrigin,
        cepDestination,
        setcepDestination,
        districtDestination,
        setdistrictDestination,
        streetDestination,
        setstreetDestination,
        numberDestination,
        setnumberDestination,
        complementDestination,
        setcomplementDestination,
        deliveryId
    ) {
        const errors = this.#privateController.validateFields(
            description,
            origin,
            destination,
            cepOrigin,
            districtOrigin,
            streetOrigin,
            numberOrigin,
            cepDestination,
            districtDestination,
            streetDestination,
            numberDestination,
            this.errorsModel
        );

        setErrors(errors);
        if (
            errors.description.error ||
            errors.origin.error ||
            errors.destination.error ||
            errors.observation.error
        ) {
            return;
        }

        setScreenState(GenericScreenStateEnum.loading);

        try {
            const ufOrigin = origin.label
                .substring(origin.label.lastIndexOf("-") + 1, origin.label.length)
                .trim();

            const ufDestination = destination.label
                .substring(destination.label.lastIndexOf("-") + 1, destination.label.length)
                .trim();

            const cityOrigin = origin.label.substring(0, origin.label.lastIndexOf("-") - 1).trim();

            const cityDestination = destination.label
                .substring(0, destination.label.lastIndexOf("-") - 1)
                .trim();

            const delivery = DeliveryModel.fromJson();

            delivery.DeliveryId = deliveryId;
            delivery.Description = description;
            delivery.Origin = new DeliveryAddressModel(
                cepOrigin,
                ufOrigin,
                cityOrigin,
                districtOrigin,
                streetOrigin,
                numberOrigin,
                complementOrigin
            );
            delivery.Destination = new DeliveryAddressModel(
                cepDestination,
                ufDestination,
                cityDestination,
                districtDestination,
                streetDestination,
                numberDestination,
                complementDestination
            );
            delivery.Observation = observation;

            // eslint-disable-next-line no-unused-vars
            const response = await this.#deliveryRepository.editDelivery(delivery);

            setMessage(`Entrega "${description}" atualizada com sucesso!`);
            setVisible(true);
            this.#privateController.clearFields(
                setDescription,
                setOrigin,
                setDestination,
                setObservation,
                setcepOrigin,
                setdistrictOrigin,
                setstreetOrigin,
                setnumberOrigin,
                setcomplementOrigin,
                setcepDestination,
                setdistrictDestination,
                setstreetDestination,
                setnumberDestination,
                setcomplementDestination
            );
            setScreenState(GenericScreenStateEnum.sucess);
        } catch (error) {
            setMessage(error.message);
            setScreenState(GenericScreenStateEnum.error);
            setVisible(true);
            console.error(error, "<= EditDeliveriesController - handleSubmit");
        }
    }

    get zipCodeMask() {
        return this.#zipCodeMask;
    }
}
