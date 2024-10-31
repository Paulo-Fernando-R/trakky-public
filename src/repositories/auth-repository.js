import {
    NotFoundError,
    GenericError,
    NetworkError,
    UnauthorizedError,
} from "../exceptions/semanthic-errors";
import { request } from "../services/custom-rest-client/axios-interceptor";
import CustomError from "../exceptions/custom-error";
import AuthModel from "../data/models/auth-model";
import dateFormatters from "../utils/date-formatters";

export default class AuthRepository {
    constructor() {}

    /**
     * Asynchronously logs in the user with the given email and password.
     *
     * @param {string} email - the user's email
     * @param {string} password - the user's password
     * @return {Promise<AuthModel>} the user's authentication information
     */
    async login(email = "", password = "") {
        try {
            const data = {
                email: email,
                password: password,
            };
            const response = await request.post("/Login/SignIn", data);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 404) {
                throw new NotFoundError("Usuário ou senha estão incorretos");
            }

            if (response.status !== 200) {
                throw new GenericError();
            }

            const json = JSON.parse(JSON.stringify(response.data));

            const auth = AuthModel.fromJson(json);

            return auth;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("AuthRepository - login");

            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Asynchronously creates a new user with the provided user data.
     *
     * @param {AuthModel} [userData=new AuthModel()] - The user data to create the user with.
     * @return {Promise<Object>} - A promise that resolves to an object with the following properties:
     *   - sucess: A boolean indicating whether the user creation was successful.
     *   - message: A string with a message describing the result of the user creation.
     * @throws {NetworkError} - If there was an error with the network request.
     * @throws {NotFoundError} - If the server responded with a 404 status code.
     * @throws {GenericError} - If the server responded with a 400 status code or any other non-200 status code.
     */
    async create(userData = new AuthModel()) {
        try {
            const data = {
                email: userData.email,
                password: userData.password,
                fullname: userData.name,
                birth_date: dateFormatters.toDatabaseDate(userData.birthDate),
            };

            const response = await request.post("/Register/SignUp", data);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 404) {
                throw new NotFoundError("Usuário ou senha estão incorretos");
            }

            if (response.status === 400) {
                throw new GenericError("Este E-mail já está cadastrado");
            }

            if (response.status !== 200) {
                throw new GenericError();
            }

            const json = {
                sucess: response.data.success ?? false,
                message: response.data.message ?? "",
            };

            return json;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("AuthRepository - create", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Asynchronously retrieves the profile data.
     *
     * @return {Promise<AuthModel>} The profile data retrieved.
     */
    async getProfileData() {
        try {
            const response = await request.get("/Edit/Info");

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 401) {
                throw new UnauthorizedError();
            }
            if (response.status === 400 || response.status === 500) {
                throw new GenericError("Erro interno do servidor");
            }

            if (response.status !== 200) {
                throw new GenericError("");
            }

            const json = response.data;
            const profile = AuthModel.fromJson(json);

            return profile;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("AuthRepository - getProfileData", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Asynchronously updates the profile data with the provided profile information.
     *
     * @param {AuthModel} - The profile data to update.
     * @param {currentEmail} - The current user email before update
     * @return {Promise<Object>} - An object with the updated profile data:
     *   - sucess: A boolean indicating the success of the update.
     *   - message: A message describing the outcome of the update.
     */
    async updateProfileData(profile) {
        const data = {
            email: profile.email,
            password: profile.password,
            fullname: profile.name,
            birth_date: dateFormatters.toDatabaseDate(profile.birthDate),
        };

        try {
            const response = await request.put("/Edit/User", data);

            if (!response) {
                throw new NetworkError();
            }
            if (response.status === 401) {
                throw new UnauthorizedError();
            }
            if (response.status === 400) {
                throw new GenericError(response.data);
            }

            if (response.status === 500) {
                throw new GenericError("Erro interno do servidor");
            }

            if (response.status !== 200) {
                throw new GenericError();
            }

            const json = {
                success: response.data.success,
                message: response.data.message,
            };

            return json;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("AuthRepository - updateProfileData", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    async updatePassword(password, newPassword) {
        const data = {
            currentPassword: password,
            newPassword: newPassword,
        };

        try {
            const response = await request.patch("/Password/Change", data);

            if (!response) {
                throw new NetworkError();
            }
            if (response.status === 401) {
                throw new UnauthorizedError();
            }

            if (response.status === 500) {
                throw new GenericError("Erro interno do servidor");
            }

            if (response.status !== 200 && response.status !== 400) {
                throw new GenericError();
            }

            const json = {
                success: response.data.status,
                message: response.data.message,
            };

            return json;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("AuthRepository - updatePassword", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }

    /**
     * Resets the password for the user with the given email.
     *
     * @param {string} email - The email of the user whose password is being reset.
     * @return {Promise<Object>} An object with the following properties:
     *   - success: A boolean indicating whether the password reset was successful.
     *   - message: A string with a message describing the result of the password reset.
     * @throws {NetworkError} If there was an error with the network request.
     * @throws {GenericError} If the server responded with a 500 status code or any other non-200 status code.
     * @throws {NotFoundError} If the server responded with a 404 status code.
     */
    async resetPassword(email) {
        const data = {
            email,
        };

        try {
            const response = await request.post("/Login/ResetPassword", data);

            if (!response) {
                throw new NetworkError();
            }

            if (response.status === 500) {
                throw new GenericError("Erro interno do servidor");
            }

            if (response.status === 404) {
                throw new NotFoundError("E-mail não encontrado");
            }

            if (response.status !== 200) {
                throw new GenericError();
            }

            const json = {
                success: response.data.status,
                message: "E-mail enviado!",
            };

            return json;
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error("AuthRepository - resetPassword", error);
            if (error instanceof CustomError) {
                error.defaultError = { ...error };
                throw error;
            } else throw new GenericError(undefined, error);
        }
    }
}
