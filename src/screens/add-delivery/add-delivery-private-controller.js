export default class AddDeliveryPrivateController {
    constructor() {}

    /**
     * Generates the default errors model.
     *
     * @return {Object} The default errors model.
     */
    defaultErrors() {
        const errorsModel = {
            description: {
                error: false,
            },
            origin: {
                error: false,
            },
            destination: {
                error: false,
            },
            observation: {
                error: false,
            },
            cepOrigin: {
                error: false,
            },
            cepDestination: {
                error: false,
            },
            districtOrigin: {
                error: false,
            },
            districtDestination: {
                error: false,
            },
            streetOrigin: {
                error: false,
            },
            streetDestination: {
                error: false,
            },
            numberOrigin: {
                error: false,
            },
            numberDestination: {
                error: false,
            },
        };

        return errorsModel;
    }

    /**
     * Validates the fields of a form.
     *
     * @param {string} description - The description of the form.
     * @param {object} origin - The origin object containing label and value properties.
     * @param {object} destination - The destination object containing label and value properties.
     * @param {string} cepOrigin - The CEP of the origin.
     * @param {string} districtOrigin - The district of the origin.
     * @param {string} streetOrigin - The street of the origin.
     * @param {string} numberOrigin - The number of the origin.
     * @param {string} cepDestination - The CEP of the destination.
     * @param {string} districtDestination - The district of the destination.
     * @param {string} streetDestination - The street of the destination.
     * @param {string} numberDestination - The number of the destination.
     * @param {object} errors - The errors object.
     * @return {object} The updated errors object.
     */
    validateFields(
        description = "",
        origin = { label: undefined, value: undefined },
        destination = { label: undefined, value: undefined },
        cepOrigin,
        districtOrigin,
        streetOrigin,
        numberOrigin,
        cepDestination,
        districtDestination,
        streetDestination,
        numberDestination,
        errors
    ) {
        errors = this.defaultErrors();
        let errorsModel = errors;

        if (description) {
            if (description.length < 3) {
                errorsModel.description.error = true;
            }
        } else {
            errorsModel.description.error = true;
        }

        if (!destination.label || !destination.value) {
            errorsModel.destination.error = true;
        }

        if (!origin.label || !origin.value) {
            errorsModel.origin.error = true;
        }

        // Validação para cepOrigin
        if (cepOrigin) {
            if (cepOrigin.length < 8) {
                errorsModel.cepOrigin.error = true;
            }
        } else {
            errorsModel.cepOrigin.error = true;
        }

        // Validação para districtOrigin
        if (districtOrigin) {
            if (districtOrigin.length < 3) {
                errorsModel.districtOrigin.error = true;
            }
        } else {
            errorsModel.districtOrigin.error = true;
        }

        // Validação para streetOrigin
        if (streetOrigin) {
            if (streetOrigin.length < 3) {
                errorsModel.streetOrigin.error = true;
            }
        } else {
            errorsModel.streetOrigin.error = true;
        }

        // Validação para numberOrigin
        if (numberOrigin) {
            if (numberOrigin.length < 1) {
                errorsModel.numberOrigin.error = true;
            }
        } else {
            errorsModel.numberOrigin.error = true;
        }

        // Validação para complementOrigin

        // Validação para cepDestination
        if (cepDestination) {
            if (cepDestination.length < 8) {
                errorsModel.cepDestination.error = true;
            }
        } else {
            errorsModel.cepDestination.error = true;
        }

        // Validação para districtDestination
        if (districtDestination) {
            if (districtDestination.length < 3) {
                errorsModel.districtDestination.error = true;
            }
        } else {
            errorsModel.districtDestination.error = true;
        }

        // Validação para streetDestination
        if (streetDestination) {
            if (streetDestination.length < 3) {
                errorsModel.streetDestination.error = true;
            }
        } else {
            errorsModel.streetDestination.error = true;
        }

        // Validação para numberDestination
        if (numberDestination) {
            if (numberDestination.length < 1) {
                errorsModel.numberDestination.error = true;
            }
        } else {
            errorsModel.numberDestination.error = true;
        }

        return errorsModel;
    }

    /**
     * Clears all the fields by setting them to an empty string.
     *
     * @param {function} setDescription - function to set the description field
     * @param {function} setOrigin - function to set the origin field
     * @param {function} setDestination - function to set the destination field
     * @param {function} setObservation - function to set the observation field
     * @param {function} setcepOrigin - function to set the cepOrigin field
     * @param {function} setdistrictOrigin - function to set the districtOrigin field
     * @param {function} setstreetOrigin - function to set the streetOrigin field
     * @param {function} setnumberOrigin - function to set the numberOrigin field
     * @param {function} setcomplementOrigin - function to set the complementOrigin field
     * @param {function} setcepDestination - function to set the cepDestination field
     * @param {function} setdistrictDestination - function to set the districtDestination field
     * @param {function} setstreetDestination - function to set the streetDestination field
     * @param {function} setnumberDestination - function to set the numberDestination field
     * @param {function} setcomplementDestination - function to set the complementDestination field
     */
    clearFields(
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
    ) {
        setDescription("");
        setOrigin("");
        setDestination("");
        setObservation("");
        setcepOrigin("");
        setdistrictOrigin("");
        setstreetOrigin("");
        setnumberOrigin("");
        setcomplementOrigin("");
        setcepDestination("");
        setdistrictDestination("");
        setstreetDestination("");
        setnumberDestination("");
        setcomplementDestination("");
    }
}
