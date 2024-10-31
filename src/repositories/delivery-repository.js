import { request } from "../services/custom-rest-client/axios-interceptor";
import CustomError from "../exceptions/custom-error";
import {
    NotFoundError,
    GenericError,
    NetworkError,
    UnauthorizedError,
} from "../exceptions/semanthic-errors";
import DeliveryModel from "../data/models/delivery-model";
// eslint-disable-next-line no-unused-vars
import LocationModel from "../data/models/location-model";
import DeliveryStatusEnum from "../data/enums/delivery-status-enum";
import backgroundLocationService from "../services/background-location-service/background-location-service";
import ufAcronymFormatters from "../utils/uf-acronym-formatters";
import stringFormatters from "../utils/string-formatters";

export default class DeliveryRepository {
    constructor() {}

    /**
     * Retrieves a list of deliveries for the current user.
     *
     * @return {Promise<Array<DeliveryModel>>} An array of DeliveryModel objects representing the user's deliveries.
     * @throws {NetworkError} If there is an issue with the network connection.
     * @throws {NotFoundError} If the requested deliveries are not found.
     * @throws {GenericError} If the server returns a non-200 status code.
     */
    async getDeliveries() {
        try {
            const response = await request.get("/Delivery/UserDeliveries");

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 404) {
                throw new NotFoundError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError();
            }

            if (response.status !== 200) {
                throw new GenericError();
            }

            const json = response.data;

            const deliveries = [];

            json.map((e) => {
                const delivery = DeliveryModel.fromJson(e);
                deliveries.push(delivery);
            });
            return deliveries;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("DeliveryRepository - getDeliveries", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Generate a new delivery by adding it to the system.
     *
     * @param {DeliveryModel} delivery - the delivery object to be created
     * @return {Promise<Object>} the result object containing id and code of the created delivery
     */
    async createDelivery(delivery = new DeliveryModel()) {
        try {
            const data = {
                observation: delivery.Observation,
                description: delivery.Description,
                origin: {
                    cep: delivery.Origin.cep,
                    uf: delivery.Origin.uf,
                    city: delivery.Origin.city,
                    district: delivery.Origin.district,
                    street: delivery.Origin.street,
                    number: delivery.Origin.number,
                    complement: delivery.Origin.complement,
                },
                destiny: {
                    cep: delivery.Destination.cep,
                    uf: delivery.Destination.uf,
                    city: delivery.Destination.city,
                    district: delivery.Destination.district,
                    street: delivery.Destination.street,
                    number: delivery.Destination.number,
                    complement: delivery.Destination.complement,
                },
            };

            const response = await request.post("/AddDelivery/Add", data);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError("Não autorizado, faça login primeiro");
            }

            if (response.status !== 200) {
                throw new GenericError();
            }

            const result = {
                id: response.data.id,
                code: response.data.code,
            };

            return result;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("DeliveryRepository - createDelivery", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    async editDelivery(delivery = new DeliveryModel()) {
        try {
            const data = {
                deliveryId: delivery.DeliveryId,
                observation: delivery.Observation,
                description: delivery.Description,
                origin: {
                    cep: delivery.Origin.cep,
                    uf: delivery.Origin.uf,
                    city: delivery.Origin.city,
                    district: delivery.Origin.district,
                    street: delivery.Origin.street,
                    number: delivery.Origin.number,
                    complement: delivery.Origin.complement,
                },
                destiny: {
                    cep: delivery.Destination.cep,
                    uf: delivery.Destination.uf,
                    city: delivery.Destination.city,
                    district: delivery.Destination.district,
                    street: delivery.Destination.street,
                    number: delivery.Destination.number,
                    complement: delivery.Destination.complement,
                },
            };

            const response = await request.put("/Delivery/Delivery", data);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError("Não autorizado, faça login primeiro");
            }

            if (response.status !== 204) {
                throw new GenericError();
            }

            const result = {
                id: response.data.id,
                code: response.data.code,
            };

            return result;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("DeliveryRepository", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Update the delivery position.
     *
     * @param {LocationModel} location - the location object
     * @param {number} deliveryId - the delivery ID
     * @return {Promise<boolean>} true if the position was updated successfully
     */
    async updateDeliveryPosition(location, deliveryId) {
        //!Fazer localização reversa no service e mandar aqui por parametro
        //?Localização reversa adicionada
        const response = await backgroundLocationService.getRevereseLocation(
            location.latitude,
            location.longitude
        );

        const data = [
            {
                delivery_id: deliveryId,
                latitude: location.latitude,
                longitude: location.longitude,

                address: {
                    uf: ufAcronymFormatters.getAcronymByName(response.region),
                    city: response.city ?? response.district ?? response.subregion ?? "",
                    cep: stringFormatters.cepToDatabaseFormat(response.postalCode) ?? "",
                },
            },
        ];

        try {
            const response = await request.post("/Position/NewPosition", data);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError("Não autorizado, faça login novamente.");
            }

            if (response.status !== 200) {
                throw new GenericError(
                    "Failed to update delivery position - Status code: " + response.status
                );
            }

            return true;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("DeliveryRepository - updateDeliveryPosition", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Deletes a user-saved delivery with the given ID.
     *
     * @param {number} id - The ID of the delivery to delete. Defaults to 0.
     * @return {Promise<void>} - A Promise that resolves when the delivery is deleted successfully, or rejects with an error.
     * @throws {NetworkError} - If there is an issue with the network connection.
     * @throws {NotFoundError} - If the delivery with the given ID is not found.
     * @throws {GenericError} - If the server returns a non-204 status code.
     */
    async deleteUserSavedDelivery(id = 0) {
        try {
            const response = await request.delete(`/DeliveryDetails/FromSaved/${id}`);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 404) {
                throw new NotFoundError();
            }

            if (response.status !== 204) {
                throw new GenericError();
            }
        } catch (e) {
            // eslint-disable-next-line no-undef
            console.error("DeliveryRepository - deleteUserSavedDelivery", e);
            if (e instanceof CustomError) {
                e.defaultError = { ...e };
                throw e;
            } else throw new GenericError(undefined, e);
        }
    }

    /**
     * Retrieves all data for a delivery by its ID.
     *
     * @param {number} id - The ID of the delivery to retrieve data for. Defaults to 0.
     * @return {Promise<DeliveryModel>} A DeliveryModel object representing the delivery data.
     */
    async deliveryAllDataById(id = 0) {
        try {
            const response = await request.get(`/Delivery/Delivery/${id}`);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError("Não autorizado, faça login primeiro");
            }

            if (response.status !== 200) {
                throw new GenericError();
            }

            const result = response.data;
            return DeliveryModel.fromJson(result);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("DeliveryRepository - deliveryAllDataById", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    async deleteDeliveryById(id) {
        try {
            const response = await request.delete(`/Delivery/Delivery/${id}`);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError();
            }

            if (response.status !== 204) {
                // eslint-disable-next-line no-undef
                console.error("|/", "error status: ", response.status);
                throw new GenericError();
            }
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("DeliveryRepository - deleteDeliveryById", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Asynchronously updates the status of a delivery with the given ID to the specified status.
     *
     * @param {number} id - The ID of the delivery to update.
     * @param {number} status - The new status to set for the delivery.
     * @return {Promise<void>} A Promise that resolves when the delivery status has been successfully updated.
     */
    async updateDeliveryStatus(id, status) {
        if (status > DeliveryStatusEnum.complete) {
            return;
        }
        const data = {
            delivery_id: id,
            status: status,
        };

        try {
            const response = await request.put("/DeliveryDetails/Status", data);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError();
            }

            if (response.status === 500) {
                throw new GenericError("Erro interno");
            }

            if (response.status !== 204) {
                throw new GenericError();
            }
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("DeliveryRepository - updateDeliveryStatus", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }
}
