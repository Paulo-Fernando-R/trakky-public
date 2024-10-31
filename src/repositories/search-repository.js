/* eslint-disable no-undef */
import { request } from "../services/custom-rest-client/axios-interceptor";
import {
    NetworkError,
    GenericError,
    UnauthorizedError,
    NotFoundError,
} from "../exceptions/semanthic-errors";
import CustomError from "../exceptions/custom-error";
import DeliveryModel from "../data/models/delivery-model";

export default class SearchRepository {
    constructor() {}

    /**
     * Async function to get delivery information by code.
     *
     * @param {string} code - The code used to search for delivery information
     * @return {Promise<DeliveryModel[]>} An array of delivery objects
     */
    async getDeliveryByCode(code = "") {
        const data = {
            text: code,
        };

        try {
            const response = await request.post("/Search/Search", data);
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

            const deliveries = [];

            if (result instanceof Array) {
                result.forEach((e) => {
                    deliveries.push(DeliveryModel.fromJson(e));
                });
            }

            return deliveries;
        } catch (error) {
            console.log("SearchRepository - getDeliveryByCode", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Retrieves the details of a delivery.
     *
     * @param {number} deliveryId - The ID of the delivery. Defaults to 0.
     * @return {Promise<DeliveryModel>} The delivery details.
     */
    async getDeliveryDetails(deliveryId = 0) {
        try {
            const response = await request.get(`/OrderNotSaved/Details/${deliveryId}`);
            // console.log(deliveryId,response.data)
            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError();
            }

            if (response.status === 404) {
                throw new NotFoundError();
            }

            if (response.status !== 200) {
                throw new GenericError("Status: " + response.status, response.statusText);
            }

            const result = response.data;

            const delivery = DeliveryModel.fromJson(result);

            return delivery;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("SearchRepository - getDeliveryDetails", error);

            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Saves a delivery for a user.
     *
     * @param {number} id - The ID of the delivery to save. Defaults to 0.
     * @return {Promise<void>} - A promise that resolves when the delivery is saved successfully, or rejects with an error.
     * @throws {NetworkError} - If there is a network error while making the request.
     * @throws {UnauthorizedError} - If the user is not authorized to save the delivery.
     * @throws {NotFoundError} - If the delivery with the given ID is not found.
     * @throws {GenericError} - If the server responds with a status code other than 204.
     */
    async saveDeliveryForUser(id = 0) {
        try {
            const response = await request.post(`/OrderNotSaved/Save/${id}`);
            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError("Não autorizado, faça login primeiro");
            }

            if (response.status === 404) {
                throw new NotFoundError();
            }

            if (response.status !== 204) {
                throw new GenericError();
            }
        } catch (e) {
            // eslint-disable-next-line no-undef
            console.log("MetadataRepository - saveDeliveryForUser", e);
            if (e instanceof CustomError) {
                e.defaultError = { ...e };
                throw e;
            } else throw new GenericError(undefined, e);
        }
    }
}
