/* eslint-disable no-undef */
import AuthStateEnum from "../../../../data/enums/auth-state-enum";
import AuthModel from "../../../../data/models/auth-model";
import AuthRepository from "../../../../repositories/auth-repository";
import dateFormatters from "../../../../utils/date-formatters";

export default class ProfileCreateController {
    errorsModel = {
        email: {
            error: false,
        },
        password: {
            error: false,
        },
        birthDate: {
            error: false,
        },
        fullName: {
            error: false,
        },
    };

    #valid = false;

    #repository = new AuthRepository();

    constructor() {}

    /**
     * Validates the fields of the form.
     *
     * @param {string} email - The email address to be validated.
     * @param {string} password - The password to be validated.
     * @return {object} - The errorsModel object containing any validation errors.
     */
    validateFields(email, password, birthDate, fullName) {
        this.#valid = false;
        let errorsModel = this.errorsModel;
        if (!RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            errorsModel.email.error = true;
        }
        if (password.length < 6) {
            errorsModel.password.error = true;
        }

        if (password.length < 6) {
            errorsModel.password.error = true;
        }

        if (fullName.length < 5) {
            errorsModel.fullName.error = true;
        }

        if (birthDate.length < 10) {
            errorsModel.birthDate.error = true;
            return errorsModel;
        }

        if (!Date.parse(dateFormatters.toDatabaseDate(birthDate))) {
            errorsModel.birthDate.error = true;
        } else {
            const parsed = new Date(Date.parse(birthDate));
            const date = parsed.setFullYear(parsed.getFullYear() + 18);
            const now = new Date(Date.now());

            errorsModel.birthDate.error = now < date;
        }
        if (
            !errorsModel.birthDate.error &&
            !errorsModel.email.error &&
            !errorsModel.fullName.error &&
            !errorsModel.password.error
        )
            this.#valid = true;
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
     * @param {string} birthDate - The birth date input value
     * @param {string} fullName - The full name input value
     * @param {function} setCanProcced - Function to set can proceed state
     * @return {Promise<void>} - A promise that resolves when the submission is complete
     */
    async handleSubmit(
        email,
        password,
        setErrors,
        setMessage,
        setScreenState,
        setVisible,
        birthDate,
        fullName,
        setCanProcced
    ) {
        const errors = this.validateFields(email, password, birthDate, fullName);
        setErrors(errors);

        if (!this.#valid) {
            return;
        }

        setScreenState(AuthStateEnum.authenticating);

        const userData = new AuthModel(fullName, email, birthDate, password);

        try {
            const response = await this.#repository.create(userData);

            if (response.sucess) {
                setMessage(response.message);
                setVisible(true);
                setCanProcced(true);
            }

            setScreenState(AuthStateEnum.notAuthenticated);
        } catch (error) {
            setMessage(error.message);
            setScreenState(AuthStateEnum.error);
            setVisible(true);

            console.error(error, "<= ProfileCreateController - handleSubmit");
        }
    }
}
