import CustomError from "./custom-error";

export class GenericError extends CustomError {
    /**
     * Constructor for creating a new instance with a message and the original error object.
     *
     * @param {string} message - the message for the new instance
     * @param {Error} defaultError - the original error object
     */
    constructor(message, defaultError) {
        super(message ?? "Um erro inesperado aconteceu", defaultError);
        this.sendLog("GenericError");
    }
}

export class NotFoundError extends CustomError {
    /**
     * Constructor for creating a new instance with a message and the original error object.
     *
     * @param {string} message - the message for the new instance
     * @param {Error} defaultError - the original error object
     */
    constructor(message, defaultError) {
        super(message ?? "Não encontrado", defaultError);
        this.sendLog("NotFoundError");
    }
}

export class NetworkError extends CustomError {
    /**
     * Constructor for creating a new instance with a message and the original error object.
     *
     * @param {string} message - the message for the new instance
     * @param {Error} defaultError - the original error object
     */
    constructor(message, defaultError) {
        super(message ?? "Erro na rede, tente novamente.", defaultError);
        this.sendLog("NetworkError");
    }
}

export class UnauthorizedError extends CustomError {
    /**
     * Constructor for creating a new instance with a message and the original error object.
     *
     * @param {string} message - the message for the new instance
     * @param {Error} defaultError - the original error object
     */
    constructor(message, defaultError) {
        super(message ?? "Não autorizado", defaultError);
        this.sendLog("UnauthorizedError");
    }
}
