import LogRepository from "../repositories/log-repository";

export default class CustomError extends Error {
    #repository;
    /**
     * Constructor for creating a new instance with a message and the original error object.
     *
     * @param {string} message - the message to be passed to the superclass constructor
     * @param {Error} defaultError - the original error object
     */
    constructor(message, defaultError) {
        super(message);
        this.defaultError = defaultError;
        this.#repository = new LogRepository();
    }

    async sendLog(type) {
        await this.#repository.sendLog(type, this.defaultErrorToString());
    }

    defaultErrorToString() {
        if (!this.defaultError) {
            const aux = {
                message: this.message,
                name: this.name,
                stack: this.stack,
            };
            return JSON.stringify(aux);
        }
        const aux = {
            message: this.defaultError.message,
            name: this.defaultError.name,
            stack: this.defaultError.stack,
        };

        return JSON.stringify(aux);
    }
}
