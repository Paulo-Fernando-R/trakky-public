import LogModel from "../data/models/log-model";
import firestoreService from "../services/firestore-service/firestore-service";
import AuthModel from "../data/models/auth-model";
import { request } from "../services/custom-rest-client/axios-interceptor";

export default class LogRepository {
    constructor() {}

    /**
     * Asynchronously sends a log entry based on the type of error and the error details.
     *
     * @param {string} typeError - The type of error.
     * @param {CustomError} error - The error details.
     * @return {Promise<void>} A promise representing the result of sending the log.
     */
    async sendLog(typeError, error) {
        try {
            const response = await this.getUserData();
            if (!response) {
                const log = new LogModel("No email signed", "No name signed", typeError, error);
                await firestoreService.storeData(log);
                return;
            }
            const log = new LogModel(response.email, response.name, typeError, error);
            await firestoreService.storeData(log);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("LogRepository - sendLog", error);
        }
    }

/**
 * Retrieves user data from the server.
 *
 * @return {Promise<AuthModel | undefined>} The user profile data, or undefined if there was an error.
 */
    async getUserData() {
        try {
            const response = await request.get("/Edit/Info");

            if (!response) {
                return;
            }

            if (response.status === 401) {
                return;
            }
            if (response.status === 400 || response.status === 500) {
                return;
            }

            if (response.status !== 200) {
                return;
            }

            const json = response.data;
            const profile = AuthModel.fromJson(json);

            return profile;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("AuthRepository - getProfileData", error);
            return;
        }
    }
}
