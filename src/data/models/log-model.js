export default class LogModel {
    #userId;
    #userName;
    #typeError;
    #error;
    #dateTime;

    constructor(userId, userName, typeError, error) {
        this.#userId = userId;
        this.#userName = userName;
        this.#typeError = typeError;
        this.#error = error;
        this.#dateTime = new Date(Date.now());
    }

    get userId() {
        return this.#userId;
    }

    get userName() {
        return this.#userName;
    }

    get typeError() {
        return this.#typeError;
    }

    get error() {
        return this.#error;
    }

    get dateTime() {
        return this.#dateTime;
    }

    set userId(value) {
        this.#userId = value;
    }

    set userName(value) {
        this.#userName = value;
    }

    set typeError(value) {
        this.#typeError = value;
    }

    set error(value) {
        this.#error = value;
    }

    set dateTime(value) {
        this.#dateTime = value;
    }

    toObj() {
        return {
            userId: this.#userId,
            userName: this.#userName,
            typeError: this.#typeError,
            error: this.#error,
            dateTime: this.#dateTime,
        };
    }
}
