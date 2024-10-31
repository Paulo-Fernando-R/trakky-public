import { request } from "../services/custom-rest-client/axios-interceptor";
import CustomError from "../exceptions/custom-error";
import {
    GenericError,
    NetworkError,
    UnauthorizedError,
    NotFoundError,
} from "../exceptions/semanthic-errors";
import DeliveryModel from "../data/models/delivery-model";

export default class FeedDeliveryRepository {
    constructor() {}

    /**
     * Retrieves saved deliveries from the server.
     *
     * @return {Promise<DeliveryModel[]>} An array of DeliveryModel objects representing saved deliveries.
     */
    async getSavedDeliveries() {
        try {
            const response = await request.get("/Main/AllSavedDeliveries");

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
            // eslint-disable-next-line no-undef
            console.error("FeedDeliveryRepository - getSavedDeliveries", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            }
            throw new GenericError(undefined, error);
        }
    }

    async getDeliveryDetails(deliveryId = 0) {
        try {
            //!Precisa mudar este endpoint depois para o que busca por encomendas salvas
            //!Cado contrário ele vai buscar por encomendas wue não correspondem ao usuarioo
            //!provavelmente este: /GetDelivery/Saved/Detailed/{DeliveryId}
            //! Ainda necessário confirmar pois estou usando o endpoint de listar modificado para listar todas as encomendas ao inves das específicas
            const response = await request.get(`/OrderNotSaved/Details/${deliveryId}`);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 404) {
                throw new NotFoundError();
            }

            if (response.status !== 200) {
                throw new GenericError();
            }

            const result = response.data;

            const delivery = DeliveryModel.fromJson(result);

            return delivery;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("FeedDeliveryRepository - getDeliveryDetails", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }
}
