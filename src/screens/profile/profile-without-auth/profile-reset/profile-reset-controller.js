/* eslint-disable no-undef */
import AuthRepository from "../../../../repositories/auth-repository";
import GenericScreenStateEnum from "../../../../data/enums/generic-screen-state-enum";
export default class ProfileResetController {
    errorsModel = {
        email: {
            error: false,
        },
    };

    #repository = new AuthRepository();

    constructor() {}

    /**
     * Validates the fields of the form.
     *
     * @param {string} email - The email address to be validated.
     * @return {object} - The errorsModel object containing any validation errors.
     */
    validateFields(email) {
        let errorsModel = this.errorsModel;
        if (!RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            errorsModel.email.error = true;
        }

        return errorsModel;
    }

    /**
     * Handles the form submission, performs validation, and updates the authentication state.
     *
     * @param {string} email - The email input value
     * @param {function} setErrors - Function to set form errors
     * @param {function} setMessage - Function to set error message
     * @param {function} setScreenState - Function to set authentication state
     * @param {function} setVisible - Function to set visibility state
     */
    async handleSubmit(email, setErrors, setMessage, setScreenState, setVisible) {
        const errors = this.validateFields(email);
        setErrors(errors);

        if (errors.email.error) {
            return;
        }

        setScreenState(GenericScreenStateEnum.loading);

        try {
            const response = await this.#repository.resetPassword(email);

            setScreenState(GenericScreenStateEnum.sucess);
            setVisible(true);
            setMessage(response.message);
        } catch (error) {
            setMessage(error.message);
            setScreenState(GenericScreenStateEnum.error);
            setVisible(true);

            console.error(error, "<= ProfileResetController - handleSubmit");
        }
    }
}
