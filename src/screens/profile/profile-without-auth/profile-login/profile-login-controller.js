/* eslint-disable no-undef */
import AuthStateEnum from "../../../../data/enums/auth-state-enum";
import AuthRepository from "../../../../repositories/auth-repository";
import authService from "../../../../services/auth-service/auth-service";
import createBackgroundTasksService from "../../../../services/create-background-tasks-service/create-background-tasks-service";
import { CommonActions } from "@react-navigation/native";

export default class ProfileLoginController {
    errorsModel = {
        email: {
            error: false,
        },
        password: {
            error: false,
        },
    };

    #repository = new AuthRepository();

    constructor() {}

    /**
     * Validates the fields of the form.
     *
     * @param {string} email - The email address to be validated.
     * @param {string} password - The password to be validated.
     * @return {object} - The errorsModel object containing any validation errors.
     */
    validateFields(email, password) {
        let errorsModel = this.errorsModel;
        if (!RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            errorsModel.email.error = true;
        }
        if (password.length < 6) {
            errorsModel.password.error = true;
        }

        return errorsModel;
    }

    /**
     * Handles the form submission, performs validation, and updates the authentication state.
     *
     * @param {string} email - The email input value
     * @param {string} password - The password input value
     * @param {function} setErrors - Function to set form errors
     * @param {function} setMessage - Function to set error message
     * @param {function} setScreenState - Function to set authentication state
     * @param {function} setVisible - Function to set visibility state
     * @param {object} context - The authentication context object
     * @param {function} setAuthState - Function to set authentication state
     */
    async handleSubmit(
        email,
        password,
        setErrors,
        setMessage,
        setScreenState,
        setVisible,
        context,
        setAuthState,
        navigation
    ) {
        const errors = this.validateFields(email, password);
        setErrors(errors);

        if (errors.email.error || errors.password.error) {
            return;
        }

        setScreenState(AuthStateEnum.authenticating);

        try {
            const response = await this.#repository.login(email, password);
            response.authStatus = AuthStateEnum.authenticated;

            await authService.storeAuth(response);
            context.copyFrom(response);

            await createBackgroundTasksService.fetchDeliveries(response.authStatus);
            await createBackgroundTasksService.fetchUpdates(response.authStatus);

            navigation.dispatch((state) =>
                CommonActions.reset({
                    index: 0,
                    routes: state.routes,
                    history: [],
                    key: state.key,
                    routeNames: state.routeNames,
                    stale: state.stale,
                    type: state.type,
                })
            );
            navigation.navigate("Profile");
            setScreenState(AuthStateEnum.authenticated);
            setAuthState(AuthStateEnum.authenticated);
        } catch (error) {
            setMessage(error.message);
            setScreenState(AuthStateEnum.error);
            setVisible(true);

            console.error(error, "<= ProfileLoginController - handleSubmit");
        }
    }
}
