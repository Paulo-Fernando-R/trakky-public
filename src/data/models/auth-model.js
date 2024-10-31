import AuthStateEnum from "../enums/auth-state-enum";

export default class AuthModel {
    #name = "";
    #email = "";
    #birthDate = new Date();
    #password = "";
    #authStatus = AuthStateEnum.notAuthenticated;
    #sessionExpiration = new Date();
    #token = "";
    constructor(name, email, birthDate, password, authStatus, sessionExpiration, token) {
        this.#name = name;
        this.#email = email;
        this.#birthDate = birthDate;
        this.#password = password;
        this.#authStatus = authStatus;
        this.#sessionExpiration = sessionExpiration;
        this.#token = token;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get birthDate() {
        return this.#birthDate;
    }

    get password() {
        return this.#password;
    }

    get authStatus() {
        return this.#authStatus;
    }

    get sessionExpiration() {
        return this.#sessionExpiration;
    }

    get token() {
        return this.#token;
    }

    /**
     * Sets the name of the object.
     *
     * @param {string} newName - The new name for the object.
     * @throws {Error} Name must be a string.
     */
    set name(newName) {
        if (typeof newName !== "string") {
            throw new Error("Name must be a string.");
        }
        this.#name = newName;
    }

    /**
     * Sets the email address.
     *
     * @param {string} newEmail - The new email address.
     * @throws {Error} Email must be a string.
     */
    set email(newEmail) {
        if (typeof newEmail !== "string") {
            throw new Error("Email must be a string.");
        }
        this.#email = newEmail;
    }

    /**
     * Setter for the birthDate property.
     *
     * @param {Date} newBirthDate - The new birth date to set.
     * @throws {Error} If the new birth date is not a Date object.
     */
    set birthDate(newBirthDate) {
        if (!(newBirthDate instanceof Date)) {
            throw new Error("Birth date must be a Date object.");
        }
        this.#birthDate = newBirthDate;
    }

    /**
     * Set the password for the user.
     *
     * @param {string} newPassword - The new password to be set.
     * @throws {Error} If the newPassword is not a string.
     */
    set password(newPassword) {
        if (typeof newPassword !== "string") {
            throw new Error("Password must be a string.");
        }
        this.#password = newPassword;
    }

    /**
     * Sets the authentication status to the specified value.
     *
     * @param {AuthStateEnum} newAuthStatus - The new authentication status to set.
     * @throws {Error} If the specified authentication status is invalid.
     */
    set authStatus(newAuthStatus) {
        if (!Object.values(AuthStateEnum).includes(newAuthStatus)) {
            throw new Error("Invalid authentication status.");
        }
        this.#authStatus = newAuthStatus;
    }

    /**
     * Sets the session expiration.
     *
     * @param {Date} newSessionExpiration - The new session expiration.
     * @throws {Error} If the new session expiration is not a Date object.
     */
    set sessionExpiration(newSessionExpiration) {
        if (!(newSessionExpiration instanceof Date)) {
            throw new Error("Session expiration must be a Date object.");
        }
        this.#sessionExpiration = newSessionExpiration;
    }

    /**
     * Setter for token property.
     *
     * @param {string} newToken - The new token value.
     * @throws {Error} Token must be a string.
     */
    set token(newToken) {
        if (typeof newToken !== "string") {
            throw new Error("Token must be a string.");
        }
        this.#token = newToken;
    }

    /**
     * Creates an AuthModel object from the provided JSON data.
     *
     * @param {Object} json - The JSON data to create the AuthModel from
     * @return {AuthModel} The AuthModel object created from the JSON data
     */
    static fromJson(json) {
        if (!json) {
            return new AuthModel(
                "",
                "",
                new Date(),
                "",
                AuthStateEnum.notAuthenticated,
                new Date(),
                ""
            );
        }

        const name = json.name ? json.name : json.fullname ? json.fullname : "";
        const email = json.email ? json.email : "";

        const birthDate = !isNaN(Date.parse(json.birthDate))
            ? new Date(Date.parse(json.birthDate))
            : !isNaN(Date.parse(json.birth_date))
            ? new Date(Date.parse(json.birth_date))
            : "";

        const sessionExpiration = isNaN(Date.parse(json.expires_at))
            ? ""
            : new Date(Date.parse(json.expires_at));
        const token = json.token ? json.token : "";

        return new AuthModel(
            name,
            email,
            birthDate,
            "",
            AuthStateEnum.notAuthenticated,
            sessionExpiration,
            token
        );
    }

    /**
     * Copy properties from the given AuthModel instance to this instance.
     *
     * @param {AuthModel} authModel - The AuthModel instance to copy from
     * @return {void}
     */
    copyFrom(authModel) {
        if (!(authModel instanceof AuthModel)) {
            throw new Error("authModel must be a AuthModel instance.");
        }

        this.#name = authModel.name;
        this.#email = authModel.email;
        this.#birthDate = authModel.birthDate;
        this.#password = authModel.password;
        this.#authStatus = authModel.authStatus;
        this.#sessionExpiration = authModel.sessionExpiration;
        this.#token = authModel.token;
    }

    /**
     * Returns a string representation of the User object, including name, email, birth date, authentication status, session expiration, and token.
     *
     * @return {string} the string representation of the User object
     */
    toString() {
        return `User: ${this.#name}, Email: ${this.#email}, Birth Date: ${
            this.#birthDate
        }, Auth Status: ${this.#authStatus}, Session Expiration: ${
            this.#sessionExpiration
        }, Token: ${this.#token}`;
    }
}
