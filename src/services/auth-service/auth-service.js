import AuthStateEnum from "../../data/enums/auth-state-enum";
import AuthModel from "../../data/models/auth-model";
import storageService from "../storage-service/storage-service";

/**
 * Asynchronously stores the authData in the storage service.
 *
 * @param {AuthModel} authData - the auth data to be stored
 * @return {Promise<void>} a Promise that resolves when the authData is stored
 */
async function storeAuth(authData) {
    const json = {
        authStatus: authData.authStatus,
        birthDate: authData.birthDate,
        email: authData.email,
        name: authData.name,
        password: authData.password,
        sessionExpiration: authData.sessionExpiration,
        token: authData.token,
    };

    try {
        await storageService.storeData("authData", JSON.stringify(json));
    } catch (error) {
        console.error(error);
    }
}

/**
 * Asynchronously retrieves the authentication data from storage, parses it, and
 * checks for session expiration. Returns the authentication model.
 *
 * @return {Promise<AuthModel>} The authentication model
 */
async function getAuth() {
    try {
        const jsonValue = await storageService.getData("authData");
        if (jsonValue != null) {
            const parsedJson = JSON.parse(jsonValue);
            const authData = new AuthModel(
                parsedJson.name,
                parsedJson.email,
                Date.parse(parsedJson.birthDate),
                parsedJson.password,
                parsedJson.authStatus,
                Date.parse(parsedJson.sessionExpiration),
                parsedJson.token
            );

            if (!authData.sessionExpiration > Date.now()) {
                authData.authStatus = AuthStateEnum.notAuthenticated;
            }
            return authData;
        }

        //console.info("No authData found in storage");
        return AuthModel.fromJson();
    } catch (error) {
        console.error(error);
        return AuthModel.fromJson();
    }
}

/**
 * Asynchronously removes the "authData" from storageService.
 *
 * @return {Promise<Boolean>} true if successful, false otherwise
 */
async function removeAuth() {
    try {
        await storageService.removeData("authData");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const authService = {
    storeAuth,
    getAuth,
    removeAuth,
};

export default authService;
