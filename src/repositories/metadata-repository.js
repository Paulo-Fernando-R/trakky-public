import axios from "axios";
import { NetworkError, GenericError } from "../exceptions/semanthic-errors";
import AddressModel from "../data/models/address-model";
import CustomError from "../exceptions/custom-error";

export default class MetadataRepository {
    constructor() {}
    /**
     * Asynchronously retrieves a list of IBGE cities.
     *
     * @return {Promise<Array<AddressModel>>} the list of IBGE cities
     */
    async getIbgeCities() {
        // eslint-disable-next-line no-undef
        const url = process.env.EXPO_PUBLIC_IBGE_API_URL

        try {
            const response = await axios.get(url, { validateStatus: () => true });
            if (!response) {
                throw new NetworkError();
            }
            if (response.status !== 200) {
                throw new GenericError();
            }

            const list = [AddressModel.fromJson()];
            list.pop();

            response.data.forEach((element) => {
                list.push(AddressModel.fromJson(element));
            });

            return list;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("MetadataRepository - getIbgeCities", error)
            
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            }
            else throw new GenericError(undefined, error);
        }
    }
}
