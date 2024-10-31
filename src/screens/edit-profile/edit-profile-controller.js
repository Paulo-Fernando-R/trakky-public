import GenericScreenStateEnum from "../../data/enums/generic-screen-state-enum";
import AuthModel from "../../data/models/auth-model";
import AuthRepository from "../../repositories/auth-repository";
import dateFormatters from "../../utils/date-formatters";
import { ToastAndroid } from "react-native";

export default class EditProfileController {
    errorsModel = {
        email: {
            error: false,
        },
        password: {
            error: false,
            message: "",
        },
        confirmPassword: {
            error: false,
            message: "",
        },
        birthDate: {
            error: false,
        },
        fullName: {
            error: false,
        },
    };

    #valid = false;
    #validPassword = false;
    #repository = new AuthRepository();
    constructor() {}

    /**
     * Validates the fields of the form.
     *
     * @param {string} email - The email address to be validated
     * @param {string} password - The current password
     * @param {string} newPassword - The new password
     * @param {string} birthDate - The birth date to be validated
     * @param {string} fullName - The full name to be validated
     * @param {string} _email - The previous email for comparison
     * @param {string} _name - The previous full name for comparison
     * @param {string} _birth - The previous birth date for comparison
     * @return {object} - The errorsModel object containing any validation errors
     */
    validateFields(email, password, newPassword, birthDate, fullName, _email, _name, _birth) {
        this.#valid = false;
        let errorsModel = this.validatePassword(password, newPassword, this.errorsModel);

        if (email === _email && fullName === _name && birthDate === _birth) {
            this.#valid = false;
            return errorsModel;
        }

        if (!RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            errorsModel.email.error = true;
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

        if (!errorsModel.birthDate.error && !errorsModel.email.error && !errorsModel.fullName.error)
            this.#valid = true;

        return errorsModel;
    }

    /**
     * Validates the password input fields.
     *
     * @param {string} password - The current password
     * @param {string} newPassword - The new password
     * @param {object} errorsModel - The model containing error flags and messages
     * @return {object} The updated errorsModel object after validation
     */
    validatePassword(password, newPassword, errorsModel) {
        this.#validPassword = false;

        if (password === "" && newPassword === "") {
            errorsModel.password.error = false;
            errorsModel.confirmPassword.error = false;
            this.#validPassword = false;
            return errorsModel;
        }

        if (password === newPassword) {
            errorsModel.password.error = true;
            errorsModel.confirmPassword.error = true;
            errorsModel.password.message = "As senhas devem ser diferentes";
            errorsModel.confirmPassword.message = "As senhas devem ser diferentes";
            this.#validPassword = false;
            return errorsModel;
        }

        if (password.length < 6) {
            errorsModel.password.error = true;
            errorsModel.password.message = "A senha precisa ter no mínimo 6 dígitos";
            this.#validPassword = false;
            return errorsModel;
        }

        if (newPassword.length < 6) {
            errorsModel.confirmPassword.error = true;
            errorsModel.confirmPassword.message = "A nova senha precisa ter no mínimo 6 dígitos";
            this.#validPassword = false;
            return errorsModel;
        }

        errorsModel.password.error = false;
        errorsModel.confirmPassword.error = false;
        this.#validPassword = true;
        return errorsModel;
    }

    /**
     * Handles the form submission, validates the fields, and updates the profile data.
     *
     * @param {string} email - The email address of the user
     * @param {string} name - The name of the user
     * @param {string} password - The current password of the user
     * @param {string} birthDate - The birth date of the user
     * @param {string} newPassword - The new password to be updated
     * @param {function} setErrors - Function to set errors on the form
     * @param {function} setScreenState - Function to set the screen state
     * @param {function} setMessage - Function to set messages
     * @param {function} setVisible - Function to set the visibility state
     * @param {string} _email - The previous email address of the user
     * @param {string} _name - The previous name of the user
     * @param {string} _birth - The previous birth date of the user
     * @return {Promise<void>} - Returns a promise
     */
    async handleSubmit(
        email,
        name,
        password,
        birthDate,
        newPassword,
        setErrors,
        setScreenState,
        setMessage,
        setVisible,
        _email,
        _name,
        _birth
    ) {
        const errors = this.validateFields(
            email,
            password,
            newPassword,
            birthDate,
            name,
            _email,
            _name,
            _birth
        );

        if (!this.#valid) {
            setErrors(errors);
        } else {
            await this.updateData(
                name,
                email,
                birthDate,
                newPassword,
                setScreenState,
                setMessage,
                setVisible
            );
        }

        if (!this.#validPassword) {
            setErrors(errors);

            if (errors.password.message) {
                ToastAndroid.show(errors.password.message, ToastAndroid.LONG);
            } else if (errors.confirmPassword.message) {
                ToastAndroid.show(errors.confirmPassword.message, ToastAndroid.LONG);
            }
        } else {
            await this.updatePassword(
                password,
                newPassword,
                setScreenState,
                setMessage,
                setVisible
            );
        }
    }

    /**
     * Updates the user profile data with the provided information and displays a success or error message.
     *
     * @param {string} name - The name of the user.
     * @param {string} email - The email of the user.
     * @param {string} birthDate - The birth date of the user.
     * @param {string} newPassword - The new password for the user.
     * @param {function} setScreenState - A function to set the screen state.
     * @param {function} setMessage - A function to set the message state.
     * @param {function} setVisible - A function to set the visibility state.
     * @return {Promise<void>} A promise that resolves when the data is updated.
     */
    async updateData(name, email, birthDate, newPassword, setScreenState, setMessage, setVisible) {
        setScreenState(GenericScreenStateEnum.loading);
        try {
            const data = new AuthModel(name, email, birthDate, newPassword);

            const response = await this.#repository.updateProfileData(data);

            if (response.success) {
                setScreenState(GenericScreenStateEnum.sucess);
                setScreenState(GenericScreenStateEnum.sucess);
                setMessage(response.message);
                setVisible(true);
                return;
            }

            setScreenState(GenericScreenStateEnum.error);
            setMessage(response.message);
            setVisible(true);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error(error, "<= EditProfileController - updateData");
            setScreenState(GenericScreenStateEnum.error);
            setMessage(error.message);
            setVisible(true);
        }
    }

    /**
     * Updates the user's password asynchronously.
     *
     * @param {string} password - The current password of the user.
     * @param {string} newPassword - The new password to be updated.
     * @param {function} setScreenState - A function to set the screen state.
     * @return {Promise<void>} - A promise that resolves when the password is updated successfully.
     */
    async updatePassword(password, newPassword, setScreenState) {
        setScreenState(GenericScreenStateEnum.loading);
        try {
            const response = await this.#repository.updatePassword(password, newPassword);

            if (response.success) {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setScreenState(GenericScreenStateEnum.sucess);

                return;
            }
            ToastAndroid.show(response.message, ToastAndroid.SHORT);
            setScreenState(GenericScreenStateEnum.error);
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error(error, "<= EditProfileController - updatePassword");
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setScreenState(GenericScreenStateEnum.error);
        }
    }
}
